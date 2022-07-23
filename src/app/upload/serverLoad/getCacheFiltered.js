/* eslint-disable arrow-body-style */
export default function getCacheFiltered(filter, cache) {
    if (filter === 'all') return cache;

    return cache.filter((msgData) => {
        return msgData.type.includes(filter.toLowerCase());
    });
}
