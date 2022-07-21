import {
    imgUpload,
    userTxtUpload,
    videoUpload,
    audioUpload,
    docUpload,
} from './handlers';

import transformType from './parseTypes';

export default async function parseUpload(file, fileName, subtype) {
    let node = null;
    const url = URL.createObjectURL(file);

    const type = transformType(subtype);

    if (type === 'pic') {
        node = await imgUpload(url);
    }

    if (type === 'doc' && !fileName.includes('user')) {
        node = docUpload();
    }

    if (fileName.includes('user')) {
        node = await userTxtUpload(file);
    }

    if (type === 'video') {
        node = await videoUpload(url);
    }

    if (type === 'audio') {
        node = await audioUpload(url);
    }

    return { node, url, type };
}
