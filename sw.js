const CACHE_NAME = 'diemdanh-app-v5'; 

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo-truong.png'
];

// Sự kiện Install: Tải và lưu cache mới
self.addEventListener('install', event => {
  self.skipWaiting(); // ÉP BẢN MỚI CHẠY NGAY LẬP TỨC KHÔNG CẦN CHỜ ĐỢI
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Sự kiện Activate: Xóa rác, dọn dẹp cache của phiên bản cũ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Đang xóa cache cũ:', cacheName);
            return caches.delete(cacheName); // Bắn bỏ phiên bản cũ
          }
        })
      );
    })
  );
  self.clients.claim(); // Chiếm quyền điều khiển các tab đang mở
});

// Sự kiện Fetch: Chiến thuật "Network First"
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Nếu điện thoại rớt mạng thì mới móc cache cũ ra xài
        return caches.match(event.request);
      })
  );
});
