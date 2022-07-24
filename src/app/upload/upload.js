/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { setData } from '../lib/utils';
import unzip from './zip/unzip';
import parseUpload from './parseUpload/parseUpload';
import info from '../components/info/info';

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
            files = [...target.files].map((file) => ({ file }));
            mesObjArr.direction = 'toBottom';
        }

        if (files.length === 0) {
            this.handler(false);
            return;
        }

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
            if (!mesObj.node) {
                info.renderInfo(
                    info.messages.typeLoadError.title,
                    info.messages.typeLoadError.desc,
                );
                throw new Error(`${type} parse error`);
            }

            mesObj.data = fileData ? { fileData } : setData(file.file, mesObj.type);
            mesObjArr.messages.push(mesObj);
        }

        this.handler(mesObjArr);
    }
}
