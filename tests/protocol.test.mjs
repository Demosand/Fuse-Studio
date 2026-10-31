import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const server = fileURLToPath(new URL('../server/index.mjs', import.meta.url));

test('stdio MCP initializes, lists tools, searches, reads and rejects traversal', async t => {
  const child = spawn(process.execPath, [server], { stdio: ['pipe','pipe','pipe'] });
  t.after(() => child.kill());
  const replies = new Map();
  let buf = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', chunk => {
    buf += chunk;
    let idx;
    while ((idx = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0,idx);buf = buf.slice(idx+1);
      if (!line) continue;
      const msg = JSON.parse(line);const resolve = replies.get(msg.id);
      if (resolve) { replies.delete(msg.id); resolve(msg); }
    }
  });
  let sequence = 0;
  const send = (method, params) => new Promise((resolve,reject)=>{
    const id = ++sequence;
    replies.set(id,resolve);
    const timeout=setTimeout(()=>{replies.delete(id);reject(new Error('MCP timeout'))},4000);
    const old=resolve;replies.set(id,msg=>{clearTimeout(timeout);old(msg)});
    child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');
  });
  const initialized=await send('initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'test',version:'1.0'}});
  assert.equal(initialized.result.serverInfo.name,'kira-studio-knowledge');
  const list = await send('tools/list',{});
  assert.deepEqual(list.result.tools.map(x=>x.name),['search_knowledge','read_knowledge']);
  const result=await send('tools/call',{name:'search_knowledge',arguments:{query:'remote validation security'}});
  assert.match(result.result.content[0].text,/network-security/);
  assert.ok(result.result.content[0].text.length<=3200);
  const read=await send('tools/call',{name:'read_knowledge',arguments:{id:'knowledge/engineering/network-security'}});
  assert.match(read.result.content[0].text,/RemoteEvent/);
  const invalid=await send('tools/call',{name:'read_knowledge',arguments:{id:'../../etc/passwd'}});
  assert.equal(invalid.result.isError,true);
  const notification={jsonrpc:'2.0',method:'notifications/initialized',params:{}};
  child.stdin.write(JSON.stringify(notification)+'\n');
  child.stdin.end();
});
