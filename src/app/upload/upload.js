/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { setData } from '../lib/utils';
import unzip from './unzip/unzip';
import parseUpload from './parseUpload/parseUpload';

export default class Upload {
    constructor(handler, input, container) {
        this.handler = handler;

        if (container) {
            this.container = container;
            this.container.addEventListener('dragover', (e) => this.onDragOver(e));
            this.container.addEventListener('drop', (e) => this.onDragDrop(e));
        }

        if (input) {
            this.input = input;
            this.input.addEventListener('input', (e) => this.onUpload(e));
        }
    }

    onClick(e) {
        e.preventDefault();
        this.input.dispatchEvent(new MouseEvent('click'));
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDragDrop(e) {
        e.preventDefault();
        this.onUpload({ target: e.dataTransfer });
    }

    async onUpload(input) {
        const { target } = input;
        let files = [];

        const mesObjArr = {
            messages: [],
            direction: '',
        };

        if (!target) {
            files = await unzip(input);
            mesObjArr.direction = 'toTop';
        } else {
            // add uploadToServ handler
            files = [...target.files].map((file) => ({ file }));
            mesObjArr.direction = 'toBottom';
        }

        if (files.length === 0) return;

        for (const file of files) {
            const { fileData } = file;
            let type = null;
            let name = null;

            if (fileData) {
                name = fileData.name;
                type = fileData.type;
            } else {
                name = file.file.name;
                type = file.file.type;
            }
            const mesObj = await parseUpload(file.file, name, type);

            mesObj.data = fileData ? { fileData } : setData(file.file);
            mesObjArr.messages.push(mesObj);
        }

        this.handler(mesObjArr);
    }

    // async parseUpload(file, fileName, type) {
    //     let node = null;
    //     // const { type } = file;
    //     const url = URL.createObjectURL(file);

    //     if (type.includes('image')) {
    //         node = await imgUpload(url);
    //     }

    //     if ((type.includes('json') || type.includes('text') || type.includes('java'))
    //         && (!fileName.includes('user'))) {
    //         node = docUpload();
    //     }

    //     if (fileName.includes('user')) {
    //         node = await userTxtUpload(file);
    //     }

    //     if (type.includes('video')) {
    //         node = await videoUpload(url);
    //     }

    //     if (type.includes('audio')) {
    //         node = await audioUpload(url);
    //     }

    //     return { node, url };
    // }
}
