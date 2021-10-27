/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import JSZip from 'jszip';

import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ServerLoad from '../upload/serverLoad';

export default class Controller {
    constructor() {
        const uploadAndRenderH = this.uploadRenderH();

        this.serverLoad = new ServerLoad(uploadAndRenderH);

        const { downloadH } = this.serverLoad;

        this.content = new Content(uploadAndRenderH, downloadH);
        this.header = new Header(uploadAndRenderH);
        this.footer = new Footer(uploadAndRenderH);

        this.container = document.querySelector('.chat');
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
    }

    uploadRenderH() {
        return (mesArr) => {
            mesArr.messages.forEach((mesObj) => {
                if (mesObj.data.file) {
                    this.serverLoad.uploadToServ(mesObj.data);
                }
            });
            this.content.addMessages(mesArr);
        };
    }
}
