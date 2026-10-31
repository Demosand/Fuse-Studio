import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIRS = ['knowledge', 'workflows'];
const AREA_HINTS = {
  ui: ['ui-expert', 'presentation/ui', 'accessibility'],
  vfx: ['vfx-expert', 'presentation/vfx', 'presentation/audio', 'presentation/camera', 'presentation/animation', 'presentation/lighting'],
  engineering: ['engineering', 'tools/studio', 'tools/benchmark'],
  gameplay: ['gameplay', 'operations/monetization'],
  operations: ['operations', 'tools', 'workflows'],
};
const ALIASES = new Map(Object.entries({
  'гуи': 'gui ui interface', 'интерфейс': 'ui gui interface', 'интерфейсы':'ui gui interface',
  'кнопка':'button ui', 'кнопки':'button ui', 'меню':'menu ui', 'инвентарь':'inventory ui',
  'магазин':'shop purchase monetization ui', 'худ':'hud ui', 'хп':'health hud',
  'уведомления':'notifications toast', 'локализация':'localization ui', 'телефон':'mobile responsive touch',
  'мобильный':'mobile responsive touch', 'геймпад':'gamepad focus', 'анимация':'animation motion tween',
  'анимации':'animation motion tween', 'переходы':'transition motion', 'стекло':'glass material',
  'градиент':'gradient ui', 'дизайн':'design art direction', 'стиль':'style design',
  'вфх':'vfx effects', 'вфкс':'vfx effects', 'эффекты':'vfx particles', 'эффект':'vfx particles',
  'частицы':'particle emitter vfx', 'трейлы':'trail beam', 'лучи':'beam vfx', 'освещение':'lighting mood',
  'звук':'audio feedback', 'камера':'camera recoil', 'оружие':'weapon combat', 'стрельба':'shooting lag compensation combat',
  'пули':'projectile weapon', 'меч':'melee sword combat', 'боёвка':'combat', 'удар':'melee hit',
  'попадания':'hit registration lag compensation', 'сабтик':'subtick lag compensation', 'субтик':'subtick lag compensation',
  'сеть':'network replication', 'пинг':'latency prediction reconciliation', 'откат':'rewind rollback',
  'сервер':'server authority', 'античит':'anticheat security', 'эксплойт':'exploit validation',
  'безопасность':'security validation', 'оптимизация':'performance profiling', 'лаги':'performance frame stutter',
  'тормозит':'performance frame stutter', 'токены':'tokens benchmark context',
  'сохранение':'datastore persistence', 'данные':'data datastore', 'база':'datastore',
  'боты':'npc ai', 'нпс':'npc ai', 'враг':'npc enemy', 'путь':'pathfinding npc',
  'карта':'world procedural', 'физика':'physics', 'машина':'vehicles physics',
  'система':'system architecture', 'код':'luau script', 'кодинг':'coding luau',
  'роблокс':'roblox studio', 'студия':'studio', 'проверка':'review testing',
  'деньги':'currency economy', 'донат':'monetization purchases', 'выживание':'gameplay survival',
  'ui':'ui gui', 'gui':'ui gui', 'fps':'performance profiler', 'vfx':'particles effect',
  'mcp':'studio tools', 'lag':'latency performance', 'smooth':'animation tween',
  'remote':'network security remote validation', 'malicious':'security exploit', 'client':'network remote client',
}));

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(p);
    return ent.isFile() && p.endsWith('.md') ? [p] : [];
  });
}
function parse(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  const meta = {};
  if (!m) return {meta, body:text};
  for (const line of m[1].split(/\r?\n/)) {
    const n = line.indexOf(':');
    if (n > 0) meta[line.slice(0,n).trim()] = line.slice(n+1).trim().replace(/^"|"$/g, '');
  }
  return {meta, body:text.slice(m[0].length).trim()};
}
export function loadKnowledge() {
  return SOURCE_DIRS.flatMap(dir => walk(path.join(ROOT,dir))).map(file => {
    const id = path.relative(ROOT,file).split(path.sep).join('/').replace(/\.md$/,'');
    const {meta,body} = parse(fs.readFileSync(file,'utf8'));
    return { id, title:meta.title || path.basename(file,'.md').replaceAll('-',' '), tags:meta.tags||'', status:meta.status||'curated', text:body };
  }).sort((a,b)=>a.id.localeCompare(b.id));
}
export function tokens(source, expandAliases=true) {
  const raw = String(source).toLowerCase().match(/[\p{L}\p{N}_]{2,}/gu)||[];
  const acc = new Set();
  for(const t of raw) {
    acc.add(t);
    if(expandAliases && ALIASES.has(t)) for(const a of ALIASES.get(t).split(' ')) acc.add(a);
    // Conservative English normalization; avoid aggressive stemming that merges APIs.
    if (/^[a-z]{5,}s$/.test(t)) acc.add(t.slice(0,-1));
  }
  return [...acc];
}
const cache = new WeakMap();
function index(entries) {
  if (cache.has(entries)) return cache.get(entries);
  const docs=entries.map(entry => {
    const title=tokens(`${entry.id.replace(/[\/-]/g,' ')} ${entry.title} ${entry.tags}`,false);
    const body=tokens(entry.text,false);
    return {entry,title:new Set(title),body:new Set(body),length:body.length};
  });
  cache.set(entries,docs);
  return docs;
}
function inArea(id,area) {
  if (!area || area==='all') return true;
  if (area==='workflow') return id.startsWith('workflows/');
  return (AREA_HINTS[area]||[]).some(s=>id.includes(s));
}
function excerpt(entry,query,size) {
  const rows=entry.text.split('\n').filter(line=>line.trim().length>8);
  const terms=tokens(query);
  const scored=rows.map((row,i)=>({row,i,score:terms.reduce((n,t)=>n+(row.toLowerCase().includes(t)?1:0),0)}));
  scored.sort((a,b)=>b.score-a.score||a.i-b.i);
  const from=Math.max(0,(scored[0]?.score?scored[0].i:0)-1);
  let output=rows.slice(from,from+8).join('\n').trim();
  if(output.length>size) output=output.slice(0,size-2).replace(/\s+\S*$/, '')+'…';
  return output;
}
export function searchKnowledge(entries,query,limit=4,area='all') {
  const terms=tokens(query);
  if(!terms.length) return [];
  const matches=index(entries).filter(x=>inArea(x.entry.id,area)).map(x=>{
    let score=0;
    for(const t of terms){
      if(x.title.has(t)) score+=10;
      if(x.body.has(t)) score+=2;
      if(x.entry.id.split('/').at(-1).replaceAll('-',' ').includes(t))score+=3;
    }
    return {...x,score};
  }).filter(x=>x.score>0);
  matches.sort((a,b)=>b.score-a.score||a.entry.id.localeCompare(b.entry.id));
  return matches.slice(0,Math.max(1,Math.min(5,limit))).map((x,i)=>({
    id:x.entry.id,title:x.entry.title,score:x.score,status:x.entry.status,
    content:excerpt(x.entry,query,i===0?1250:340)
  }));
}
export function splitText(content,limit=4800) {
  if(typeof content!=='string'||limit<64)throw new TypeError('invalid splitText');
  const parts=[];
  let rest=content;
  while(rest.length>limit){
    let end=rest.lastIndexOf('\n',limit);
    if(end<limit/2)end=limit;
    parts.push(rest.slice(0,end)); rest=rest.slice(end).replace(/^\n/,'');
  }
  parts.push(rest);return parts;
}
