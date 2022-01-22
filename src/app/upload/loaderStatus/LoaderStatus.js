import './loaderStatus.css';

class LoaderStatus {
    constructor() {
        this.loader = document.querySelector('.loader');
    }

    showLoader() {
        this.loader.classList.remove('hidden');
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }
}

const loaderStatus = new LoaderStatus();
export default loaderStatus;
