/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Upload from './upload';
import api from '../request/api';

export default class Download {
    constructor(handler) {
        this.handler = handler;
        this.load = new Upload(handler);
    }

    async renderMessagesFromServ() {
        const messages = await api.message.getMessages();
        const promises = messages.map((msg) => this.load.onUpload(msg));

        await Promise.all(promises);
    }
}

// for (const message of messages) {
//     await this.load.onUpload(message);
// }
