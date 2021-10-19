export default class Messages {
    constructor(container) {
        this.container = container;
        this.refresh();
    }

    refresh() {
        this.messages = [...this.container.children];
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
}
