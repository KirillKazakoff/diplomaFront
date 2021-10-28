export default class Display {
    constructor(container) {
        this.container = container;

        this.recordContainer = container.querySelector('.recorder-wrapper');

        this.recordBtn = this.container.querySelector('.footer-badge');

        this.cancelBtn = this.recordContainer.querySelector('.cancel-record');
        this.sendBtn = this.recordContainer.querySelector('.send-record');

        this.pluginDisplay = this.recordContainer.querySelector('.video-js');
        this.recIndicator = this.pluginDisplay.querySelector('.vjs-record-indicator');
        this.currentTime = this.recordContainer.querySelector('.vjs-current-time');
    }

    hideRecContainer() {
        this.showDisplay();
        this.recordContainer.classList.add('hidden');
    }

    showRecContainer() {
        this.recordContainer.classList.remove('hidden');

        if (!this.recIndicator) {
            this.pluginDisplay.classList.remove('vjs-controls-disabled');
            this.recIndicator = this.pluginDisplay.querySelector('.vjs-record-indicator');
        }
        this.showRecIndicator();
    }

    showRecIndicator() {
        this.recIndicator.classList.remove('vjs-hidden');
    }

    hideRecIndicator() {
        this.recIndicator.classList.add('vjs-hidden');
    }

    hideDisplay() {
        this.pluginDisplay.classList.add('hidden');
        this.currentTime.style.display = 'none';
        this.hideRecIndicator();
    }

    showDisplay() {
        this.pluginDisplay.classList.remove('hidden');
        this.currentTime.style.display = 'block';
    }
}
