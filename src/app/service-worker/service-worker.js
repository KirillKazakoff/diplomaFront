/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
    caches.open('v2').then((cache) => {
        cache.addAll([
            './',
            './index.html',
            './main.css',
            './bundle.js',
            './img/backDefault.jpg',
            './img/userDefault.png',
        ]);
    });
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

async function httpPriorityStrategy(event, path) {
    let fetchResponse;
    try {
        fetchResponse = await fetch(event.request);
    } catch (e) {
        console.log(e);
    }

    if (path.includes('send') || path.includes('leave')) {
        return fetchResponse;
    }

    if (fetchResponse) {
        const cache = await caches.open('v2');
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
    }

    const cacheResponse = await caches.match(event.request);
    return cacheResponse;
}

async function cachePriorityStrategy(event, path) {
    // console.log(event.request);
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
        return cacheResponse;
    }
    console.log(path);
    // console.log(event.request);
    // console.log(cacheResponse);

    const fetchResponse = await fetch(event.request);
    const cache = await caches.open('v2');

    if (!path.includes('getFilesData')) {
        cache.put(event.request, fetchResponse.clone());
    }

    return fetchResponse;
}

self.addEventListener('fetch', async (event) => {
    const url = new URL(event.request.url);
    const path = url.pathname;

    // console.log(event.request);
    // console.log(path);

    if (path.includes('bundle') || path.includes('send')) {
        event.respondWith(httpPriorityStrategy(event, path));
        return;
    }

    event.respondWith(cachePriorityStrategy(event, path));
});
