/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import JSZip from 'jszip';

export default async function unzip(zippes) {
    const files = [];

    for (const zip of zippes) {
        const jsZip = new JSZip();
        const loadedZip = await jsZip.loadAsync(zip.file);

        const key = Object.keys(loadedZip.files)[0];
        const fileInZip = loadedZip.files[key];

        const blob = await fileInZip.async('blob');
        zip.file = blob;

        files.push(zip);
    }

    return files;
}
