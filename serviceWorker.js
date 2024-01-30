
// Listener for the install event - pre-caches our assets list on service worker install.


const CACHE_NAME = "gamebook-helper-site";
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/script.js",
  "/style.css",
  "/images/d6-1.png",
  "/images/d6-2.png",
  "/images/d6-3.png",
  "/images/d6-4.png",
  "/images/d6-5.png",
  "/images/d6-6.png",
  "/images/ice-golem.png",
  "/images/info.png",
]

/*self.addEventListener("install", installEvent => {
  //installEvent.waitUntil(
  installEvent.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    //caches.open(CACHE_NAME).then(cache => {
    cache.addAll(PRECACHE_ASSETS);
    })
  )
})*/
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
      cache.addAll(PRECACHE_ASSETS);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});


/*
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
*/
self.addEventListener('fetch', event => {
  event.respondWith(async () => {
      const cache = await caches.open(CACHE_NAME);

      // match the request to our cache
      const cachedResponse = await cache.match(event.request);

      // check if we got a valid response
      if (cachedResponse !== undefined) {
          // Cache hit, return the resource
          return cachedResponse;
      } else {
        // Otherwise, go to the network
          return fetch(event.request)
      };
  });
});
