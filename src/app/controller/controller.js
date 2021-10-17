/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ServerLoad from '../logic/serverLoad';

export default class Controller {
    constructor() {
        const handler = this.loadHandler();

        this.content = new Content(handler);
        this.header = new Header(handler);
        this.footer = new Footer(handler);
        this.serverLoad = new ServerLoad(handler);

        this.container = document.querySelector('.chat');
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
    }

    loadHandler() {
        return (mesObj) => {
            const { file, fileData } = mesObj.data;

            if (file) {
                this.serverLoad.uploadToServ(file, fileData);
            }
            this.content.addMes(mesObj);
        };
    }
}
