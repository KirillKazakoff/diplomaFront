import './info.css';
import engine from '../../lib/engine/engine';
import infoT from './info.tmp';

class Info {
    constructor() {
        this.messages = {
            typeLoadError: {
                title: 'Тип выбранного вами документа не поддерживается',
                desc: 'Пожалуйста, выберите что-нибудь другое...',
            },
        };

        this.icon = './svg/exclamation.svg';
        this.container = document.querySelector('.info-wrapper');
        this.hide = this.hide.bind(this);
    }

    renderInfo(title, desc) {
        this.show();
        if (this.hideBtn) {
            this.hideBtn.removeEventListener('onClick', this.hide);
        }

        const html = engine(infoT(this.icon, title, desc));
        this.container.insertAdjacentHTML('afterbegin', html);
        this.hideBtn = document.querySelector('.info-btn');
        this.hideBtn.addEventListener('click', this.hide);
    }

    hide() {
        this.container.classList.add('info-hidden');
    }

    show() {
        this.container.classList.remove('info-hidden');
    }
}

const info = new Info();
export default info;
