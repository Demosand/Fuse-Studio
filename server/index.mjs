#!/usr/bin/env node
// Local-only MCP stdio server. No network, telemetry, subprocesses or third-party packages.
import { loadKnowledge, searchKnowledge, splitText } from './knowledge.mjs';
import {searchVisualReferences,visualReferenceOverview,VISUAL_SECTIONS} from './visual-references.mjs';
const entries=loadKnowledge();
const docs=new Map(entries.map(x=>[x.id,x]));
const VERSION='2.5.0';
const RESULT_LIMIT=3900;
function result(body,isError=false) { return {content:[{type:'text',text:body}],...(isError?{isError:true}:{})}; }
const TOOLS=[
 {name:'search_knowledge',description:'Local Roblox Studio/Luau reference retrieval (English or Russian). Search once for a nontrivial task; small, relevant excerpts. No network.',inputSchema:{type:'object',properties:{query:{type:'string',minLength:2,maxLength:500},area:{type:'string',enum:['all','ui','vfx','engineering','gameplay','operations','workflow'],default:'all'}},required:['query'],additionalProperties:false}},
 {name:'read_knowledge',description:'Read a specific local reference returned by search_knowledge, chunked by part (0-based). No network. Use only when needed.',inputSchema:{type:'object',properties:{id:{type:'string'},part:{type:'integer',minimum:0,maximum:100,default:0}},required:['id'],additionalProperties:false}},
 {name:'search_visual_references',description:'Search all 11,968 indexed image references, 5 clips and 213 documentation pages by filename and category. Returns only direct GitHub source links (visual inspiration, NOT Roblox asset IDs; rights may be restricted). Use a few relevant results, do not dump the whole catalog.',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:300},section:{type:'string',enum:VISUAL_SECTIONS,default:'all'},kind:{type:'string',enum:['all','image','video','document'],default:'all'},limit:{type:'integer',minimum:1,maximum:12,default:6},offset:{type:'integer',minimum:0,maximum:13000,default:0}},additionalProperties:false}},
 {name:'list_visual_categories',description:'Summarize 12,186 source paths from izzyfrm/roblox-ai: file counts by type, source, rights and categories (no downloads).',inputSchema:{type:'object',properties:{},additionalProperties:false}}
];
function handle(method,params={}){
 if(method==='initialize')return {protocolVersion:params.protocolVersion||'2025-06-18',capabilities:{tools:{listChanged:false}},serverInfo:{name:'fuse-studio-knowledge',version:VERSION},instructions:'Read-only, no telemetry. Search small knowledge excerpts. Visual reference search returns local metadata and source links ONLY, not image contents or verified Roblox asset IDs. Inspect pictures before claiming visual properties and respect licenses. Verify current Roblox APIs and user project.'};
 if(method==='ping')return {};
 if(method==='tools/list')return {tools:TOOLS};
 if(method==='tools/call'){
  const name=params.name, a=params.arguments||{};
  if(name==='search_knowledge'){
   if(typeof a.query!=='string'||a.query.trim().length<2||a.query.length>500)return result('Invalid query (2-500 chars)',true);
   const area=a.area||'all';if(!['all','ui','vfx','engineering','gameplay','operations','workflow'].includes(area))return result('Invalid area',true);
   const matches=searchKnowledge(entries,a.query,4,area);
   if(!matches.length)return result('No close matches. Try narrower keywords or consult official Roblox documentation.');
   let txt=matches.map(x=>`## ${x.title} [${x.id}]\n${x.content}`).join('\n\n');
   txt+='\n\nUse read_knowledge(id, part=0) only for needed details.';
   return result(txt.length<=RESULT_LIMIT?txt:txt.slice(0,RESULT_LIMIT-12)+' [trimmed]');
  }
  if(name==='read_knowledge'){
   if(typeof a.id!=='string'||!docs.has(a.id))return result('Unknown ID; obtain an exact id from search_knowledge.',true);
   const part=a.part===undefined?0:a.part;
   if(!Number.isInteger(part)||part<0||part>100)return result('Invalid part (0-100)',true);
   const doc=docs.get(a.id);
   const chunks=splitText(`# ${doc.title}\nID: ${doc.id}\n\n${doc.text}`,4600);
   if(part>=chunks.length)return result(`Out of range: document has ${chunks.length} part(s), indexed 0..${chunks.length-1}.`,true);
   return result(`${doc.id} [part ${part+1}/${chunks.length}]\n${chunks[part]}`);
  }
  if(name==='search_visual_references'){
    try{
      const res=searchVisualReferences(a.query??'',{section:a.section??'all',kind:a.kind??'all',limit:a.limit??6,offset:a.offset??0});
      let payload=JSON.stringify(res);
      while(payload.length>RESULT_LIMIT && res.results.length>1){
        res.results.pop();res.nextOffset=res.offset+res.results.length;res.truncated=true;
        payload=JSON.stringify(res);
      }
      return result(payload);
    }catch(e){return result(String(e?.message||'Invalid query'),true);}
  }
  if(name==='list_visual_categories')return result(JSON.stringify(visualReferenceOverview(),null,2).slice(0,RESULT_LIMIT));
  return result('Unknown tool',true);
 }
 return null;
}
function send(pkt){process.stdout.write(JSON.stringify(pkt)+'\n');}
function processLine(line){
 if(!line.trim())return;
 let p;try{p=JSON.parse(line);}catch{send({jsonrpc:'2.0',id:null,error:{code:-32700,message:'Parse error'}});return;}
 if(!p||typeof p!=='object'||!Object.prototype.hasOwnProperty.call(p,'id'))return;
 try{const out=handle(p.method,p.params);if(out===null)send({jsonrpc:'2.0',id:p.id,error:{code:-32601,message:'Method not found'}});else send({jsonrpc:'2.0',id:p.id,result:out});}
 catch(e){process.stderr.write(`[fuse-studio] ${e?.message||'internal error'}\n`);send({jsonrpc:'2.0',id:p.id,error:{code:-32603,message:'Internal error'}});}
}
let pending='';process.stdin.setEncoding('utf8');process.stdin.on('data',chunk=>{pending+=chunk;if(pending.length>2*1024*1024){process.stderr.write('[fuse-studio] oversize input\n');pending='';return;}let i;while((i=pending.indexOf('\n'))!==-1){processLine(pending.slice(0,i).trimEnd());pending=pending.slice(i+1);}});process.stdin.on('end',()=>{if(pending.trim())processLine(pending);});
