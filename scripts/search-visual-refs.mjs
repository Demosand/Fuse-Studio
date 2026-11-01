// Search all upstream file paths locally without fetching copyrighted media.
import {searchVisualReferences,visualReferenceOverview} from "../server/visual-references.mjs";
const args=process.argv.slice(2);
if(args.includes("--stats")){console.log(JSON.stringify(visualReferenceOverview(),null,2));process.exit(0);}
const section=args.find(x=>x.startsWith("--section="))?.slice(10)||"all";
const kind=args.find(x=>x.startsWith("--kind="))?.slice(7)||"all";
const query=args.filter(x=>!x.startsWith("--")).join(" ");
const out=searchVisualReferences(query,{section,kind,limit:12});
console.log(JSON.stringify(out,null,2));
