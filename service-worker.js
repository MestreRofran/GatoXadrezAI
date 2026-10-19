/* GatoXadrezAI — Service Worker | versão 1.24
   Para publicar uma versão nova, altere apenas APP_VERSION abaixo.
   O navegador instala o novo worker ao detectar a alteração deste arquivo.
*/
const APP_VERSION = '1.24';
const CACHE_PREFIX = 'gx-';
const CORE = `${CACHE_PREFIX}${APP_VERSION}-core`;
const PIECES = `${CACHE_PREFIX}${APP_VERSION}-pieces`;
const CORE_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE);
    await cache.addAll(CORE_FILES);
    // Assume o controle na atualização. Não força recarga de uma partida em andamento.
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CORE && name !== PIECES)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'GET_VERSION') {
    event.ports?.[0]?.postMessage({ version: APP_VERSION });
  }
  if (event.data?.type === 'SKIP_WAITING') {
    event.waitUntil(self.skipWaiting());
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const scopePath = new URL(self.registration.scope).pathname;
  if (!url.pathname.startsWith(scopePath)) return;
  const relativePath = url.pathname.slice(scopePath.length);

  // HTML: prioriza o arquivo publicado mais recente e conserva uma cópia offline.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CORE);
      try {
        const response = await fetch(request, { cache: 'no-store' });
        if (response.ok) await cache.put('./index.html', response.clone());
        return response;
      } catch {
        return (await cache.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // Peças: carrega somente as necessárias e as armazena na versão atual.
  if (relativePath.startsWith('pecas/')) {
    event.respondWith((async () => {
      const cache = await caches.open(PIECES);
      if (relativePath === 'pecas/catalogo.json') {
        try {
          const response = await fetch(request, { cache: 'no-store' });
          if (response.ok) await cache.put(request, response.clone());
          return response;
        } catch {
          return (await cache.match(request)) || Response.error();
        }
      }
      const hit = await cache.match(request);
      if (hit) return hit;
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return Response.error();
      }
    })());
    return;
  }

  // Ícones e manifesto são imutáveis durante uma versão, renovados na próxima.
  if (['manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'].includes(relativePath)) {
    event.respondWith((async () => {
      const cache = await caches.open(CORE);
      return (await cache.match(request)) || fetch(request);
    })());
  }
});
