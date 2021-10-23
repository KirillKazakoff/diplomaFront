/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */

import './styles';
import AudioRec from './recorder/recorders/audioRec';
import VideoRec from './recorder/recorders/videoRec';

import MultipleUpload from '../../../upload/multipleUpload';

export default class Media {
    constructor(footer, loadHandler) {
        this.upload = new MultipleUpload(loadHandler);
        const uploadHandler = this.uploadData();

        this.container = footer.querySelector('.media');
        const audioContainer = footer.querySelector('.recorder__audio');
        const videoContainer = footer.querySelector('.recorder__video');

        this.audioRec = new AudioRec(audioContainer, uploadHandler);
        this.videoRec = new VideoRec(videoContainer, uploadHandler);

        this.container.addEventListener('click', (e) => this.onClick(e));
    }

    uploadData() {
        return (data) => {
            this.upload.onUpload(data);
        };
    }

    onClick(e) {
        const { className } = e.target;
        if (!className.includes('badge')) return false;

        // if (className.includes('audio')) {
        //     this.audio.player.
        // }
    }
}

// this.audioHandlerObj = {
//     back: () => {
//         audioContainer.classList.add('hidden');
//     },
//     cancel: () => {
//         this.audioHandlerObj.back();
//         this.audioRec.recorder.dataRec = null;
//     },
//     success: () => {
//         this.audioHandlerObj.back();
//         this.uploadData(this.audioRec.recorder.dataRec);
//     },
// }
