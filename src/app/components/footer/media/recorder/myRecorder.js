import Display from './display';

export default class MyRecorder {
    constructor(player, container, handlers) {
        this.handlers = handlers;
        this.display = new Display(container);

        this.player = player;
        this.record = this.player.record();

        this.dataRec = null;

        this.player.on('finishRecord', () => this.onFinishRec());

        this.onRecord = this.onRecord.bind(this);
        this.display.recordBtn.addEventListener('click', this.onRecord);

        this.onCancel = this.onCancel.bind(this);
        this.onSend = this.onSend.bind(this);

        this.display.cancelBtn.addEventListener('click', this.onCancel);
        this.display.sendBtn.addEventListener('click', this.onSend);
    }

    async onRecord() {
        this.display.recordBtn.removeEventListener('click', this.onRecord);
        const promise = new Promise((resolve) => {
            this.player.on('deviceReady', () => resolve());
        });

        this.record.getDevice();
        await promise;

        this.display.showRecContainer();
        this.record.start();
    }

    onFinishRec() {
        this.dataRec = {
            target: {
                files: [this.player.recordedData],
            },
        };

        this.display.hideDisplay();
        this.record.stop();
        this.record.reset();
    }

    onForceFinishRec() {
        this.player.off();

        const finishRecHandler = (resolve) => {
            const handler = () => {
                this.onFinishRec();

                resolve();
            };

            return handler;
        };

        return new Promise((resolve) => {
            this.player.on('finishRecord', finishRecHandler(resolve));
        });
    }

    async stop() {
        this.record.stop();
        await this.onForceFinishRec();
    }

    async back() {
        if (this.record.isRecording()) {
            await this.stop();
        }
    }

    async onCancel() {
        console.log('cancel');

        this.display.cancelBtn.removeEventListener('click', this.onCancel);
        this.display.sendBtn.removeEventListener('click', this.onSend);
        await this.back();

        this.handlers.recreateRec(this.display.recordContainer, () => {
            this.player.reset();
            this.player.dispose();
            this.display.hideRecContainer();
        });
    }

    async onSend() {
        this.display.cancelBtn.removeEventListener('click', this.onCancel);
        this.display.sendBtn.removeEventListener('click', this.onSend);
        await this.back();

        await this.handlers.upload(this.dataRec);

        this.handlers.recreateRec(this.display.recordContainer, () => {
            this.player.reset();
            this.player.dispose();
            this.display.hideRecContainer();
        });
    }
}

// import Display from './display';

// export default class MyRecorder {
//     constructor(player, container, uploadHandler) {
//         this.uploadHandler = uploadHandler;
//         this.display = new Display(container);

//         this.player = player;
//         this.record = this.player.record();
//         this.dataRec = null;

//         this.player.on('finishRecord', () => this.onFinishRec());

//         this.onRecord = this.onRecord.bind(this);
//         this.display.recordBtn.addEventListener('click', this.onRecord);

//         this.display.cancelBtn.addEventListener('click', () => this.onCancel());
//         this.display.sendBtn.addEventListener('click', () => this.onSend());
//     }

//     async onRecord() {
//         this.display.recordBtn.removeEventListener('click', this.onRecord);
//         this.record.getDevice();

//         const promise = new Promise((resolve) => {
//             this.player.on('deviceReady', () => resolve());
//         });

//         await promise;
//         console.log('deviceReady');

//         this.display.showRecContainer();
//         this.record.start();
//     }

//     onFinishRec() {
//         this.dataRec = {
//             target: {
//                 files: [this.player.recordedData],
//             },
//         };

//         this.display.hideDisplay();
//         this.record.stop();

//         this.record.reset();
//     }

//     onForceFinishRec() {
//         this.player.off();

//         const finishRecHandler = (resolve) => {
//             const handler = () => {
//                 this.onFinishRec();

//                 resolve();
//                 this.player.off('finishRecord', handler);
//                 this.player.on('finishRecord', () => this.onFinishRec());
//             };

//             return handler;
//         };

//         return new Promise((resolve) => {
//             this.player.on('finishRecord', finishRecHandler(resolve));
//         });
//     }

//     async stop() {
//         this.record.stop();
//         await this.onForceFinishRec();
//     }

//     async back() {
//         if (this.record.isRecording()) {
//             await this.stop();
//         }
//         this.display.recordBtn.addEventListener('click', this.onRecord);
//     }

//     async onCancel() {
//         await this.back();

//         this.dataRec = null;
//         this.display.hideRecContainer();
//         this.player.dispose();
//     }

//     async onSend() {
//         await this.back();

//         this.uploadHandler(this.dataRec);
//         this.display.hideRecContainer();
//         this.player.dispose();
//     }
// }
