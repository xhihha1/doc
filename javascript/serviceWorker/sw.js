// 定義緩存名稱
const CACHE_NAME = 'my-site-cache-v1';

// 定義需要緩存的文件列表
const urlsToCache = [
  // '/',
  'home.html',
  'page.html',
  'style.css',
  'main.js'
];

// 安裝Service Worker
self.addEventListener('install', function(event) {
  console.log('install')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// 啟用Service Worker
self.addEventListener('activate', function(event) {
  console.log('activate')
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// 監聽fetch事件
self.addEventListener('fetch', function(event) {
  console.log('fetch')
  console.log('event.request', event.request)
  // // 檢查請求是否是對home.html的請求
  if (event.request.url.endsWith('home.html')) {
    // 攔截請求，並將其轉發到page.html頁面
    event.respondWith(
      fetch('page.html')
    );
  } else {
    // 如果不是對home.html的請求，則繼續執行原本的流程
    // event.respondWith(
    //   fetch(event.request)
    // );
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found in cache:', event.request.url);
          return response;
        }
        return fetch(event.request);
      })
    );
  }
});