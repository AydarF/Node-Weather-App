const CACHE_NAME = "sw-cache-example";

const toCache = [
  "/",
  "css/styles.css",
  "img/apple-touch.png",
  "img/puppy.jpg",
  "img/splash-screen.png",
  "img/weather-cloud.png",
  "js/app.js",
  "js/manifest.webmanifest",
  "js/pwa.js",
  "js/status.js",
  "../src/app.js",
  "../templates/partials/header.hbs",
  "../templates/partials/footer.hbs",
  "../templates/views/index.hbs",
  "../templates/views/about.hbs",
  "../templates/views/404.hbs",
  "../templates/views/news.hbs",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches
      .keys()
      .then((keysList) => {
        return Promise.all(
          keysList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Removing old cache", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
