/* eslint-disable class-methods-use-this */
import './content.css';
import Upload from '../../logic/upload';
import { noteT } from '../note/note.tmp';
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
        this.revokeURL(this.messages.firstElementChild);
    }

    revokeURL(message) {
        const node = message.querySelector('.node');
        if (node.src) URL.revokeObjectURL(node.src);
    }
}
