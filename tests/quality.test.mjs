import assert from 'node:assert/strict';
import {test} from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadKnowledge,searchKnowledge,splitText} from '../server/knowledge.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=loadKnowledge();
function files(dir){return fs.readdirSync(path.join(root,dir),{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>x.name);}
test('all reference docs readable, nonempty, and uniquely identified',()=>{
 assert.ok(docs.length>=80,`expected >=80 refs, got ${docs.length}`);
 assert.equal(docs.length,new Set(docs.map(x=>x.id)).size);
 for(const d of docs){assert.ok(d.title.length>2,d.id);assert.ok(d.text.trim().length>300,d.id);}
});
test('specialist skills all have front matter and manual invocation',()=>{
 const names=files('skills');assert.ok(names.length>=20);
 for(const name of names){const raw=fs.readFileSync(path.join(root,'skills',name,'SKILL.md'),'utf8');assert.match(raw,/^---\nname: [\w-]+/);
  if(name!=='kira-studio')assert.match(raw,/disable-model-invocation: true/,name);
 }
});
test('read chunks reconstruct source without lost content',()=>{
 for(const d of docs){
  const pieces=splitText(d.text,250);
  assert.ok(pieces.length>=1);
  assert.equal(pieces.join('\n').replaceAll('\n','').replaceAll('\r',''),d.text.replaceAll('\n','').replaceAll('\r',''),d.id);
 }
});
test('Russian + English queries retrieve relevant topics under selected areas',()=>{
 const cases=JSON.parse(fs.readFileSync(path.join(root,'benchmarks','cases.json'),'utf8'));
 for(const c of cases){const results=searchKnowledge(docs,c.query,4,c.area);
  assert.ok(results.length>=1,`${c.id} no results`);
  assert.ok(results.some(x=>c.expectAny.some(k=>x.id.includes(k))),`${c.id}: ${results.map(x=>x.id).join(', ')}`);
  assert.ok(results.every(x=>x.content.length<1400),c.id);
 }
});
test('MCP is local-only and plugin has no telemetry endpoints',()=>{
 const code=fs.readFileSync(path.join(root,'server','index.mjs'),'utf8');
 for(const unsafe of ['fetch(', 'https.request(', 'http.request(', 'child_process'])assert.ok(!code.includes(unsafe),unsafe);
 const mcp=JSON.parse(fs.readFileSync(path.join(root,'.mcp.json'),'utf8'));
 assert.equal(mcp.mcpServers['kira-studio-knowledge'].command,'node');
});
