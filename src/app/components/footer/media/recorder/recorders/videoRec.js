import videojs from 'video.js';
import MyRecorder from '../myRecorder';

export default class VideoRec {
    constructor(container, handler) {
        this.container = container;
        this.initOptions();

        this.player = videojs('video', this.options);

        this.recorder = new MyRecorder(this.player, container, handler);
    }

    initOptions() {
        this.options = {
            autoSetup: false,
            controls: true,
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                fullscreenToggle: false,
                deviceButton: false,
                liveDisplay: false,
                seekToLive: false,
                volumePanel: false,
            },
            bigPlayButton: false,
            loop: false,
            fluid: true,
            width: 10,
            height: 10,
            plugins: {
                record: {
                    image: false,
                    audio: true,
                    video: true,
                    maxLength: 120,
                },
            },
        };
    }
}
