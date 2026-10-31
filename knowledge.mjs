import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REFERENCE_ROOTS = ['knowledge', 'workflows'];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(filename);
    return entry.isFile() && filename.endsWith('.md') ? [filename] : [];
  });
}

function parseMarkdown(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) return { metadata: {}, text };
  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':');
    if (colon > 0) metadata[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return { metadata, text: text.slice(match[0].length) };
}

export function loadKnowledge() {
  return REFERENCE_ROOTS.flatMap(dir => walk(path.join(ROOT, dir))).map(filename => {
    const id = path.relative(ROOT, filename).split(path.sep).join('/').replace(/\.md$/, '');
    const { metadata, text } = parseMarkdown(fs.readFileSync(filename, 'utf8'));
    return {
      id,
      title: metadata.title || path.basename(filename, '.md').replaceAll('-', ' '),
      tags: metadata.tags || '',
      text,
    };
  }).sort((a, b) => a.id.localeCompare(b.id));
}

const RU_ALIASES = {
  'интерфейс': 'ui design gui', 'интерфейсы': 'ui design gui',
  'кнопки': 'ui button', 'анимация': 'animation motion tween', 'анимации': 'animation motion tween',
  'эффекты': 'vfx particles', 'эффект': 'vfx particles',
  'частицы': 'vfx emitter', 'пули': 'combat guns projectile',
  'оружие': 'combat guns weapon', 'стрельба': 'shooting combat',
  'сеть': 'network security replication', 'эксплойт': 'exploit anti cheat remote',
  'оптимизация': 'performance profiler', 'лаги': 'performance profiling latency',
  'данные': 'datastore persistence', 'сохранение': 'datastore persistence',
  'боты': 'npc ai', 'нпс': 'npc ai', 'магазин': 'monetization shop purchase',
  'освещение': 'lighting atmosphere', 'модель': 'mesh building art',
  'камера': 'camera animation', 'физика': 'physics', 'сервер': 'server',
  'мобильный': 'mobile responsive', 'производительность': 'performance',
  'безопасность': 'security exploit validation', 'код': 'luau code review'
};

export function tokens(source) {
  const raw = String(source).toLowerCase().match(/[\p{L}\p{N}_-]{2,}/gu) ?? [];
  const out = [];
  for (const token of raw) {
    out.push(token);
    if (Object.hasOwn(RU_ALIASES, token)) out.push(...RU_ALIASES[token].split(' '));
  }
  return [...new Set(out)];
}

function rank(entry, termList) {
  const title = tokens(entry.id.replace(/[\/-]/g, ' ') + ' ' + entry.title + ' ' + entry.tags);
  const body = tokens(entry.text);
  const pathTerms = tokens(entry.id.replace(/[\/-]/g, ' '));
  let score = 0;
  for (const term of termList) {
    if (title.includes(term)) score += 9;
    if (body.includes(term)) score += 1;
    if (pathTerms.includes(term)) score += 5;
  }
  return score;
}

function snippet(entry, queryTerms, length = 330) {
  const lines = entry.text.split('\n');
  const lineIndex = lines.findIndex(line => queryTerms.some(t => line.toLowerCase().includes(t)));
  const from = Math.max(0, (lineIndex < 0 ? 0 : lineIndex) - 1);
  let text = lines.slice(from, from + 8).join('\n').trim();
  if (!text) text = entry.text.trim();
  return text.length <= length ? text : text.slice(0, length).replace(/\s+\S*$/, '') + '…';
}

export function searchKnowledge(entries, query, limit = 3) {
  const terms = tokens(query);
  if (terms.length === 0) return [];
  return entries.map(entry => ({ entry, score: rank(entry, terms) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .slice(0, Math.max(1, Math.min(limit, 5)))
    .map(({ entry, score }, i) => ({
      id: entry.id, title: entry.title, score,
      content: i === 0 ? snippet(entry, terms, 1450) : snippet(entry, terms, 420)
    }));
}

export { ROOT };
