self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event intercepted');

  if (event.request.url.endsWith('/api/data') && event.request.method === 'GET') {
    const mockData = {
      name: 'John Smith',
      age: 30,
      email: 'john.smith@example.com'
    };
    const response = new Response(JSON.stringify(mockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    event.respondWith(response);
  }
});