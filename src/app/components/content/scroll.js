export default class Scroll {
    constructor(container, loadHandler) {
        this.loadHandler = loadHandler;
        this.container = container;
        this.container.addEventListener('scroll', (e) => this.onScroll(e));
    }

    onScroll(e) {
        this.loadHandler();
        // console.log(this.messages.scrollTop);

        const { clientHeight, scrollHeight } = this.container;
        const scrollLength = scrollHeight - clientHeight;
    }
}
