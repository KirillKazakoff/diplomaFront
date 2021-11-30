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
        this.messages = new Messages(this.container.querySelector('.messages'));

        this.scroll = new Scroll(this.messages.container, downloadOnScrollH);
        this.upload = new Upload(uploadHandler, null, this.container);
    }

    addMessages(mesArrObj) {
        this.scroll.getOldScroll();

        const totalHtml = mesArrObj.messages.reduce((total, msg) => {
            total += engine(noteT(msg));
            return total;
        }, '');

        if (mesArrObj.direction === 'toTop') {
            this.messages.container.insertAdjacentHTML('afterbegin', totalHtml);
            this.scroll.changeScroll();
        } else {
            this.scroll.emptyScroll.insertAdjacentHTML('beforebegin', totalHtml);
            this.scroll.toEnd();
        }

        this.messages.refresh();
        this.messages.initLinks(mesArrObj.messages);
    }
}
