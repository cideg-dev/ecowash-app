const CACHE = 'ecowash-v2.0.0';
const URLS = [
    '.',
    'index.html',
    'admin.html',
    'produits.html',
    '404.html',
    'css/style.css',
    'js/main.js',
    'js/config.js',
    'js/db.js',
    'js/i18n.js',
    'js/cart.js',
    'manifest.json',
    'sitemap.xml',
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
        }).then(function () {
            return self.clients.matchAll().then(function (clients) {
                clients.forEach(function (c) { c.postMessage({ type: 'SW_UPDATED' }); });
            });
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
            return caches.match('index.html');
        })
    );
});

self.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
        var d = e.data.payload;
        var delay = new Date(d.date + 'T' + d.time).getTime() - Date.now() - 3600000;
        if (delay < 0) delay = 5000;
        setTimeout(function () {
            self.registration.showNotification('EcoWash - Rappel', {
                body: 'Rappel : ' + d.name + ', votre ' + d.service + ' est dans 1 heure !',
                icon: 'images/icon-192.svg',
                tag: 'remind-' + d.id,
                vibrate: [200, 100, 200]
            });
        }, delay);
    }
});

self.addEventListener('push', function (e) {
    var data = { title: 'EcoWash', body: 'Nouvelle mise à jour disponible' };
    if (e.data) {
        try { data = JSON.parse(e.data.text()); } catch (err) {}
    }
    e.waitUntil(
        self.registration.showNotification(data.title || 'EcoWash', {
            body: data.body || '',
            icon: 'images/icon-192.svg',
            badge: 'images/icon-192.svg',
            vibrate: [200, 100, 200],
            data: data.url ? { url: data.url } : {}
        })
    );
});

self.addEventListener('notificationclick', function (e) {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(function (cls) {
            if (cls.length) { cls[0].focus(); }
            else { clients.openWindow('/'); }
        })
    );
});