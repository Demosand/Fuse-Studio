#!/usr/bin/env node
// Maintainers: refresh local path index from izzyfrm/roblox-ai.
// Only filename metadata is stored in Fuse; never fetch/copy images, README content, or clips.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const folder=path.join(root,"catalog/roblox-ai");
const source="izzyfrm/roblox-ai";
const headers={"User-Agent":"fuse-studio-reference-index","Accept":"application/vnd.github+json"};
async function api(url){
 const res=await fetch(url,{headers});
 if(!res.ok)throw Error("GitHub API failed "+res.status);
 return res.json();
}
const meta=await api("https://api.github.com/repos/"+source+"/git/refs/heads/main");
const commit=meta.object.sha;
const listing=await api("https://api.github.com/repos/"+source+"/git/trees/"+commit+"?recursive=1");
if(listing.truncated||!Array.isArray(listing.tree))throw Error("GitHub tree truncated; refusing to write incomplete index");
const files=listing.tree.filter(x=>x.type==="blob").map(x=>x.path);
const buckets={};
const kinds={image:0,video:0,documentation:0,other:0};
for(const p of files){
 const top=p.split("/")[0];
 (buckets[top==="README.md"||!p.includes("/")?"root":top]??=[]).push(p);
 if(/\.(png|jpe?g|webp|gif)$/i.test(p))kinds.image++;
 else if(/\.(mp4|webm)$/i.test(p))kinds.video++;
 else if(/\.md$/i.test(p))kinds.documentation++;
 else kinds.other++;
}
const paths=path.join(folder,"paths");
fs.mkdirSync(paths,{recursive:true});
for(const filename of fs.readdirSync(paths))if(filename.endsWith(".txt")&&!Object.hasOwn(buckets,filename.slice(0,-4)))fs.unlinkSync(path.join(paths,filename));
const categories=Object.keys(buckets).sort();
for(const top of categories)fs.writeFileSync(path.join(paths,top+".txt"),buckets[top].sort().join("\n")+"\n","utf8");
const manifest={
 source,source_commit:commit,date:new Date().toISOString().slice(0,10),
 source_url:"https://github.com/"+source,indexed_paths:files.length,counts:kinds,categories,
 policy:"Paths and deep links only. No media copied. Upstream images have mixed intellectual-property rights; use as visual references only unless authorized."
};
fs.writeFileSync(path.join(folder,"manifest.json"),JSON.stringify(manifest,null,2)+"\n","utf8");
console.log("Indexed "+files.length+" source paths, "+kinds.image+" images, "+kinds.video+" videos, "+kinds.documentation+" README/docs. No media downloaded.");
