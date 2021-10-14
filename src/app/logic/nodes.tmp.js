/* eslint-disable import/prefer-default-export */
import engine from '../lib/engine/engine';

export const imgT = () => ({
    block: 'img',
    cls: 'node mes-img',
});

export const txtT = (txt) => ({
    block: 'div',
    cls: 'node mes-txt',
    content: txt,
});

export const videoT = () => ({
    block: 'video',
    cls: 'node mes-video',
    attrs: {
        controls: true,
    },
});

export const audioT = () => ({
    block: 'audio',
    cls: 'node mes-audio',
    attrs: {
        controls: true,
    },
});

export const userTxtT = (txt) => ({
    block: 'div',
    cls: 'node mes-txt mes-txt-user',
    content: txt,
});

export const template = (tmp, param) => {
    let prm = param;
    if (!param) prm = null;

    const node = document.createElement('div');
    node.innerHTML = engine(tmp(prm));
    return node.firstChild;
};

// const template = document.createElement('template');

// template.innerHTML = engine(imgT(url));

// console.log(template.content.firstChild);
