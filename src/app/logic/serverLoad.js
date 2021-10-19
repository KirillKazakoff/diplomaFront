/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import MultipleUpload from './multipleUpload';
import api from '../request/api';

export default class ServerLoad {
    constructor(handler) {
        this.handler = handler;
        this.downHandler = this.down();
        this.load = new MultipleUpload(handler);

        this.messages = document.querySelector('.messages');
        this.scrollLength = 0;
    }

    down() {
        return async (direction) => {
            const messagesData = await api.message.getFilesData();

            const messages = [];
            for (const fileData of messagesData) {
                const file = await api.message.getFile(fileData.idExt);
                const msg = { fileData, file, direction };

                messages.push(msg);
            }

            this.load.onUpload(messages);
        };
    }

    async uploadToServ(file, fileData) {
        await api.message.sendFileData(fileData);
        await api.message.sendFile(file);
    }
}

// async downloadFromServ() {
//     const messagesData = await api.message.getFilesData();

//     const messages = [];
//     for (const fileData of messagesData) {
//         const file = await api.message.getFile(fileData.idExt);
//         const msg = { fileData, file };

//         messages.push(msg);
//     }

//     console.log(messages);
//     this.load.onUpload(messages);
// }
