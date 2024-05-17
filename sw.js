const urlsToCache = [
  "/",
  "./src/index.html",
  "./src/fallback.html",

  "./src/js/script.js",
  "./src/js/currency-codes.js",
  
  "./src/css/style.css",
  "./images",
];

// Install event - caching resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Failed to cache resources during installation:", error);
      })
  );
});

// Activate event - cleanup old caches if necessary
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["v1"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serving cached resources when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // If the resource is in the cache, return it
        if (response) {
          return response;
        }
        // If the resource is not in the cache, fetch it from the network
        return fetch(event.request).then((networkResponse) => {
          // Cache the new resource
          return caches.open("v1").then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
      .catch(() => {
        // If both cache and network fail, you might want to serve a fallback page
        // return caches.match("/fallback.html");
      })
  );
});

/*
const urlsToCache = [
  "/",
  "./index.html",
  "./src/js/script.js",
  "./src/js/currency-codes.js",
  "./src/css/style.css",
  "./images",
];

// self.addEventListener("install", (event) => {

//     let cacheUrls = async () => {
//         const cache = await caches.open("v1");
//         return cache.addAll(urlsToCache);
//     };
//     event.waitUntil(cacheUrls());
// });

// install sw
self.addEventListener("install", (event) => {
  // console.log("Service worker installed");
  event.waitUntil(
    caches.open("v1")
    .then((cache) => cache.addAll(urlsToCache))
    );
});

// activate sw
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});


*/
