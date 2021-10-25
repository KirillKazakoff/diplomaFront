// import videojs from 'video.js';
// import MyRecorder from '../myRecorder';

// export default class VideoRec {
//     constructor(container, uploadHandler) {
//         this.container = container;
//         this.initOptions();

//         this.player = videojs('myVideo', this.options);
//         this.recorder = new MyRecorder(this.player, container, uploadHandler);

//         const { recordBtn, cancelBtn, sendBtn } = this.recorder.display;



//         // this.timerPlayer = videojs('myVideoTimer', this.timerOptions);
//         // this.timerRecord = this.timerPlayer.record();

//         // this.startTimer = this.startTimer.bind(this);
//         // const { recordBtn, cancelBtn, sendBtn } = this.recorder.display;

//         // recordBtn.addEventListener('click', this.startTimer);
//         // cancelBtn.addEventListener('click', () => this.stopTimer());
//         // sendBtn.addEventListener('click', () => this.stopTimer());
//     }



//     // startTimer() {
//     //     this.recorder.display.recordBtn.removeEventListener('click', this.startTimer);
//     //     this.timerRecord.getDevice();

//     //     this.timerPlayer.on('deviceReady', () => this.timerRecord.start());
//     // }

//     // stopTimer() {
//     //     this.timerRecord.stop();
//     //     this.timerPlayer.reset();
//     //     this.timerPlayer.off();
//     //     this.recorder.display.recordBtn.addEventListener('click', this.startTimer);
//     // }

//     initOptions() {
//         this.options = {
//             autoSetup: false,
//             controls: false,
//             controlBar: {
//                 timeDivider: true,
//                 durationDisplay: true,
//                 fullscreenToggle: false,
//                 deviceButton: false,
//                 liveDisplay: false,
//                 seekToLive: false,
//                 volumePanel: false,
//             },
//             bigPlayButton: false,
//             loop: false,
//             fluid: true,
//             width: 10,
//             height: 10,
//             plugins: {
//                 // videojs-record plugin options
//                 record: {
//                     image: false,
//                     audio: true,
//                     video: true,
//                     maxLength: 120,
//                     // debug: true,
//                 },
//             },
//         };

//         this.timerOptions = { ...this.options };
//         this.timerOptions.controls = true;
//         // this.timerOptions.plugins.record.video = false;
//         // this.timerOptions.plugins.record.audio = false;
//     }
// }

import videojs from 'video.js';
import MyRecorder from '../myRecorder';

export default class VideoRec {
    constructor(container, handlers) {
        this.container = container;
        this.initOptions();

        this.player = videojs('video', this.options);

        this.recorder = new MyRecorder(this.player, container, handlers);
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
