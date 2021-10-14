/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';

export function getTime() {
    return DateTime.now().toFormat('HH:mm');
}

export function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

export function setData(blob) {
    const id = nanoid(5);
    const time = getTime();
    const { name } = blob;

    const formData = new FormData();
    formData.append('file', blob, `${blob.name} ${id}`);

    const data = {
        fileData: { id, time, name },
        file: formData,
    };

    return data;
}

// export function toFormData(file) {
//     const formData = new FormData();

//     formData.append('file', file, file.name + 'abobal');

//     return formData;
// }
