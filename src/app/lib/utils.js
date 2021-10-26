/* eslint-disable object-curly-newline */
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
    const idExt = `${id}.zip`;

    const time = getTime();
    const { name } = blob;

    const data = {
        fileData: { id, idExt, time, name },
        file: blob,
    };

    return data;
}
