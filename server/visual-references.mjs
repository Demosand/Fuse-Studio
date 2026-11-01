// Fuse Studio local reference index: filenames/deep links only; no media downloaded.
// The upstream collection has mixed rights: results are visual inspiration, NOT game assets.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const BASE=path.join(ROOT,"catalog/roblox-ai");
const MANIFEST=JSON.parse(fs.readFileSync(path.join(BASE,"manifest.json"),"utf8"));
let cached;
const RUSSIAN={
 "стад":"stud","студ":"stud","студы":"stud","стадс":"stud","стадов":"stud",
 "интерфейс":"ui","гуи":"gui","меню":"menu","магазин":"shop","покупки":"shop",
 "инвентарь":"inventory","иконка":"icon","иконки":"icons","значок":"icon",
 "эффекты":"vfx","эффект":"vfx","вфкс":"vfx","анимация":"animation",
 "анимации":"animation","удар":"hit","взрыв":"explosion","переход":"transition",
 "ужасы":"horror","хоррор":"horror","фэнтези":"fantasy",
 "казуальный":"casual","симулятор":"simulator","документация":"docs",
 "документы":"docs","урок":"tutorial","уроки":"tutorial",
 "средневековый":"medieval","стеклянный":"glass",
 "бой":"combat","оружие":"weapons","игра":"game","магазины":"shop",
 "кнопки":"buttons","кнопка":"button","сцена":"cutscene","катсцена":"cutscene"
};
export function referenceTokens(s){
 return String(s||"").toLowerCase().split(/[^a-z0-9а-яё]+/i).filter(Boolean).flatMap(x=>RUSSIAN[x]?[x,RUSSIAN[x]]:[x]);
}
const EXT_IMAGE=/\.(png|jpe?g|webp|gif)$/i;
const EXT_VIDEO=/\.(mp4|webm)$/i;
const EXT_DOC=/\.md$/i;
function kindOf(p){return EXT_IMAGE.test(p)?"image":EXT_VIDEO.test(p)?"video":EXT_DOC.test(p)?"document":"other";}
export function loadVisualReferences(){
 if(cached)return cached;
 const result=[];
 for(const key of MANIFEST.categories){
  const filename=path.join(BASE,"paths",key+".txt");
  for(const p of fs.readFileSync(filename,"utf8").split(/\r?\n/)){
   if(!p)continue;
   result.push({path:p,kind:kindOf(p),section:p.split("/")[0],folder:p.slice(0,p.lastIndexOf("/")),name:p.split("/").at(-1)});
  }
 }
 cached=result;
 return cached;
}
function segment(s){return encodeURIComponent(s);}
export function visualReferenceUrl(p){
 if(typeof p!=="string"||!p||p.startsWith("/")||p.includes("..")||p.includes("\\"))throw Error("unsafe visual reference path");
 return "https://github.com/"+MANIFEST.source+"/blob/"+MANIFEST.source_commit+"/"+p.split("/").map(segment).join("/");
}
export function visualReferenceOverview(){
 const stats={};
 for(const p of loadVisualReferences()){
  stats[p.section]??={image:0,video:0,document:0,other:0};
  stats[p.section][p.kind]++;
 }
 return {source:MANIFEST.source,source_commit:MANIFEST.source_commit,license_policy:MANIFEST.policy,count:MANIFEST.indexed_paths,types:MANIFEST.counts,sections:stats};
}
const SECTIONS={
 all:()=>true,
 stud:p=>/stud|simulator|chunky|pet-|roblox-user-interface/.test(p.path.toLowerCase()),
 ui:p=>/ui-styles|style-refs|visual-refs|user-interface|roblox-docs\/ui/.test(p.path.toLowerCase()),
 game:p=>p.section==="game-refs",
 docs:p=>p.section==="roblox-docs",
 vfx:p=>p.section==="vfx"||/vfx|effect|magic|explosion|particle/.test(p.path.toLowerCase()),
 animation:p=>p.section==="animations"||/animation|cutscene/.test(p.path.toLowerCase()),
 icon:p=>/icons|icon|sprite|logo/.test(p.path.toLowerCase()),
 style:p=>p.section==="style-refs"||p.section==="ui-styles",
 other:p=>p.section!=="roblox-docs"&&p.section!=="game-refs"
};
export const VISUAL_SECTIONS=Object.keys(SECTIONS);
export function searchVisualReferences(query="",{section="all",kind="all",limit=8,offset=0}={}){
 if(!Object.hasOwn(SECTIONS,section))throw Error("invalid visual reference section");
 if(!["all","image","video","document"].includes(kind))throw Error("invalid reference kind");
 if(!Number.isInteger(limit)||limit<1||limit>12)throw Error("invalid limit (1..12)");
 if(!Number.isInteger(offset)||offset<0||offset>13000)throw Error("invalid offset");
 if(typeof query!=="string"||query.length>300)throw Error("invalid query");
 const terms=referenceTokens(query),skip=new Set(["roblox","game","ui","image","asset","reference","picture","the","for","in"]);
 const effective=terms.filter(t=>!skip.has(t)),scored=[];
 for(const p of loadVisualReferences()){
  if(kind!=="all"&&p.kind!==kind)continue;
  if(!SECTIONS[section](p))continue;
  const name=p.name.toLowerCase().replace(/[_-]+/g," "),folder=p.folder.toLowerCase().replace(/[_-]+/g," ");
  let hits=0,score=0;
  for(const term of effective){
   if(name.includes(term)){hits++;score+=10;}
   else if(folder.includes(term)){hits++;score+=4;}
  }
  if(effective.length&&hits===0)continue;
  if(effective.length&&hits===effective.length)score+=8;
  if(p.section==="style-refs"&&section==="stud")score+=7;
  if(p.kind==="document")score-=1;
  scored.push({p,score});
 }
 scored.sort((a,b)=>b.score-a.score||a.p.path.localeCompare(b.p.path));
 return {total:scored.length,offset,nextOffset:offset+limit<scored.length?offset+limit:null,results:scored.slice(offset,offset+limit).map(x=>({
  path:x.p.path,kind:x.p.kind,section:x.p.section,score:x.score,url:visualReferenceUrl(x.p.path),
  usage:"visual reference only; check image ownership/permission before reuse; this is NOT an rbxassetid"
 }))};
}
