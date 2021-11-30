/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import './content.css';
import { noteT } from '../noteTmp/note.tmp';
import engine from '../../lib/engine/engine';

import Upload from '../../upload/upload';
import Scroll from './scroll';
import Messages from './messages';

export default class Content {
    constructor(uploadHandler, downloadOnScrollH) {
        this.container = document.querySelector('.chat-content');
        this.messages = new Messages(this.container.querySelector('.messages-container'));

        this.scroll = new Scroll(this.messages.container, downloadOnScrollH);
        this.upload = new Upload(uploadHandler, null, this.container);
        this.isFilter = false;
    }

    getHTML(mesArrObj) {
        const totalHtml = mesArrObj.messages.reduce((total, msg) => {
            total += engine(noteT(msg));
            return total;
        }, '');

        return totalHtml;
    }

    addMessages(mesArrObj) {
        this.scroll.getOldScroll();

        const totalHtml = this.getHTML(mesArrObj);

        if (mesArrObj.direction === 'toTop') {
            this.messages.msgContainer.insertAdjacentHTML('afterbegin', totalHtml);
            this.scroll.changeScroll();
        } else {
            this.messages.msgContainer.insertAdjacentHTML('beforeend', totalHtml);
            this.scroll.toEnd();
        }

        this.messages.refresh();
        this.messages.initLinks(mesArrObj.messages);
    }

    filterMessages(mesArrObj) {
        if (!this.isFilter) {
            this.msgStore = this.messages.msgContainer.innerHTML;
            this.isFilter = true;
        }

        let totalHtml = '';
        if (mesArrObj) {
            totalHtml = this.getHTML(mesArrObj);
        }

        this.messages.msgContainer.innerHTML = totalHtml;

        this.messages.refresh();
        if (totalHtml) this.messages.initLinks(mesArrObj.messages);
    }

    cancelFilter() {
        return () => {
            if (this.isFilter) {
                this.messages.msgContainer.innerHTML = this.msgStore;
                this.isFilter = false;
                this.scroll.block = false;
                this.messages.refresh();
            }
        };
    }
}
