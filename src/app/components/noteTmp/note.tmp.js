/* eslint-disable import/prefer-default-export */

const headerDataT = (time) => ({
    block: 'span',
    cls: 'header-data',
    content: time,
});

const fileNameT = (name) => {
    const nameCls = name.includes('user') ? 'hidden' : 'active';

    return {
        block: 'div',
        cls: `filename ${nameCls}`,
        content: name,
    };
};

const headerT = (time, fileName) => ({
    block: 'header',
    cls: 'message-header',
    content: [headerDataT(time), fileNameT(fileName)],
});

const contentT = (html) => ({
    block: 'div',
    cls: 'message-content',
    content: [html],
});

export const noteT = (nodeObj) => {
    const { time, id, name: fileName } = nodeObj.data.fileData;
    const { outerHTML } = nodeObj.node;

    return {
        block: 'li',
        cls: 'message',
        content: [headerT(time, fileName), contentT(outerHTML)],
        attrs: { id },
    };
};
