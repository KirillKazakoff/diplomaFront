/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { imgUpload, txtUpload, videoUpload, audioUpload } from './handlers';

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

    async onUpload(e) {
        const { target } = e;
        const file = target.files ? target.files[0] : null;

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

        node.title = file.name;
        this.handler(node.outerHTML);
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























// /* eslint-disable no-param-reassign */
// /* eslint-disable class-methods-use-this */
// import { imgUpload, txtUpload, videoUpload } from './handlers';

// export default class Upload {
//     constructor(handler, input, container) {
//         this.handler = handler;

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
//         const file = target.files ? target.files[0] : null;
//         const reader = new FileReader();

//         if (!file) return;
//         const { type } = file;

//         if (type !== 'file') {
//             reader.addEventListener('load', async (eReader) => {
//                 const data = {
//                     result: eReader.target.result,
//                     type,
//                 };

//                 const node = await this.readTxtImg(data);

//                 node.title = file.name;
//                 this.handler(node.outerHTML);
//             });

//             if (type.includes('json') || type.includes('text')) reader.readAsText(file);
//             if (type.includes('image')) reader.readAsDataURL(file);
//         } else {
//             const url = URL.createObjectURL(file);
//             const node = await videoUpload(url);

//             this.handler(node.outerHTML);
//         }
//     }

//     async readTxtImg(data) {
//         let node = null;

//         if (data.type.includes('image')) {
//             node = await imgUpload(data);
//         } else {
//             node = await txtUpload(data);
//         }
//         return node;
//     }
// }
