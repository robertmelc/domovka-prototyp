// Offline režim prototypu Domovka. Při změně souborů zvyšte číslo verze.
const CACHE = "domovka-prototyp-v2";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "apple-touch-icon.png",
  "favicon-32.png",
  "icon-192.png",
  "icon-512.png",
  "maskable-512.png",
  "ibm-plex-sans-latin-400-normal.woff2",
  "ibm-plex-sans-latin-500-normal.woff2",
  "ibm-plex-sans-latin-600-normal.woff2",
  "ibm-plex-sans-latin-700-normal.woff2",
  "ibm-plex-sans-latin-ext-400-normal.woff2",
  "ibm-plex-sans-latin-ext-500-normal.woff2",
  "ibm-plex-sans-latin-ext-600-normal.woff2",
  "ibm-plex-sans-latin-ext-700-normal.woff2"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() => caches.match("index.html"))));
});
