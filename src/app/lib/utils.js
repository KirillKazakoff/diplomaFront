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

export function getData() {
    return {
        time: getTime(),
        id: nanoid(5),
    };
}
