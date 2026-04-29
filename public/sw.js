
const CACHE_NAME = 'healthcore-v1'
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/'])
    })
  )
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const title   = data.title   ?? 'HealthCore'
  const options = {
    body:    data.body    ?? 'You have a new notification.',
    icon:    data.icon    ?? '/favicon.ico',
    badge:   data.badge   ?? '/favicon.ico',
    tag:     data.tag     ?? 'healthcore-notif',
    data:    data.url     ?? '/',
    actions: data.actions ?? [],
  }
  event.waitUntil(self.registration.showNotification(title, options))
})
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data ?? '/')
      }
    })
  )
})
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SHOW_NOTIFICATION') {
    const { title, body, tag } = event.data.payload
    self.registration.showNotification(title, {
      body,
      icon:  '/favicon.ico',
      badge: '/favicon.ico',
      tag:   tag ?? 'healthcore-local',
    })
  }
})