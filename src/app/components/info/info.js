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
            search: {
                title: 'Возможные типы фильтров',
                desc: 'Для поиска доступны следующие фильтры: \n\n pic \n video \n audio \n doc (для текста и документов)',
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
        this.container.innerHTML = html;
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
