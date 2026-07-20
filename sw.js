const CACHE = 'ecowash-v1';
const URLS = [
    '.',
    'index.html',
    'admin.html',
    'produits.html',
    'css/style.css',
    'js/main.js',
    'js/config.js',
    'manifest.json',
    'images/icon-192.svg',
    'images/icon-512.svg'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE).then(function (cache) {
            return cache.addAll(URLS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (k) { return k !== CACHE; })
                    .map(function (k) { return caches.delete(k); })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        caches.match(e.request).then(function (cached) {
            return cached || fetch(e.request).then(function (response) {
                return caches.open(CACHE).then(function (cache) {
                    if (e.request.url.startsWith(self.location.origin)) {
                        cache.put(e.request, response.clone());
                    }
                    return response;
                });
            });
        }).catch(function () {
            return caches.match('/');
        })
    );
});
