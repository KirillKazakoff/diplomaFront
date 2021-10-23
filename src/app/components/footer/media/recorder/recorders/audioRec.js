/* eslint-disable import/no-extraneous-dependencies */
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone';

import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
import videojs from 'video.js';
import Record from 'videojs-record/dist/videojs.record.js';
import VmsgEngine from 'videojs-record/dist/plugins/videojs.record.vmsg';

import MyRecorder from '../myRecorder';

WaveSurfer.microphone = MicrophonePlugin;

export default class AudioRec {
    constructor(container, uploadHandler) {
        this.container = container;
        this.initOptions();

        this.player = videojs('myAudio', this.options);
        this.recorder = new MyRecorder(this.player, container, uploadHandler);
    }

    initOptions() {
        this.options = {
            controls: true,
            bigPlayButton: false,
            controlBar: {
                fullscreenToggle: false,
                volumePanel: false,
                deviceButton: false,
                timeDivider: false,
                durationDisplay: false,
                currentTimeDisplay: false,
            },
            width: 0,
            height: 0,
            plugins: {
                wavesurfer: {
                    debug: true,
                    backend: 'WebAudio',
                    waveColor: 'black',
                    cursorWidth: 0,
                    interact: false,
                    hideScrollbar: true,
                    plugins: [
                        WaveSurfer.microphone.create({
                            bufferSize: 4096,
                            numberOfInputChannels: 1,
                            numberOfOutputChannels: 1,
                        }),
                    ],
                },
                record: {
                    audio: true,
                    video: false,
                    maxLength: 20,
                    debug: true,
                    audioEngine: 'vmsg',
                    audioWebAssemblyURL: '../../../../../node_modules/vmsg/vmsg.wasm',
                },
            },
        };
    }
}
