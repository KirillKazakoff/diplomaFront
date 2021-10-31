import api from '../../request/api';

export default class Fallback {
    constructor() {
        this.container = document.body.querySelector('.fallback');

        this.pollServer();
        this.wasConnection = true;
    }

    pollServer() {
        setInterval(async () => this.checkConnection(), 3000);
    }

    async checkConnection() {
        try {
            await api.utils.checkConnection();
            this.hide();
        } catch (e) {
            if (this.wasConnection) {
                this.show();
            }
        }
    }

    hide() {
        this.container.classList.add('hidden');
    }

    show() {
        this.container.classList.remove('hidden');
    }
}
