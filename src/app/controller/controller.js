/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ServerLoad from '../upload/serverLoad/serverLoad';

export default class Controller {
    constructor() {
        const uploadH = this.uploadRenderH();

        this.serverLoad = new ServerLoad(uploadH);

        const { downloadOnScrollH, downloadOnFilterH } = this.serverLoad;

        this.content = new Content(uploadH, downloadOnScrollH);
        this.header = new Header(uploadH, downloadOnFilterH);
        this.footer = new Footer(uploadH);

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
