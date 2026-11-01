#!/usr/bin/env node
// Offline STATIC source audit; it cannot determine whether a Roblox asset is deleted.
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const conf=JSON.parse(fs.readFileSync(path.join(root,'data/stud-reported-ids.json'),'utf8'));
let failed=false;
for(const item of conf.items) {
 const file=fs.readFileSync(path.join(root,item.source),'utf8');
 const lines=file.split(/\r?\n/);
 const indexes=lines.flatMap((line,i)=>line.includes(item.id)?[i+1]:[]);
 if(indexes.length===0){failed=true;console.error('MISSING IN UPSTREAM:',item.id,item.source);}
 else console.log(item.id,item.kind,item.source+':'+indexes.join(','),'(community-reported; live status unknown)');
}
console.log('Total reported IDs:',conf.items.length,'| static audit only. Use StudAssetGuard.AuditAsync for live Studio results.');
if(failed)process.exitCode=1;
