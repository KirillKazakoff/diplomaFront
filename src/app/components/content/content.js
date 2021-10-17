/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import './content.css';
import Upload from '../../logic/upload';
import { noteT } from '../noteTmp/note.tmp';
import engine from '../../lib/engine/engine';

export default class Content {
    constructor(handler) {
        this.container = document.querySelector('.chat-content');
        this.messages = this.container.querySelector('.messages');

        this.upload = new Upload(handler, null, this.container);
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
}
