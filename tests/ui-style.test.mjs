import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadKnowledge,searchKnowledge} from '../server/knowledge.mjs';
test('Stud UI knowledge and selector are present',()=>{let docs=loadKnowledge(),ids=docs.map(x=>x.id);for(let s of ['style-selector','style-presets','stud-ui-design'])assert.ok(ids.includes('knowledge/ui-expert/'+s));assert.ok(searchKnowledge(docs,'Stud UI 3D button simulator',4,'ui').some(x=>x.id.endsWith('stud-ui-design')));let ui=fs.readFileSync(new URL('../skills/ui/SKILL.md',import.meta.url),'utf8');assert.match(ui,/one.*question/i);assert.match(ui,/do not ask/i);});
test('Stud UI actual source kit and MIT license bundled',()=>{for(let s of ['LICENSE','src/StudUI.luau','src/StudMotion.luau','src/CheckUIIcons.luau','references/design-tokens.md','examples/01_ShopWindow.luau'])assert.ok(fs.existsSync(new URL('../vendor/stud-ui/'+s,import.meta.url)),s);});
