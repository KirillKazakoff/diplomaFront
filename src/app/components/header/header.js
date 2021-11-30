import './header.css';
import Upload from '../../upload/upload';

export default class Header {
    constructor(uploadH, downloadOnFilterH, cancelFilterH) {
        this.isFilter = false;
        this.cancelFilterH = cancelFilterH;

        this.container = document.querySelector('.header');
        this.pinBtn = this.container.querySelector('.header-badge__pin');
        this.pinInput = this.container.querySelector('.input__file');

        this.search = this.container.querySelector('.header-badge__search');
        this.searchInput = this.container.querySelector('.input__search');
        this.upload = new Upload(uploadH, this.pinInput, null);
        this.downloadOnFilterH = downloadOnFilterH;

        this.search.addEventListener('click', (e) => this.onSearch(e));
        this.searchInput.addEventListener('input', (e) => this.onInput(e));
        this.pinBtn.addEventListener('click', (e) => this.upload.onClick(e));
    }

    onSearch(e) {
        this.isFilter = !this.isFilter;
        this.searchInput.classList.toggle('hidden');

        if (!this.isFilter) this.cancelFilterH();
    }

    onInput(e) {
        const { value } = this.searchInput;

        if (!value) {
            this.downloadOnFilterH('top', 'all');
            // this.cancelFilterH();
            return;
        }

        this.downloadOnFilterH('top', value);
    }
}
