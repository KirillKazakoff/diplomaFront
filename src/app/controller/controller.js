/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import Content from '../components/content/content';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ServerLoad from '../upload/serverLoad';

export default class Controller {
    constructor() {
        const mediaHandler = this.mediaHander();
        const loadHandler = this.loadHandler();
        this.serverLoad = new ServerLoad(loadHandler);

        const { downHandler } = this.serverLoad;

        this.content = new Content(loadHandler, downHandler);
        this.header = new Header(loadHandler);
        this.footer = new Footer(loadHandler, mediaHandler);

        this.container = document.querySelector('.chat');
        this.container.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
    }

    loadHandler() {
        return (mesArr) => {
            mesArr.messages.forEach((mesObj) => {
                const { file, fileData } = mesObj.data;

                if (file) {
                    this.serverLoad.uploadToServ(file, fileData);
                }
            });
            this.content.addMessages(mesArr);
        };
    }

    mediaHander() {
        return () => {
            this.container.classList.toggle('hidden');
        };
    }
}
