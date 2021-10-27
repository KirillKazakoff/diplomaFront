import {
    imgUpload, userTxtUpload, videoUpload, audioUpload, docUpload,
} from './handlers';

import checkType from './parseTypes';

export default async function parseUpload(file, fileName, type) {
    let node = null;
    const url = URL.createObjectURL(file);

    if (checkType(type, 'pic')) {
        node = await imgUpload(url);
    }

    if ((checkType(type, 'text')) && (!fileName.includes('user'))) {
        node = docUpload();
    }

    if (fileName.includes('user')) {
        node = await userTxtUpload(file);
    }

    if (checkType(type, 'video')) {
        node = await videoUpload(url);
    }

    if (checkType(type, 'audio')) {
        node = await audioUpload(url);
    }

    return { node, url };
}
