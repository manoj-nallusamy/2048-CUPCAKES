// Service Worker for 2048 Cupcakes PWA
// Only caches icons and manifest for PWA installation
const CACHE_NAME = '2048-cupcakes-icons-v1';

// Only cache icons and manifest - no game files
const PRECACHE_ASSETS = [
  '/favicon.ico',
  '/meta/apple-touch-icon.png',
  '/manifest.json'
];

// Install event - cache only icons and manifest
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_ASSETS).catch(function(error) {
        console.log('Cache addAll error:', error);
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - only serve cached icons/manifest, require network for everything else
self.addEventListener('fetch', function(event) {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  var url = new URL(event.request.url);
  var pathname = url.pathname;

  // Only cache icons and manifest
  var isIconOrManifest = pathname === '/favicon.ico' || 
                         pathname === '/meta/apple-touch-icon.png' || 
                         pathname === '/manifest.json';

  if (isIconOrManifest) {
    // For icons/manifest: try cache first, then network
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            var responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
    );
  } else {
    // For everything else: network only, no offline fallback
    event.respondWith(fetch(event.request));
  }
});

