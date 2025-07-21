import { NextResponse } from "next/server"

export async function GET() {
  const swContent = `
const CACHE_NAME = 'student-portal-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Student Portal',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'student-portal-notification',
    requireInteraction: true
  }

  event.waitUntil(
    self.registration.showNotification('Student Portal', options)
  )
})
`

  return new NextResponse(swContent, {
    headers: {
      "Content-Type": "application/javascript",
    },
  })
}
