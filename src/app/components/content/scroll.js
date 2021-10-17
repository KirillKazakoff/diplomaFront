export default class Scroll {
    constructor(container, loadHandler) {
        this.loadHandler = loadHandler;
        this.container = container;

        // this.setScrollOnPromise();
    }

    async setScrollOnPromise() {
        await this.loadAndScroll();
        this.container.addEventListener('scroll', (e) => this.onScroll(e));
    }

    async onScroll() {
        const { scrollTop } = this.container;

        if (scrollTop === 0) {
            this.loadHandler();
        }
    }

    async loadAndScroll() {
        await this.loadHandler();

        const { clientHeight, scrollHeight } = this.container;

        const scrollLength = scrollHeight - clientHeight - 300;

        this.container.scroll(0, scrollLength);
    }
}
