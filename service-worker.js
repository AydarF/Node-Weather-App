const CACHE_NAME = "sw-cache-example";

const toCache = [
  "/newsdata",
  "/news",
  "/about",
  "/404",
  "/",
  "/css/styles.css",
  "/img/apple-touch.png",
  "/img/puppy.jpg",
  "/img/splash-screen.png",
  "/img/weather-cloud.png",
  "/js/app.js",
  "/js/fetchNews.js",
  "/js/pwa.js",
  "/src/utils/forecast.js",
  "/src/utils/geocode.js",
  "/src/utils/news.js",
  "/src/app.js",
  "/templates/partials/header.hbs",
  "/templates/partials/footer.hbs",
  "/templates/views/index.hbs",
  "/templates/views/about.hbs",
  "/templates/views/news.hbs/",
  "/templates/views/404.hbs",
  "/manifest.webmanifest",
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

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      } else {
        return fetch(event.request);
      }
    })
    // .catch(() => {
    //   return caches.open(CACHE_NAME).then((cache) => {
    //     return
    //   });
    // })
  );
});
