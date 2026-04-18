self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received');

  let data = {
    title: 'Flash Deal!',
    body: 'New deal available!',
    image: '/icons/icon-192.png'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.image,
    badge: '/icons/icon-192.png',
    data: { url: 'http://localhost:5173' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});