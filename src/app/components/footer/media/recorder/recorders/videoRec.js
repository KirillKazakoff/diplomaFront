import videojs from 'video.js';
import MyRecorder from '../myRecorder';

export default class VideoRec {
    constructor(container, uploadHandler) {
        this.container = container;
        this.initOptions();

        this.player = videojs('myVideo', this.options);
        this.recorder = new MyRecorder(this.player, container, uploadHandler);

        // this.player.record().getDevice();
        // this.recBut = document.querySelector('.footer-badge__video-record');
        // this.recBut.addEventListener('click', () => this.test());
    }

    initOptions() {
        this.options = {
            controls: true,
            bigPlayButton: false,
            loop: false,
            fluid: false,
            width: 320,
            height: 240,
            plugins: {
                // videojs-record plugin options
                record: {
                    image: false,
                    audio: true,
                    video: true,
                    maxLength: 20,
                    displayMilliseconds: true,
                    debug: true,
                },
            },
        };
    }

    test() {
        this.videoHandler();
        this.player.record().start();
        // setTimeout(() => this.player.record().stop(), 1500);
    }
}
