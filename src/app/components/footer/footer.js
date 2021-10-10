import './footer.css';

export default class Footer {
    constructor(formHandler) {
        this.handler = formHandler;

        this.container = document.querySelector('.chat-footer');
        this.button = this.container.querySelector('.footer-badge__record');
        this.input = this.container.querySelector('.record-input');

        this.mesInput = this.container.querySelector('.input__message');
        document.addEventListener('keydown', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        if (e.key === 'Enter') {
            this.handler(this.mesInput.value);
        }
    }
}
