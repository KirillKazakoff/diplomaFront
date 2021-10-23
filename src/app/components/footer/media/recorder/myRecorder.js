export default class MyRecorder {
    constructor(player, container, uploadHandler) {
        // this.cancelHandler = cancelHandler;
        this.uploadHandler = uploadHandler;

        this.container = container;
        this.recordBtn = this.container.querySelector('.footer-badge');
        this.cancelBtn = this.container.querySelector('.cancel-record');
        this.sendBtn = this.container.querySelector('.send-record');

        this.player = player;
        this.record = this.player.record();
        this.dataRec = null;

        this.cancelBtn.addEventListener('click', () => this.onCancel());
        this.recordBtn.addEventListener('click', () => this.onRecord());
        this.sendBtn.addEventListener('click', () => this.onSend());

        player.on('finishRecord', () => this.onFinishRec());
    }

    onRecord() {
        this.container.classList.remove('hidden');
        this.record.getDevice();
        this.record.start();
    }

    onFinishRec() {
        console.log('hello');
        this.dataRec = {
            target: {
                files: [this.player.recordedData],
            },
        };
    }

    back() {
        this.container.classList.add('hidden');
    }

    onCancel() {
        this.record.stop();
        this.back();
        this.dataRec = null;
    }

    onSend() {
        this.record.stop();
        this.back();
        this.uploadHandler(this.dataRec);
    }
}
