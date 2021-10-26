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
                const { file, fileData } = mesObj.data;

                if (file) {
                    const zip = new JSZip();
                    const { name, idExt } = fileData;
                    zip.file(name, file);

                    zip.generateAsync({
                        type: 'blob',
                        compression: 'DEFLATE',
                        compressionOptions: {
                            level: 9,
                        },
                    }).then((result) => {
                        const formData = new FormData();
                        formData.append('file', result, idExt);
                        this.serverLoad.uploadToServ(formData, fileData);
                    });
                }
            });
            this.content.addMessages(mesArr);
        };
    }
}