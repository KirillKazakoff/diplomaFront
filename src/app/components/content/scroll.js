/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */

export default class Scroll {
    constructor(container, downloadOnScrollH) {
        this.downloadOnScrollH = downloadOnScrollH;
        this.container = container;

        this.setScrollOnPromise();

        this.emptyScroll = this.container.querySelector('.empty-scroll');
        this.curScrollPos = 0;
        this.oldScroll = 0;
    }

    async setScrollOnPromise() {
        await this.initLoad();
        this.container.addEventListener('scroll', () => this.onScroll());
    }

    async onScroll() {
        const { scrollTop } = this.container;

        if (scrollTop === 0) {
            await this.downloadOnScrollH('toTop');
        }
    }

    async initLoad() {
        await this.downloadOnScrollH('toBottom');

        this.toEnd();
    }

    toEnd() {
        this.container.scrollTop = this.container.scrollHeight;
    }

    getOldScroll() {
        const { scrollHeight, scrollTop, clientHeight } = this.container;

        this.curScrollPos = scrollTop;
        this.oldScroll = scrollHeight - clientHeight;
    }

    changeScroll() {
        const { scrollHeight, clientHeight } = this.container;

        const newScroll = scrollHeight - clientHeight;
        this.container.scrollTop = this.curScrollPos + (newScroll - this.oldScroll);
    }
}
