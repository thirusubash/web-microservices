// service-worker.js

// Define the cache name
const cacheName = 'my-cache';

// List of assets to cache
const assetsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    // Add other important files here
];

// Install event: Cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

// Fetch event: Serve assets from cache or fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
