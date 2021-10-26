import './header.css';
import Upload from '../../upload/upload';

export default class Header {
    constructor(handler) {
        this.container = document.querySelector('.header');
        this.pinBtn = this.container.querySelector('.header-badge__pin');
        this.pinInput = this.container.querySelector('.input__file');

        this.upload = new Upload(handler, this.pinInput, null);

        this.pinBtn.addEventListener('click', (e) => this.upload.onClick(e));
    }
}
