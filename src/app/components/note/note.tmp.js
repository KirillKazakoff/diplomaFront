/* eslint-disable import/prefer-default-export */
// import { getTime } from '../../lib/utils';

const headerDataT = (time) => ({
    block: 'span',
    cls: 'header-data',
    content: time,
});

const headerT = (time) => ({
    block: 'header',
    cls: 'message-header',
    content: [headerDataT(time)],
});

const contentT = (content) => ({
    block: 'div',
    cls: 'message-content',
    content,
});

export const noteT = (nodeObj) => ({
    block: 'li',
    cls: 'message',
    content: [headerT(nodeObj.data.time), contentT(nodeObj.node.outerHTML)],
    attrs: {
        id: nodeObj.data.id,
    },
});
