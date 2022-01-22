export default class Messages {
    constructor(container) {
        this.isHidden = false;
        this.container = container;
        this.msgContainer = container.querySelector('.messages');
        this.messages = [];
        this.refresh();
    }

    refresh() {
        this.messages = [...this.msgContainer.children];
    }

    initLinks(messagesData) {
        messagesData.forEach((mes) => {
            const nodeMes = this.getMessage(mes.data.fileData.id);
            const loadLink = nodeMes.querySelector('.fileload-img-link');

            loadLink.download = mes.data.fileData.name;
            loadLink.href = mes.url;
            loadLink.rel = 'noopener';
        });
    }

    getMessage(id) {
        return this.messages.find((msg) => msg.id === id);
    }

    hideMessages() {
        if (!this.isHidden) {
            this.messages.forEach((msg) => {
                msg.classList.add('hidden');
            });
        }
        this.hiddenMessages = [...this.messages];
        this.isHidden = true;
    }
}
