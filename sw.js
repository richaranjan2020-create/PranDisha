/**
 * sw.js — PranDisha v7.0 Offline-Capable Service Worker
 *
 * Strategy: NETWORK-FIRST for same-origin files, falling back to the cache
 * when offline. This means:
 *   - Online visitors always get the latest published version (no stale CSS/JS
 *     after you push an update to GitHub Pages).
 *   - Once loaded, all 10 scenarios, bilingual transcripts and Web Audio
 *     micro-tools keep working with no network.
 * Cross-origin requests (Google Fonts, Three.js / GSAP CDNs) and /api/* are
 * passed straight through and never cached here.
 */

'use strict';

const CACHE_NAME = 'prandisha-v7.0-clinical-bento-cache';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './scenarios.js',
  './app.js',
  './manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((oldKey) => caches.delete(oldKey)))
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // fonts / CDNs: let the browser handle them
  if (url.pathname.includes('/api/')) return; // never cache health checks

  event.respondWith(
    fetch(req)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(req).then((cached) => cached || caches.match('./index.html'))
      )
  );
});
