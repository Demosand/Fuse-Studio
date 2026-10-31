import fs from 'node:fs';
import { loadKnowledge,searchKnowledge } from '../server/knowledge.mjs';
const cases=JSON.parse(fs.readFileSync(new URL('../benchmarks/cases.json',import.meta.url),'utf8'));
const docs=loadKnowledge();
let success=0;
for(const c of cases){
 const results=searchKnowledge(docs,c.query,4,c.area);
 const found=results.some(x=>c.expectAny.some(part=>x.id.includes(part)));
 if(found)success++;
 console.log(`${found?'PASS':'FAIL'} ${c.id}: ${results.map(x=>x.id).slice(0,3).join(', ')}`);
}
console.log(`${success}/${cases.length} local knowledge routing cases passed`);
if(success!==cases.length)process.exitCode=1;
