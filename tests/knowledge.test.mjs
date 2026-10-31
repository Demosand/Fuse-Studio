import test from 'node:test';
import assert from 'node:assert/strict';
import { loadKnowledge, searchKnowledge, tokens } from '../server/knowledge.mjs';
const entries = loadKnowledge();
test('loads meaningful local knowledge', () => { assert.ok(entries.length >= 25); });
test('roblox search retrieves relevant code guidance', () => {
  assert.ok(searchKnowledge(entries, 'remote validation malicious client').some(x=>x.id.includes('network-security')));
  assert.ok(searchKnowledge(entries, 'interface responsive UI layout').some(x=>x.id.includes('ui-design')));
  assert.ok(searchKnowledge(entries, 'particle effects combat VFX').some(x=>x.id.includes('vfx')));
});
test('Russian fallback adds English tokens', () => { assert.ok(tokens('лаги оптимизация').includes('performance')); });
test('search never returns whole corpus', () => { assert.ok(searchKnowledge(entries, 'ui', 999).length <= 5); });
