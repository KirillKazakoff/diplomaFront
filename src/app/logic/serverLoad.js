/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Upload from './upload';
import api from '../request/api';

export default class ServerLoad {
    constructor(handler) {
        this.handler = handler;
        this.load = new Upload(handler);
        this.downloadFromServ();
    }

    async downloadFromServ() {
        const messagesData = await api.message.getFilesData();

        const messages = [];
        for (const fileData of messagesData) {
            const file = await api.message.getFile(fileData.idExt);
            const msg = { fileData, file };

            messages.push(msg);
        }

        for (const msg of messages) {
            await this.load.onUpload(msg);
        }

        // const promises = messages.map((msg) => this.load.onUpload(msg));
        // await Promise.all(promises);
    }

    async uploadToServ(file, fileData) {
        await api.message.sendFileData(fileData);
        await api.message.sendFile(file);
    }
}
