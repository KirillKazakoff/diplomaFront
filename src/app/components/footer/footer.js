import './footer.css';
import { template, userTextT } from '../../logic/nodes.tmp';
import { setData } from '../../lib/utils';
import setLinksInText from './footerUtils/linkInText';

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
            const { value } = this.mesInput;

            const file = new File([value], 'userText.txt', {
                type: 'userText',
            });

            const mesObj = {
                node: template(userTextT, setLinksInText(value)),
                data: setData(file),
            };

            const mesArrObj = {
                messages: [mesObj],
                direction: 'toBottom',
            };

            this.handler(mesArrObj);
        }
    }
}
