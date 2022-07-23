/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Upload from '../upload';
import api from '../../request/api';
import Fallback from './fallback';
import loaderStatus from '../loaderStatus/LoaderStatus';
import getCacheFiltered from './getCacheFiltered';

export default class ServerLoad {
    constructor(uploadAndRenderH) {
        this.fallback = new Fallback();
        this.lostConection = false;

        this.downloadOnScrollH = this.downloadOnScrollH();
        this.downloadOnFilterH = this.downloadOnFilterH();

        this.loader = new Upload(uploadAndRenderH);

        this.uploadToServWorker = new Worker('./worker/zip-worker.js');
        this.uploadToServWorker.addEventListener('message', (e) => this.workerHandler(e));

        window.addEventListener('beforeunload', () => api.utils.sendLeaveSignal());
    }

    downloadOnScrollH() {
        return async (direction) => {
            loaderStatus.showLoader();
            if (this.lostConection) return;

            let messagesData = null;
            const cache = await api.message.getAllFilesData();
            try {
                await this.fallback.checkConnection();
                messagesData = await api.message.getFilesData();
            } catch (e) {
                messagesData = cache;
                this.lostConection = true;
            }

            if (!messagesData) {
                loaderStatus.hideLoader();
                return;
            }

            await this.load(messagesData, direction);
            loaderStatus.hideLoader();
        };
    }

    downloadOnFilterH() {
        return async (direction, filter) => {
            let messagesData = null;
            try {
                await this.fallback.checkConnection();
                messagesData = await api.message.getFilesDataFiltered(filter);
            } catch (e) {
                const cache = await api.message.getAllFilesData();
                messagesData = getCacheFiltered(filter, cache);
            }

            if (!messagesData) return;

            this.load(messagesData, direction);
        };
    }

    async load(messagesData, direction) {
        const messages = [];

        for (const fileData of messagesData) {
            const file = await api.message.getFile(fileData.idExt);
            const msg = { fileData, file, direction };

            messages.push(msg);
        }

        await this.loader.onUpload(messages);
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
