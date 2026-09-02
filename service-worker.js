const CACHE_NAME = "agrotria-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./a-propos.html",
  "./equipe.html",
  "./activites.html",
  "./boutique.html",
  "./blog.html",
  "./contact.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./agrotria-logo.png",
  "./icon-192.png",
  "./icon-512.png",
  "./favicon-32.png",
  "./apple-touch-icon.png"
];

/* =========================
   INSTALLATION
========================= */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});


/* =========================
   ACTIVATION
========================= */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});


/* =========================
   REQUÊTES
========================= */

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {

            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            return caches.match("./index.html");
          });
      })
  );
});