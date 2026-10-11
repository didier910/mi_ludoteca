const CACHE_VERSIONS = {
    STATIC: 'static-v5',   // bump version para forzar actualización
    DYNAMIC: 'dynamic-v2',
    INMUTABLE: 'inmutable-v2'
};

// App shell — rutas que Vite sirve en desarrollo y que existen en producción
const APP_SHELL = [
    new URL('./', self.location).href,
    new URL('index.html', self.location).href,
];

// Ya no cacheamos Bootstrap — fue eliminado del proyecto
const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Righteous&display=swap'
];

self.addEventListener('install', async (e) => {
    try {
        const [staticCache, inmutableCache] = await Promise.all([
            caches.open(CACHE_VERSIONS.STATIC),
            caches.open(CACHE_VERSIONS.INMUTABLE)
        ]);

        await Promise.all([
            staticCache.addAll(APP_SHELL),
            inmutableCache.addAll(APP_SHELL_INMUTABLE)
        ]);

        await self.skipWaiting();
    } catch (error) {
        console.error('Cache installation failed:', error);
    }
});

self.addEventListener('activate', async (e) => {
    try {
        const keys = await caches.keys();
        const deletions = keys
            .filter(key => {
                const isStaticOutdated = key !== CACHE_VERSIONS.STATIC && key.includes('static');
                const isDynamicOutdated = key !== CACHE_VERSIONS.DYNAMIC && key.includes('dynamic');
                const isImmutableOutdated = key !== CACHE_VERSIONS.INMUTABLE && key.includes('inmutable');
                return isStaticOutdated || isDynamicOutdated || isImmutableOutdated;
            })
            .map(key => caches.delete(key));

        await Promise.all(deletions);
        await self.clients.claim();
    } catch (error) {
        console.error('Cache cleanup failed:', error);
    }
});

const CACHE_DYNAMIC_LIMIT = 50;

async function cleanCache(cacheName, maxItems) {
    try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        if (keys.length > maxItems) {
            await cache.delete(keys[0]);
            await cleanCache(cacheName, maxItems);
        }
    } catch (error) {
        console.error('Cache cleaning failed:', error);
    }
}

self.addEventListener('fetch', (e) => {
    // Ignorar peticiones no-GET y extensiones de Chrome
    if (e.request.method !== 'GET') return;
    if (e.request.url.startsWith('chrome-extension://')) return;

    e.respondWith((async () => {
        try {
            // 1. Cache first
            const cachedResponse = await caches.match(e.request);
            if (cachedResponse) return cachedResponse;

            // 2. Network fallback
            const networkResponse = await fetch(e.request);

            // Solo cachear respuestas válidas del mismo origen
            if (
                !networkResponse ||
                networkResponse.status !== 200 ||
                networkResponse.type !== 'basic'
            ) {
                return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            const cache = await caches.open(CACHE_VERSIONS.DYNAMIC);
            await cache.put(e.request, responseToCache);
            await cleanCache(CACHE_VERSIONS.DYNAMIC, CACHE_DYNAMIC_LIMIT);

            return networkResponse;
        } catch (error) {
            console.error('Fetch failed:', error);
            // Fallback offline — podrías devolver una página offline aquí
            return new Response('Sin conexión', { status: 503, statusText: 'Service Unavailable' });
        }
    })());
});