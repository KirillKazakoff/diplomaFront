/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import encoding from 'encoding-japanese';

import template from '../../lib/engine/template';
import { imgT, docT, userTextT, videoT, audioT } from './nodes.tmp';
import setLinksInText from '../../components/footer/footerUtils/linkInText';

function promisise(callback) {
    return new Promise((resolve) => callback(resolve));
}

export function imgUpload(url) {
    const callback = (resolve) => {
        const imgContainer = template(imgT);
        const img = imgContainer.firstChild;

        img.addEventListener('load', () => {
            resolve(imgContainer);
        });

        img.src = url;
    };

    return promisise(callback);
}

export function videoUpload(url) {
    const callback = (resolve) => {
        const videoContainer = template(videoT);
        const video = videoContainer.firstChild;

        video.addEventListener('canplay', () => {
            resolve(videoContainer);
        });
        video.src = url;
    };

    return promisise(callback);
}

export function audioUpload(url) {
    const callback = (resolve) => {
        const audioContainer = template(audioT);
        const audio = audioContainer.firstChild;

        audio.addEventListener('canplay', () => {
            resolve(audioContainer);
        });
        audio.src = url;
    };

    return promisise(callback);
}

function codeConvert(result) {
    const convRes = encoding.convert(result, {
        to: 'UNICODE',
        from: 'UTF8',
    });

    return convRes;
}

export function userTxtUpload(file) {
    const callback = (resolve) => {
        const listenerHandler = async (e) => {
            const { result } = e.target;
            const totalRes = codeConvert(result);

            const resText = setLinksInText(totalRes);
            const resTextNode = template(userTextT, resText);

            resolve(resTextNode);
        };

        const reader = new FileReader();
        reader.addEventListener('load', listenerHandler);

        reader.readAsBinaryString(file);
    };

    return promisise(callback);
}

export function docUpload() {
    return template(docT);
}
