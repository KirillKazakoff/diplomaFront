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

async function cachePriorityStrategy(event) {
    const cacheResponse = await caches.match(event.request);
    // if request url === getFilesData then ignore and getFetchResponse;

    const url = new URL(event.request.url);
    const path = url.pathname;

    if (cacheResponse) {
        return cacheResponse;
    }

    const fetchResponse = await fetch(event.request);
    const cache = await caches.open('v2');

    if (!path.includes('getFilesData')) {
        cache.put(event.request, fetchResponse.clone());
    }

    return fetchResponse;
}

self.addEventListener('fetch', async (event) => {
    // console.log(event.request);
    // console.log(path);
    // console.log(url);
    // if(path)

    event.respondWith(
        cachePriorityStrategy(event),
    );
    // console.log('Происходит запрос на сервер');
});
