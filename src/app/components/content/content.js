/* eslint-disable class-methods-use-this */
import './content.css';
import Upload from '../../logic/upload';

export default class Content {
    constructor(handler) {
        this.container = document.querySelector('.chat-content');
        this.messages = this.container.querySelector('.messages');

        this.upload = new Upload(handler, null, this.container);
    }

    addMes(htmlNote) {
        this.messages.insertAdjacentHTML('afterbegin', htmlNote);
        this.revokeURL(this.messages.firstElementChild);
    }

    revokeURL(message) {
        const node = message.querySelector('.node');
        if (node.src) URL.revokeObjectURL(node.src);
    }
}
