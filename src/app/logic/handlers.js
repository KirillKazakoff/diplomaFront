/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { imgT, txtT, videoT, audioT, template } from './nodes.tmp';

function promisise(callback) {
    return new Promise((resolve) => callback(resolve));
}

export function imgUpload(url) {
    const callback = (resolve) => {
        const img = template(imgT);

        img.addEventListener('load', () => {
            resolve(img);
        });
        img.src = url;
    };

    return promisise(callback);
}

export function txtUpload(result) {
    const callback = (resolve) => {
        const txt = template(txtT, result);
        resolve(txt);
    };

    return promisise(callback);
}

export function videoUpload(url) {
    const callback = (resolve) => {
        const video = template(videoT);

        video.addEventListener('canplay', () => {
            resolve(video);
        });
        video.src = url;
    };

    return promisise(callback);
}

export function audioUpload(url) {
    const callback = (resolve) => {
        const audio = template(audioT);

        audio.addEventListener('canplay', () => {
            resolve(audio);
        });
        audio.src = url;
    };

    return promisise(callback);
}


























// this.upload = new Upload((result) => {
//     document.querySelector('.text-preview').textContent = result;
// });

// this.upload = new Upload((result) => {
//     document.querySelector('.image-preview').src = result;
// }, 'image');

// this.upload = new Upload((result) => {
//     const img = document.querySelector('.image-preview');
//     img.addEventListener('load', () => {
//         URL.revokeObjectURL(result);
//     })
//     img.src = result;
// }, 'file');

// this.upload = new Upload((result) => {
//     const video = document.querySelector('.video-preview');
//     video.src = result;

//     video.addEventListener('canplay', () => {
//         URL.revokeObjectURL(result);
//     });
// }, 'file');

// this.upload = new Upload((result, file) => {
//     const link = document.createElement('a');

//     link.href = result;
//     link.download = file.name;
//     link.rel = 'noopener';

//     link.click();

//     URL.revokeObjectURL(result);
// }, 'file');
