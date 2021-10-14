/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Upload from './upload';
import api from '../request/api';

export default class Download {
    constructor(handler) {
        this.handler = handler;
        this.load = new Upload(handler);
        this.downloadFromServ();
    }

    async downloadFromServ() {
        const messagesData = await api.message.getFilesData();

        const messages = [];
        for (const data of messagesData) {
            const file = await api.message.getFile(data.id);
            const msg = { data, file };

            messages.push(msg);
        }

        console.log(messages);

        // const promises = messages.map((msg) => this.load.onUpload(msg));

        // await Promise.all(promises);
        // console.log(messages);
    }

    async uploadToServ(file, fileData) {
        await api.message.sendFileData(fileData);
        await api.message.sendFile(file);
    }
}
