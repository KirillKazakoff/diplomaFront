/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('./jszip.js');

self.addEventListener('message', (e) => {
    const { fileData, file } = e.data;
    const { name } = fileData;

    const zip = new JSZip();
    zip.file(name, file);

    zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
            level: 9,
        },
    }).then((result) => {
        self.postMessage({
            file: result,
            fileData,
        });
    });
});
