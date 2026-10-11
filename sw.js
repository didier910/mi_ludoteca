const CACHE_VERSIONS = {
    STATIC: 'mi-ludoteca-static-v6',
    DYNAMIC: 'mi-ludoteca-dynamic-v3'
};

const APP_SHELL = [
    new URL('./', self.location).href,
    new URL('index.html', self.location).href,
    new URL('manifest.json', self.location).href,
    new URL('icon-ludoteca-192.png', self.location).href,
    new URL('icon-ludoteca.png', self.location).href
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_VERSIONS.STATIC);
        await cache.addAll(APP_SHELL);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const currentCaches = new Set(Object.values(CACHE_VERSIONS));
        const legacyCaches = new Set(['static-v5', 'dynamic-v2', 'inmutable-v2']);
        const keys = await caches.keys();
        await Promise.all(
            keys
                .filter((key) => (
                    (key.startsWith('mi-ludoteca-') && !currentCaches.has(key))
                    || legacyCaches.has(key)
                ))
                .map((key) => caches.delete(key))
        );
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.origin !== self.location.origin) {
        return;
    }

    event.respondWith((async () => {
        try {
            const response = await fetch(request);
            if (response.ok) {
                const cache = await caches.open(CACHE_VERSIONS.DYNAMIC);
                try {
                    await cache.put(request, response.clone());
                } catch (error) {
                    console.error('Failed to cache response:', error);
                }
            }
            return response;
        } catch (error) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }

            if (request.mode === 'navigate') {
                const appShell = await caches.match(APP_SHELL[0]);
                if (appShell) {
                    return appShell;
                }
            }

            console.error('Network request failed and no cached response was found:', error);
            return new Response('Sin conexión', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    })());
});
