/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Upload from './upload';
import api from '../request/api';

export default class ServerLoad {
    constructor(uploadAndRenderH) {
        this.handler = uploadAndRenderH;
        this.downloadH = this.downloadH();
        this.load = new Upload(uploadAndRenderH);

        window.addEventListener('beforeunload', () => api.leave.sendLeaveSignal());
    }

    downloadH() {
        return async (direction) => {
            const messagesData = await api.message.getFilesData();
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

    async uploadToServ(file, fileData) {
        await api.message.sendFileData(fileData);
        await api.message.sendFile(file);
    }
}
