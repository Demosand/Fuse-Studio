import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadKnowledge } from '../server/knowledge.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function exists(p) { return fs.existsSync(path.join(root, p)); }
function json(file) { return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')); }
const plugin = json('.claude-plugin/plugin.json');
const marketplace = json('.claude-plugin/marketplace.json');
const mcp = json('.mcp.json');
const errors = [];
if (plugin.name !== 'kira-studio') errors.push('plugin name mismatch');
if (marketplace.name !== 'kira-studio') errors.push('marketplace name mismatch');
if (!marketplace.plugins?.some(p => p.name === plugin.name && p.source === './')) errors.push('marketplace source invalid');
if (!mcp.mcpServers?.['kira-studio-knowledge']) errors.push('missing MCP config');
const skills = fs.readdirSync(path.join(root,'skills'),{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name);
if(skills.length<20)errors.push('expected >=20 skills');
for (const skill of skills) {
  const file = `skills/${skill}/SKILL.md`;
  if (!exists(file)) errors.push(`missing ${file}`);
  else if (!fs.readFileSync(path.join(root,file),'utf8').startsWith('---\n')) errors.push(`bad skill metadata: ${file}`);
}
const docs = loadKnowledge();
if (docs.length < 80) errors.push('too few documents: '+docs.length);
const ids = docs.map(x => x.id);
if (new Set(ids).size !== ids.length) errors.push('duplicate document ids');
for (const id of ['knowledge/engineering/network-security','knowledge/gameplay/combat','knowledge/presentation/ui-design','knowledge/presentation/vfx','workflows/audit']) {
  if (!ids.includes(id)) errors.push('missing document: '+id);
}
for (const file of ['LICENSE','THIRD_PARTY_NOTICES.md','README.md','README.ru.md','server/index.mjs']) {
  if (!exists(file)) errors.push('missing '+file);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
else console.log(`Kira Studio check OK: ${docs.length} local references, ${skills.length} skills, 2 read-only MCP tools.`);
