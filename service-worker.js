/* GatoXadrezAI 1.19 — cache do núcleo e das peças sob demanda */
const CORE='gx-1.19-core', PIECES='gx-1.19-pieces';
const CORE_FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{
 const c=await caches.open(CORE);await c.addAll(CORE_FILES);await self.skipWaiting();
})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{
 const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('gx-')&&!([CORE,PIECES].includes(n))).map(n=>caches.delete(n)));
 await self.clients.claim();
})());});
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 const path=url.pathname;
 if(path.includes('/pecas/')){
  event.respondWith((async()=>{const store=await caches.open(PIECES);
   // Catálogo requer atualização para descobrir arquivos novos quando online.
   if(path.endsWith('/catalogo.json')){try{const r=await fetch(req);if(r.ok)await store.put(req,r.clone());return r;}catch{return await store.match(req)||Response.error();}}
   const hit=await store.match(req);if(hit)return hit;
   const r=await fetch(req);if(r.ok)await store.put(req,r.clone());return r;
  })());return;
 }
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).catch(async()=>await (await caches.open(CORE)).match('./index.html')||Response.error()));return;
 }
 if(CORE_FILES.some(f=>path.endsWith(f.replace('./','/')))){
  event.respondWith(caches.match(req).then(r=>r||fetch(req)));return;
 }
});
