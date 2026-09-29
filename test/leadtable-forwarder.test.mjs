import assert from 'node:assert/strict';
import test from 'node:test';
import { buildLeadTablePayload, buildSubmissionHandler, parseSubmission } from '../netlify/functions/lib/leadtable-forwarder.mjs';

const base={id:'0123456789abcdef01234567',form_id:'6a4f997908ecaf0008a6276a',form_name:'anfrage-longcovid',created_at:'2026-09-29T12:00:00.000Z',data:{vorname:'Max',nachname:'Mustermann',email:'max@example.com',telefon:'01701234567',beschwerden:'Erschöpfung'}};

test('accepts only the Long-Covid inquiry form',()=>{
 assert.equal(parseSubmission(JSON.stringify(base)).formName,'anfrage-longcovid');
 assert.equal(parseSubmission(JSON.stringify({...base,form_name:'blutzucker-selbstcheck'})),null);
});

test('rejects malformed approved submissions',()=>{
 assert.throws(()=>parseSubmission(JSON.stringify({...base,id:'bad'})),/Invalid/);
 assert.throws(()=>parseSubmission(JSON.stringify({...base,data:[]})),/Invalid/);
 assert.throws(()=>parseSubmission(JSON.stringify({payload:null,...base})),/Invalid/);
});

test('maps name and phone into LeadTable source fields',()=>{
 const payload=buildLeadTablePayload(parseSubmission(JSON.stringify(base)));
 assert.equal(payload.name,'Max Mustermann');
 assert.equal(payload.first_name,'Max');
 assert.equal(payload.last_name,'Mustermann');
 assert.equal(payload.email,'max@example.com');
 assert.equal(payload.number,'01701234567');
 assert.equal(payload.body,'Erschöpfung');
});

test('forwards with exact ten-second timeout',async()=>{
 const calls=[]; const timeouts=[]; const signal=new AbortController().signal;
 const handler=buildSubmissionHandler({endpoint:'https://api.lead-table.com/webhook/example',signalFactory:(ms)=>{timeouts.push(ms);return signal;},fetchImpl:async(url,options)=>{calls.push({url,options});return new Response('0123456789abcdef01234567',{status:200});}});
 const response=await handler({body:JSON.stringify(base)});
 assert.equal(response.statusCode,200); assert.deepEqual(timeouts,[10000]);
 const sent=JSON.parse(calls[0].options.body); assert.equal(sent.number,'01701234567');
});

test('ignores unrelated forms without fetching',async()=>{
 let fetched=false; const handler=buildSubmissionHandler({endpoint:'bad',fetchImpl:async()=>{fetched=true;}});
 const response=await handler({body:JSON.stringify({...base,form_name:'newsletter'})});
 assert.equal(response.statusCode,200); assert.equal(fetched,false);
});

test('rejects unsafe endpoints without crashing',async()=>{
 for(const endpoint of ['bad','http://api.lead-table.com/x','https://example.com/x','https://u:p@api.lead-table.com/x']){
  const response=await buildSubmissionHandler({endpoint})({body:JSON.stringify(base)}); assert.equal(response.statusCode,500);
 }
});

test('rejects text errors and redacts upstream failures',async()=>{
 for(const body of ['not-json','NotFound','Unauthorized','InternalServerError']){
  const handler=buildSubmissionHandler({endpoint:'https://api.lead-table.com/x',fetchImpl:async()=>new Response(body,{status:200})});
  const response=await handler({body:JSON.stringify(base)}); assert.equal(response.statusCode,502); assert.doesNotMatch(response.body,new RegExp(body));
 }
});
