const CACHE_NAME = 'diemdanh-app-v1';
const urlsToCache = [
  './index.html'
];

// Cài đặt Service Worker và lưu Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Trả dữ liệu từ Cache khi mạng yếu
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
