import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));

test('portable, legacy Codex, Claude, Antigravity, npm versions agree',()=>{
 const portable=read('plugin.json'), codex=read('.codex-plugin/plugin.json');
 const claude=read('.claude-plugin/plugin.json'), ag=read('.antigravity-plugin/plugin.json'), npm=read('package.json');
 for(const item of [portable,codex,claude,ag]) {
  assert.equal(item.name,'fuse-studio');assert.equal(item.version,npm.version);
 }
 assert.ok(portable.extensions?.['com.openai']?.interface?.displayName);
 assert.equal(codex.skills,'./skills/');
 assert.equal(codex.mcpServers,'./.codex-mcp.json');
});

test('Codex GitHub marketplace exposes exactly the root Fuse Studio plugin',()=>{
 const x=read('.agents/plugins/marketplace.json');
 assert.equal(x.name,'fuse-studio');assert.equal(x.plugins.length,1);
 const p=x.plugins[0];
 assert.equal(p.name,'fuse-studio');
 assert.equal(p.source.source,'url');
 assert.equal(p.source.url,'https://github.com/Demosand/Fuse-Studio.git');
 assert.equal(p.policy.installation,'AVAILABLE');
});

test('Codex portable and compatibility MCP start locally from plugin root',()=>{
 const configs=[read('mcp.json'),read('.codex-mcp.json')];
 for(const x of configs){
  const server=x.mcpServers['fuse-studio-knowledge'];
  assert.equal(server.command,'node');
  assert.deepEqual(server.args,['server/index.mjs']);
  assert.equal(server.cwd,'.');
  assert.ok(!JSON.stringify(server).includes('PLUGIN_ROOT'));
 }
 assert.equal(configs[0].mcpServers['fuse-studio-knowledge'].type,'stdio');
 assert.ok(fs.existsSync(path.join(root,'server/index.mjs')));
});

test('Codex offers all source skills and complete Stud kit',()=>{
 const skills=fs.readdirSync(path.join(root,'skills'),{withFileTypes:true}).filter(x=>x.isDirectory());
 assert.equal(skills.length,23);
 for(const x of skills){
  const raw=fs.readFileSync(path.join(root,'skills',x.name,'SKILL.md'),'utf8');
  assert.match(raw,/^---\r?\nname:/);
 }
 assert.ok(fs.existsSync(path.join(root,'vendor/stud-ui/src/StudUI.luau')));
 assert.ok(fs.existsSync(path.join(root,'docs/codex.md')));
});