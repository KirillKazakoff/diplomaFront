/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
// import { PreventScrolling, ReEnableScrolling } from 'prevent-scrolling';

// export default class Scroll {
//     constructor(container, loadHandler) {
//         this.loadHandler = loadHandler;
//         this.container = container;

//         this.setScrollOnPromise();
//         this.scrolling = false;
//     }

//     async setScrollOnPromise() {
//         await this.initLoad();

//         this.onScroll = this.onScroll.bind(this);
//         this.container.addEventListener('scroll', this.onScroll);

//         const intervalCallback = async () => {
//             if (this.scrollTop < this.scrollLength / 2) {
//                 clearInterval(interval);
//                 await this.loadHandler('toTop');
//                 setTimeout(() => {
//                     interval = setInterval(intervalCallback, 100);
//                 }, 800);
//             }

//             if (this.scrollTop < 200) {
//                 this.container.scroll({
//                     top: 500,
//                     left: 0,
//                     behavior: 'smooth',
//                 });
//             }
//         };

//         let interval = setInterval(intervalCallback, 100);
//     }

//     async onScroll() {
//         const { clientHeight, scrollHeight } = this.container;
//         const scrollLength = scrollHeight - clientHeight - 300;

//         this.scrollLength = scrollLength;
//         this.scrollTop = this.container.scrollTop;
//     }

//     async initLoad() {
//         await this.loadHandler('toBottom');

//         const { clientHeight, scrollHeight } = this.container;
//         this.clientHeight = clientHeight;
//         this.scrollHeight = scrollHeight;

//         const scrollLength = scrollHeight - clientHeight - 300;
//         this.scrollLength = scrollLength;

//         this.container.scroll(0, scrollLength);
//     }
// }



export default class Scroll {
    constructor(container, loadHandler) {
        this.loadHandler = loadHandler;
        this.container = container;

        this.setScrollOnPromise();

        this.totalElemsScrollHeight = 0;
        this.totalScrollHeight = 0;
    }

    async setScrollOnPromise() {
        await this.initLoad();
        this.container.addEventListener('scroll', (e) => this.onScroll(e));
    }

    async onScroll(e) {
        const { scrollTop, scrollHeight, clientHeight } = this.container;

        console.log(scrollTop);
        if (scrollTop === 0) {
            await this.loadHandler('toTop');
        }
    }

    async initLoad() {
        await this.loadHandler('toBottom');

        const { clientHeight, scrollHeight } = this.container;
        const scrollLength = scrollHeight - clientHeight;

        this.container.scroll(0, scrollLength);
    }

    changeScroll(insertNode) {
        // const curScrollPos = this.messages.scrollTop;
        // const oldScroll = this.messages.scrollHeight - this.messages.clientHeight;
        // const newScroll = this.messages.scrollHeight - this.messages.clientHeight;
        // this.messages.scrollTop = curScrollPos + (newScroll - oldScroll);
    }
}
