/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import './content.css';
import { noteT } from '../noteTmp/note.tmp';
// import engine from '../../lib/engine/engine';
import { template } from '../../logic/nodes.tmp';

import Upload from '../../logic/upload';
import Scroll from './scroll';

export default class Content {
    constructor(uploadHandler, downloadHandler) {
        this.container = document.querySelector('.chat-content');
        this.messages = this.container.querySelector('.messages');

        this.scroll = new Scroll(this.messages, downloadHandler);
        this.upload = new Upload(uploadHandler, null, this.container);
    }

    addMes(mesObj) {
        const htmlNode = template(noteT, mesObj);

        const emptyNode = this.messages.querySelector('.empty-scroll');
        this.messages.insertBefore(htmlNode, emptyNode);

        const { children } = this.messages;
        const newMes = children[children.length - 2];

        const contentNode = newMes.querySelector('.node');

        const loadLink = newMes.querySelector('.fileload-img-link');
        this.initLoadLink(loadLink, mesObj);

        // if (contentNode && contentNode.src) {
        //     URL.revokeObjectURL(contentNode.src);
        // }
    }

    initLoadLink(loadLink, mesObj) {
        loadLink.download = mesObj.data.fileData.name;
        loadLink.href = mesObj.url;
        loadLink.rel = 'noopener';
    }
}
