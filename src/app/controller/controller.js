/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Download from '../logic/download';

import { toFormData } from '../lib/utils';

export default class Controller {
    constructor() {
        const handler = this.submitHandler();

        this.content = new Content(handler);
        this.header = new Header(handler);
        this.footer = new Footer(handler);
        this.download = new Download(handler);

        this.container = document.querySelector('.chat');
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
    }

    submitHandler() {
        return (mesObj) => {
            const { file, fileData } = mesObj.data;

            if (file) {
                this.download.uploadToServ(file, fileData);
            }
            this.content.addMes(mesObj);
        };
    }
}
