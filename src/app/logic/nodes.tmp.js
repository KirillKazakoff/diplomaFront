/* eslint-disable import/prefer-default-export */
import engine from '../lib/engine/engine';

// noteView (file icon and load icon)
const noteViewT = (fileImgCls, loadImgCls) => ({
    block: 'div',
    cls: 'message-fileload',
    content: [{
        block: 'div',
        cls: `file-img ${fileImgCls}`,
        content: '',
    }, {
        block: 'a',
        cls: `fileload-img-link ${loadImgCls}`,
        content: '',
    }],
});

// templatesTypes
const wrapperT = (typeT, fileImgCls, loadImgCls) => ({
    block: 'div',
    cls: 'mes-content-wrapper',
    content: [typeT, noteViewT(fileImgCls, loadImgCls)],
});

export const imgT = () => wrapperT({
    block: 'img',
    cls: 'node mes-img',
}, 'hidden', 'active');

export const docT = () => wrapperT({
    block: 'div',
    cls: 'node mes-doc',
}, 'active', 'active');

export const videoT = () => wrapperT({
    block: 'video',
    cls: 'node mes-video',
    attrs: {
        controls: true,
    },
}, 'hidden', 'active');

export const audioT = () => wrapperT({
    block: 'audio',
    cls: 'node mes-audio',
    attrs: {
        controls: true,
    },
}, 'hidden', 'active');

export const userTextT = (txt) => wrapperT({
    block: 'div',
    cls: 'node mes-txt mes-txt-user',
    content: txt,
}, 'hidden', 'hidden');

// templateFunc (toDOMNode)
export const template = (tmp, param) => {
    let prm = param;
    if (!param) prm = null;

    const node = document.createElement('div');

    node.innerHTML = engine(tmp(prm));
    return node.firstChild;
};

