/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Upload from '../upload';
import api from '../../request/api';
import Fallback from './fallback';

export default class ServerLoad {
    constructor(uploadAndRenderH) {
        this.fallback = new Fallback();
        this.lostConection = false;

        this.handler = uploadAndRenderH;
        this.downloadH = this.downloadH();
        this.load = new Upload(uploadAndRenderH);

        this.uploadToServWorker = new Worker('./worker/zip-worker.js');
        this.uploadToServWorker.addEventListener('message', (e) => this.workerHandler(e));

        window.addEventListener('beforeunload', () => api.utils.sendLeaveSignal());
    }

    downloadH() {
        return async (direction) => {
            if (this.lostConection) return;

            // console.log('hello');
            let messagesData = null;
            const cache = await api.message.getAllFilesData();
            // console.log(await api.message.getFilesData());

            try {
                messagesData = await api.message.getFilesData();
            } catch (e) {
                messagesData = cache;
                this.lostConection = true;
            }

            // console.log(messagesData);
            if (!messagesData) return;

            const messages = [];
            for (const fileData of messagesData) {
                const file = await api.message.getFile(fileData.idExt);
                const msg = { fileData, file, direction };

                messages.push(msg);
            }

            console.log(messages);
            this.load.onUpload(messages);
        };
    }

    workerHandler(e) {
        const { fileData, file } = e.data;

        const formData = new FormData();
        formData.append('file', file, fileData.idExt);

        api.message.sendFileData(fileData);
        api.message.sendFile(formData);
    }

    async uploadToServ(data) {
        this.uploadToServWorker.postMessage(data);
    }
}
