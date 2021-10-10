/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { DateTime } from 'luxon';

export function getTime() {
    return DateTime.now().toFormat('HH:mm');
}

export function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}
