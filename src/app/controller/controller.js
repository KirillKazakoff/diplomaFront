/* eslint-disable class-methods-use-this */
import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import engine from '../lib/engine/engine';
import { noteT } from '../components/note/note.tmp';

export default class Controller {
    constructor() {
        const handler = this.submitHandler();

        this.container = document.querySelector('.chat');
        this.content = new Content(handler);
        this.header = new Header(handler);
        this.footer = new Footer(handler);

        this.container.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
    }

    submitHandler() {
        return (content) => {
            const htmlNote = engine(noteT(content));

            this.content.addMes(htmlNote);
        };
    }
}
