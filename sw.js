const CACHE_NAME = 'pwa-redirect-cache-v1';
const ASSETS = [
'/',
'/index.html',
'/manifest.json',
'/icon-100.png'
];


self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
});


self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(keys => Promise.all(
keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
))
);
});


self.addEventListener('fetch', event => {
// Serve risorse dalla cache, fallback a network
event.respondWith(
caches.match(event.request).then(cached => cached || fetch(event.request))
);
});
