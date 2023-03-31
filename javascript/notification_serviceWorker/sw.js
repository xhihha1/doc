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
self.addEventListener('install', function (event) {
  console.log('install')
  // event.waitUntil(
  //   caches.open(CACHE_NAME)
  //     .then(function(cache) {
  //       console.log('Cache opened');
  //       return cache.addAll(urlsToCache);
  //     })
  // );
});

// 啟用Service Worker
self.addEventListener('activate', function (event) {
  console.log('activate')
  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.filter(function(cacheName) {
  //         return cacheName !== CACHE_NAME;
  //       }).map(function(cacheName) {
  //         return caches.delete(cacheName);
  //       })
  //     );
  //   })
  // );
});

// 監聽fetch事件
self.addEventListener('fetch', function (event) {
  console.log('fetch')
  console.log('event.request', event.request)
  event.respondWith(
    fetch(event.request)
  );
});

// 監聽通知中的按鈕事件
self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  // 如果按下的是'view'按鈕，則導向到指定的URL
  console.log('click')
  if (event.action === 'view') {
    event.waitUntil(clients.openWindow('http://localhost:3336/indexDB.html'));
  }
  if (event.action === 'yes') {
    if (notification.data.link_ok) {
      // clients.openWindow(notification.data.link_ok);
      event.waitUntil(clients.openWindow(notification.data.link_ok));
    }
  }
  notification.close();
});


self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  let title = 'Server Push';
  let options = {
    body: 'push TEST',
    icon: 'Shueisha.png'
  };
  if (event.data) {
    try {
      options = event.data.json();
      title = options.title;
    } catch (e){
      options.body = event.data.text();
      title = 'PUSH'
    }
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("message", (event) => {
  // event is a MessageEvent object
  console.log(`The service worker sent me a message: ${event.data}`);
});
