/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import JSZip from 'jszip';
import path from 'path';

export default function unzip(zippes) {
    const files = [];

    for (const zip of zippes) {
        console.log(zip);
        const jsZip = new JSZip();
        jsZip.loadAsync(zip.file).then((resZ) => {
            // const file = new File(resZ.file(), 'heh');
            console.log(resZ.files);
            const key = Object.keys(resZ.files)[0];
            const zipFile = resZ.files[key];
            zipFile.async('blob').then((resFile) => {
                console.log(createFileObj(resFile, zip));
            });
        });

        // console.log(zip);
    }
}

function createFileObj(unpacked, zip) {
    return {
        file: unpacked,
        type: path.extname(zip.fileData.name),
    };
}
