#!/usr/bin/env node
// Local-only MCP stdio server. No HTTP, telemetry, shell execution, or third-party dependencies.
import { loadKnowledge, searchKnowledge } from './knowledge.mjs';

const entries = loadKnowledge();
const ids = new Map(entries.map(entry => [entry.id, entry]));
const SERVER_NAME = 'kira-studio-knowledge';
const VERSION = '1.0.0';
const MAX_SEARCH_CHARS = 3200;
const MAX_READ_CHARS = 6500;

const TOOLS = [
  {
    name: 'search_knowledge',
    description: 'Optional LOCAL Roblox/Luau knowledge search. One relevant query per nontrivial task, best match plus related snippets; no network calls. Prefer English query; Russian aliases work too.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', minLength: 2, description: 'Specific Roblox problem or API topic' } }, required: ['query'], additionalProperties: false },
  },
  {
    name: 'read_knowledge',
    description: 'Read one local Kira Studio knowledge/workflow document using an exact id returned by search_knowledge. Call only if the excerpt is insufficient.',
    inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'Exact result id, e.g. knowledge/engineering/network-security' } }, required: ['id'], additionalProperties: false },
  },
];

function cap(value, limit) {
  return value.length > limit ? `${value.slice(0, limit - 16).replace(/\s+\S*$/, '')}\n[truncated]` : value;
}
function result(message, isError = false) {
  return { content: [{ type: 'text', text: message }], ...(isError ? { isError: true } : {}) };
}
function handle(method, params = {}) {
  if (method === 'initialize') {
    return {
      protocolVersion: params.protocolVersion || '2025-06-18',
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: SERVER_NAME, version: VERSION },
      instructions: 'Local, read-only Roblox knowledge. Search only when relevant; avoid redundant tools. No telemetry or lesson sharing. Use exact ids and verify current Roblox APIs when uncertain.'
    };
  }
  if (method === 'ping') return {};
  if (method === 'tools/list') return { tools: TOOLS };
  if (method === 'tools/call') {
    const name = params.name;
    const args = params.arguments || {};
    if (name === 'search_knowledge') {
      if (typeof args.query !== 'string' || args.query.trim().length < 2 || args.query.length > 600) {
        return result('query must be a 2-600-character string', true);
      }
      const matches = searchKnowledge(entries, args.query);
      if (matches.length === 0) return result('No close local matches. Try a narrower English Roblox/Luau query or consult official Roblox docs.');
      const body = matches.map(item => `## ${item.title} [${item.id}]\n${item.content}`).join('\n\n');
      return result(cap(`${body}\n\nUse read_knowledge with an exact [id] only if more details are needed.`, MAX_SEARCH_CHARS));
    }
    if (name === 'read_knowledge') {
      if (typeof args.id !== 'string' || !ids.has(args.id)) return result('Unknown id. Search first and pass an exact [id] from the result.', true);
      const entry = ids.get(args.id);
      return result(cap(`# ${entry.title}\nID: ${entry.id}\n\n${entry.text}`, MAX_READ_CHARS));
    }
    return result(`Unknown tool: ${String(name)}`, true);
  }
  return null;
}

function send(json) { process.stdout.write(JSON.stringify(json) + '\n'); }
function processLine(line) {
  if (!line.trim()) return;
  let packet;
  try { packet = JSON.parse(line); }
  catch { send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); return; }
  if (!packet || typeof packet !== 'object') return;
  // Notifications have no id, and MUST NOT be answered.
  if (!Object.prototype.hasOwnProperty.call(packet, 'id')) return;
  try {
    const output = handle(packet.method, packet.params);
    if (output === null) send({ jsonrpc: '2.0', id: packet.id, error: { code: -32601, message: 'Method not found' } });
    else send({ jsonrpc: '2.0', id: packet.id, result: output });
  } catch (err) {
    process.stderr.write(`[kira-studio] internal error: ${String(err?.message || err)}\n`);
    send({ jsonrpc: '2.0', id: packet.id, error: { code: -32603, message: 'Internal error' } });
  }
}

let pending = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  pending += chunk;
  if (pending.length > 2 * 1024 * 1024) { process.stderr.write('[kira-studio] input too large\n'); pending = ''; return; }
  let newline = pending.indexOf('\n');
  while (newline !== -1) {
    const line = pending.slice(0, newline).trimEnd();
    pending = pending.slice(newline + 1);
    processLine(line);
    newline = pending.indexOf('\n');
  }
});
process.stdin.on('end', () => { if (pending.trim()) processLine(pending); });
