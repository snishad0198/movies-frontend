/**
 * Movies.snishad Service Worker (PWA)
 * Caches core app shell assets, provides offline resilience, and accelerates load times.
 */

const CACHE_NAME = "movies-snishad-pwa-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/logo.jpg"
];

// 1. Install event: Pre-cache core shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[SW] Pre-cache failed partially:", err);
      });
    })
  );
  self.skipWaiting();
});

// 2. Activate event: Clean up legacy caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch event: Network-first for dynamic content, cache-first for static assets
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Bypass non-GET requests and external third-party API / video embeds
  if (req.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Static assets (images, fonts, styles): Cache-First
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.match(/\.(jpg|jpeg|png|webp|svg|ico|woff2|woff|css)$/)
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation & HTML pages: Network-First with Offline Cache fallback
  event.respondWith(
    fetch(req)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return networkRes;
      })
      .catch(async () => {
        const cachedRes = await caches.match(req);
        if (cachedRes) return cachedRes;
        const fallbackHome = await caches.match("/");
        if (fallbackHome) return fallbackHome;
        return new Response(
          `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Offline | Movies.snishad</title><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{background:#08080c;color:#f8fafc;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;padding:20px}h1{color:#e50914}p{color:#94a3b8}a{display:inline-block;margin-top:16px;background:#e50914;color:#fff;padding:10px 20px;border-radius:12px;text-decoration:none;font-weight:bold}</style></head><body><div><h1>Movies.snishad</h1><h2>You Are Currently Offline</h2><p>Please check your network connection and retry.</p><a href="/">Reload Platform</a></div></body></html>`,
          { headers: { "Content-Type": "text/html" } }
        );
      })
  );
});
