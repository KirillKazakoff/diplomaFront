/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import './content.css';
import { noteT } from '../noteTmp/note.tmp';
import engine from '../../lib/engine/engine';

import Upload from '../../logic/upload';
import Scroll from './scroll';

export default class Content {
    constructor(uploadHandler, downloadHandler) {
        this.container = document.querySelector('.chat-content');
        this.messages = this.container.querySelector('.messages');

        this.scroll = new Scroll(this.messages, downloadHandler);
        this.upload = new Upload(uploadHandler, null, this.container);

        this.messages.addEventListener('scroll', (e) => this.onScroll(e));
    }

    addMes(mesObj) {
        const htmlNote = engine(noteT(mesObj));

        this.messages.insertAdjacentHTML('afterbegin', htmlNote);

        const message = this.messages.firstElementChild;
        const contentNode = message.querySelector('.node');

        const loadLink = message.querySelector('.fileload-img-link');
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

    onScroll(e) {
        console.log(this.messages.scrollTop);

        const { clientHeight, scrollHeight } = this.messages;
        const scrollLength = scrollHeight - clientHeight;
    }
}
