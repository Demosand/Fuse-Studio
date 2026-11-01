import {test} from "node:test";
import assert from "node:assert/strict";
import {loadVisualReferences,searchVisualReferences,visualReferenceOverview,visualReferenceUrl} from "../server/visual-references.mjs";
test("entire roblox-ai metadata collection indexed with exact source snapshot",()=>{
 const o=visualReferenceOverview();
 assert.equal(o.count,12186);
 assert.equal(o.types.image,11968);
 assert.equal(o.types.video,5);
 assert.equal(o.types.documentation,213);
 assert.equal(loadVisualReferences().length,12186);
 assert.equal(o.sections["game-refs"].image,6602);
 assert.equal(o.sections["roblox-docs"].image,3730);
});
test("Stud mockups and GUI reference search is relevant and bounded",()=>{
 const x=searchVisualReferences("stud shop",{section:"stud",kind:"image",limit:8});
 assert.ok(x.total>0); assert.ok(x.results.some(y=>y.path.includes("style-refs/studs/mockup-shop.png")));
 assert.ok(x.results.every(y=>y.url.startsWith("https://github.com/izzyfrm/roblox-ai/blob/")));
 assert.ok(x.results.every(y=>y.usage.includes("NOT an rbxassetid")));
});
test("documentation and video references are browsable and pagination works",()=>{
 const d=searchVisualReferences("interface",{section:"docs",kind:"image",limit:4,offset:0});
 assert.ok(d.total>0);assert.ok(d.results.every(x=>x.path.startsWith("roblox-docs/")));
 const v=searchVisualReferences("",{kind:"video",limit:3});
 assert.equal(v.total,5);assert.equal(v.results.length,3);assert.equal(v.nextOffset,3);
 const q=searchVisualReferences("",{kind:"video",limit:3,offset:3});
 assert.equal(q.results.length,2);
});
test("input validation and safe links",()=>{
 assert.throws(()=>searchVisualReferences("x",{section:"../bad"}));
 assert.throws(()=>searchVisualReferences("x",{limit:900}));
 assert.throws(()=>visualReferenceUrl("../oops"));
 assert.ok(visualReferenceUrl("visual-refs/icons/Shop Outline 256px.png").includes("Shop%20Outline"));
});
