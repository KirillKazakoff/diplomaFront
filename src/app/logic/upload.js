/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { imgUpload, txtUpload, videoUpload, audioUpload } from './handlers';
import { setData } from '../lib/utils';

export default class Upload {
    constructor(handler, input, container) {
        this.handler = handler;
        this.reader = new FileReader();

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
        let file = null;

        if (!target) {
            file = input.file;
        } else {
            file = target.files ? target.files[0] : null;
        }

        if (!file) return;
        const { type } = file;

        const url = URL.createObjectURL(file);

        let node = null;

        if (type.includes('image')) {
            node = await imgUpload(url);
        }

        if (type.includes('json') || type.includes('text')) {
            node = await this.readTxt(file);
        }

        if (type.includes('video')) {
            node = await videoUpload(url);
        }

        if (type.includes('audio')) {
            node = await audioUpload(url);
        }

        const mesObj = { node };
        mesObj.data = input.data ? input.data : setData(file);

        this.handler(mesObj);
    }

    async readTxt(file) {
        return new Promise((resolve) => {
            const listenerHandler = async (e) => {
                this.reader.removeEventListener('load', listenerHandler);
                const node = await txtUpload(e.target.result);

                resolve(node);
            };

            this.reader.addEventListener('load', listenerHandler);

            this.reader.readAsBinaryString(file);
        });
    }
}

































/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
// import { imgUpload, txtUpload, videoUpload, audioUpload } from './handlers';

// export default class Upload {
//     constructor(handler, input, container) {
//         this.handler = handler;
//         this.reader = new FileReader();

//         if (container) {
//             this.container = container;
//             this.container.addEventListener('dragover', (e) => this.onDragOver(e));
//             this.container.addEventListener('drop', (e) => this.onDragDrop(e));
//         }

//         if (input) {
//             this.input = input;
//             this.input.addEventListener('input', (e) => this.onUpload(e));
//         }
//     }

//     onClick(e) {
//         e.preventDefault();
//         this.input.dispatchEvent(new MouseEvent('click'));
//     }

//     onDragOver(e) {
//         e.preventDefault();
//     }

//     onDragDrop(e) {
//         e.preventDefault();
//         this.onUpload({ target: e.dataTransfer });
//     }

//     async onUpload(e) {
//         const { target } = e;
//         let file = null;

//         if (!target) {
//             file = e.file;
//         } else {
//             file = target.files ? target.files[0] : null;
//         }

//         if (!file) return;
//         const { type } = file;

//         const url = URL.createObjectURL(file);
//         let node = null;

//         if (type.includes('image')) {
//             node = await imgUpload(url);
//         }

//         if (type.includes('json') || type.includes('text')) {
//             node = await this.readTxt(file);
//         }

//         if (type.includes('video')) {
//             node = await videoUpload(url);
//         }

//         if (type.includes('audio')) {
//             node = await audioUpload(url);
//         }

//         node.title = file.name;
//         this.handler(node.outerHTML);
//     }

//     async readTxt(file) {
//         return new Promise((resolve) => {
//             const listenerHandler = async (e) => {
//                 this.reader.removeEventListener('load', listenerHandler);
//                 const node = await txtUpload(e.target.result);

//                 resolve(node);
//             };

//             this.reader.addEventListener('load', listenerHandler);

//             this.reader.readAsBinaryString(file);
//         });
//     }
// }
