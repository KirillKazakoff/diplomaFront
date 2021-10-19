/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

// import { template } from '../../logic/nodes.tmp';

// import Upload from '../../logic/upload';
import './content.css';
import { noteT } from '../noteTmp/note.tmp';
import engine from '../../lib/engine/engine';

import MultipleUpload from '../../logic/multipleUpload';
import Scroll from './scroll';

export default class Content {
    constructor(uploadHandler, downloadHandler) {
        this.container = document.querySelector('.chat-content');
        this.messages = this.container.querySelector('.messages');

        this.scroll = new Scroll(this.messages, downloadHandler);
        this.upload = new MultipleUpload(uploadHandler, null, this.container);
    }

    addMessages(mesArrObj) {
        console.log(mesArrObj);
        this.scroll.getOldScroll();

        const totalHtml = mesArrObj.messages.reduce((total, msg) => {
            total += engine(noteT(msg));
            return total;
        }, '');

        const emptyScroll = this.messages.querySelector('.empty-scroll');

        mesArrObj.direction === 'toTop'
            ? this.messages.insertAdjacentHTML('afterbegin', totalHtml)
            : emptyScroll.insertAdjacentHTML('beforebegin', totalHtml);

        this.scroll.changeScroll();
    }

    initLoadLink(loadLink, mesObj) {
        loadLink.download = mesObj.data.fileData.name;
        loadLink.href = mesObj.url;
        loadLink.rel = 'noopener';
    }
}

// addMes(mesObj) {
//     const html = engine(noteT(mesObj));
//     this.messages.insertAdjacentHTML('afterbegin', html);

//     const newMes = this.messages.firstElementChild;

//     const contentNode = newMes.querySelector('.node');

//     const loadLink = newMes.querySelector('.fileload-img-link');
//     this.initLoadLink(loadLink, mesObj);

//     // if (contentNode && contentNode.src) {
//     //     URL.revokeObjectURL(contentNode.src);
//     // }
// }

// addMes(mesObj) {
//     this.scroll.getOldScroll();
//     const htmlNode = template(noteT, mesObj);

//     const childNode = mesObj.direction === 'toBottom'
//         ? this.messages.querySelector('.empty-scroll')
//         : this.messages.firstElementChild;

//     this.messages.insertBefore(htmlNode, childNode);

//     // const { children } = this.messages;
//     // const newMes = children[children.length - 2];

//     // const loadLink = newMes.querySelector('.fileload-img-link');
//     // this.initLoadLink(loadLink, mesObj);

//     this.scroll.changeScroll();
// }

// addMes(mesObj) {
//     const htmlNode = template(noteT, mesObj);

//     const childNode = mesObj.direction === 'toBottom'
//         ? this.messages.querySelector('.empty-scroll')
//         : this.messages.firstElementChild;

//     this.messages.insertBefore(htmlNode, childNode);

//     const { children } = this.messages;
//     const newMes = children[children.length - 2];

//     const contentNode = newMes.querySelector('.node');

//     const loadLink = newMes.querySelector('.fileload-img-link');
//     this.initLoadLink(loadLink, mesObj);
// }
