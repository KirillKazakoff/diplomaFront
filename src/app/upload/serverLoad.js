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

        window.addEventListener('beforeunload', () => api.leave.sendLeaveSignal());
    }

    down() {
        return async (direction) => {
            const messagesData = await api.message.getFilesData();
            if (!messagesData) return;
            console.log(messagesData);

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
