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
const agPlugin=json('.antigravity-plugin/plugin.json');
const agMcp=json('mcp_config.json');
const errors = [];
const codexPlugin = json('plugin.json');
const codexLegacy = json('.codex-plugin/plugin.json');
const codexMcp = json('mcp.json');
const codexMarketplace = json('.agents/plugins/marketplace.json');
if (codexPlugin.name !== plugin.name || codexPlugin.version !== plugin.version || codexLegacy.version !== plugin.version) errors.push('Codex plugin/version mismatch');
if (codexMarketplace.name !== 'fuse-studio' || !codexMarketplace.plugins?.some(p => p.name === 'fuse-studio')) errors.push('Codex marketplace invalid');
if (codexMcp.mcpServers?.['fuse-studio-knowledge']?.cwd !== '.') errors.push('Codex MCP cwd invalid');
if(agPlugin.name!==plugin.name||agPlugin.version!==plugin.version)errors.push('Antigravity manifest/version mismatch');
if(agMcp.mcpServers?.['fuse-studio-knowledge']?.args?.[0]!=='${PLUGIN_ROOT}/server/index.mjs')errors.push('Antigravity MCP path invalid');
if (plugin.name !== 'fuse-studio') errors.push('plugin name mismatch');
if (marketplace.name !== 'fuse-studio') errors.push('marketplace name mismatch');
if (!marketplace.plugins?.some(p => p.name === plugin.name && p.source === './')) errors.push('marketplace source invalid');
if (!mcp.mcpServers?.['fuse-studio-knowledge']) errors.push('missing MCP config');
const skills = fs.readdirSync(path.join(root,'skills'),{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name);
if(skills.length<23)errors.push('expected >=20 skills');
for (const skill of skills) {
  const file = `skills/${skill}/SKILL.md`;
  if (!exists(file)) errors.push(`missing ${file}`);
  else if (!fs.readFileSync(path.join(root,file),'utf8').startsWith('---\n')) errors.push(`bad skill metadata: ${file}`);
}
const docs = loadKnowledge();
if (docs.length < 90) errors.push('too few documents: '+docs.length);
const ids = docs.map(x => x.id);
if (new Set(ids).size !== ids.length) errors.push('duplicate document ids');
for (const id of ['knowledge/engineering/network-security','knowledge/gameplay/combat','knowledge/presentation/ui-design','knowledge/presentation/vfx','workflows/audit']) {
  if (!ids.includes(id)) errors.push('missing document: '+id);
}
for (const file of ['LICENSE','THIRD_PARTY_NOTICES.md','README.md','README.ru.md','docs/antigravity.md','docs/codex.md','server/index.mjs','vendor/stud-ui/LICENSE','vendor/stud-ui/src/StudUI.luau','vendor/stud-ui/src/StudMotion.luau','vendor/stud-ui/src/CheckUIIcons.luau']) {
  if (!exists(file)) errors.push('missing '+file);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
else console.log(`Fuse Studio check OK: ${docs.length} local references, ${skills.length} skills, 2 read-only MCP tools, Claude Code + Antigravity + Codex.`);
