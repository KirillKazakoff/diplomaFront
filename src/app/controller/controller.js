/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import engine from '../lib/engine/engine';
import { getData } from '../lib/utils';
import { noteT } from '../components/note/note.tmp';
import Upload from '../logic/upload';


export default class Controller {
    constructor() {
        const handler = this.submitHandler();

        this.content = new Content(handler);
        this.header = new Header(handler);
        this.footer = new Footer(handler);

        this.container = document.querySelector('.chat');
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
        this.download = new Upload(handler);
    }

    onSubmit(e) {
        e.preventDefault();
    }

    submitHandler() {
        return (nodeObj) => {
            if (!nodeObj.data) {
                nodeObj.data = getData();
            }
            const htmlNote = engine(noteT(nodeObj));
            this.content.addMes(htmlNote);
        };
    }
}
