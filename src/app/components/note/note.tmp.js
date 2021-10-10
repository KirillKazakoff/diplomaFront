/* eslint-disable import/prefer-default-export */
import { getTime } from '../../lib/utils';

const headerDataT = () => ({
    block: 'span',
    cls: 'header-data',
    content: getTime(),
});

const headerT = () => ({
    block: 'header',
    cls: 'message-header',
    content: [headerDataT()],
});

const contentT = (content) => ({
    block: 'div',
    cls: 'message-content',
    content,
});

export const noteT = (content) => ({
    block: 'li',
    cls: 'message',
    content: [headerT(), contentT(content)],
});
