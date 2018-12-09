let cacheName = 'graph-maker-cache';
let filesToCache = [
    '/graph-maker/',
    '/graph-maker/index.html',
    '/graph-maker/app/img/favicon.png',
    '/graph-maker/app/img/logo-200x200.png',
    '/graph-maker/app/img/logo-192x192.png',
    '/graph-maker/app/img/logo-512x512.png',
    '/graph-maker/app/script.js',
    '/graph-maker/app/style.css',
    '/graph-maker/app/lib/materialize.min.css',
    '/graph-maker/app/lib/materialize.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            return cache.addAll(filesToCache)
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true})
        .then((response) => {
            console.log("response: " + response);
            return response || fetch(event.request);
        })
    );
});