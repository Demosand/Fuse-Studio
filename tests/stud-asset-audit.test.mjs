import assert from 'node:assert/strict';
import {test} from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadKnowledge,searchKnowledge} from '../server/knowledge.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
const known=JSON.parse(read('data/stud-reported-ids.json')).items;
test('all 19 reported IDs have a traceable source and are guarded at runtime',()=>{
 assert.equal(known.length,19);
 assert.equal(new Set(known.map(x=>x.id)).size,19);
 const guard=read('vendor/stud-ui/src/StudAssetGuard.luau');
 for(const item of known){
  assert.match(item.id,/^\d{12,16}$/);
  assert.ok(read(item.source).includes(item.id),item.id+' absent in '+item.source);
  assert.ok(guard.includes(item.id),'not guarded: '+item.id);
 }
});
test('no copyrighted roblox-ai screenshots are vendored',()=>{
 const files=fs.readdirSync(path.join(root,'knowledge/visual-references'));
 assert.ok(files.includes('roblox-ai-guide.md'));
 assert.ok(files.every(f=>f.endsWith('.md')));
 const guide=read('knowledge/visual-references/roblox-ai-guide.md');
 assert.match(guide,/mixed|licensed|rights|ownership/i);
 assert.match(guide,/github\.com\/izzyfrm\/roblox-ai/);
});
test('both safe adapters are non-destructive additions to upstream',()=>{
 for(const name of ['StudAssetGuard','StudUISafe','StudIconsSafe'])assert.ok(fs.existsSync(path.join(root,'vendor/stud-ui/src/'+name+'.luau')));
 assert.ok(read('vendor/stud-ui/src/StudUISafe.luau').includes('UI.StudsOverlay'));
 assert.ok(read('vendor/stud-ui/src/StudUISafe.luau').includes('originalProductCard'));
 assert.ok(read('vendor/stud-ui/src/StudIconsSafe.luau').includes('Guard.Resolve'));
});
test('new visual and missing image references are retrievable',()=>{
 const entries=loadKnowledge();
 const ids=entries.map(x=>x.id);
 for(const id of ['knowledge/visual-references/roblox-ai-guide','knowledge/ui-expert/stud-asset-replacement'])assert.ok(ids.includes(id),id);
 assert.ok(searchKnowledge(entries,'inaccessible stud ui image texture ID',5).some(x=>x.id.includes('stud-asset-replacement')));
});
