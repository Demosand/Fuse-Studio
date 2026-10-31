import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const readJSON=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
test('Antigravity manifest and Claude plugin coexist at the same version',()=>{
  const ag=readJSON('.antigravity-plugin/plugin.json'), claude=readJSON('.claude-plugin/plugin.json'), pkg=readJSON('package.json');
  assert.equal(ag.name,'fuse-studio');
  assert.equal(ag.version,claude.version);
  assert.equal(ag.version,pkg.version);
  assert.ok(ag.description.length>20);
  assert.ok(ag.suggestedPrompts.length>0&&ag.suggestedPrompts.length<=3);
});
test('Antigravity MCP is local and resolves its own plugin root',()=>{
  const config=readJSON('mcp_config.json');
  const server=config.mcpServers['fuse-studio-knowledge'];
  assert.equal(server.command,'node');
  assert.deepEqual(server.args,['${PLUGIN_ROOT}/server/index.mjs']);
  assert.ok(fs.existsSync(path.join(root,'server/index.mjs')));
  assert.ok(!JSON.stringify(config).includes('http'));
});
test('every skill is discoverable by Antigravity and matches its folder',()=>{
  for (const ent of fs.readdirSync(path.join(root,'skills'),{withFileTypes:true}).filter(e=>e.isDirectory())) {
    const raw=fs.readFileSync(path.join(root,'skills',ent.name,'SKILL.md'),'utf8');
    assert.match(raw,new RegExp('^---\\r?\\nname: '+ent.name+'\\r?\\n'));
    assert.match(raw,/\bdescription:/);
  }
  assert.ok(fs.existsSync(path.join(root,'docs/antigravity.md')));
});
