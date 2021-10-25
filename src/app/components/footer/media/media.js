/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import './styles';
import AudioRec from './recorder/recorders/audioRec';
import VideoRec from './recorder/recorders/videoRec';

import MultipleUpload from '../../../upload/multipleUpload';

import engine from '../../../lib/engine/engine';
import recT from './recorder/recorder.tmp';

export default class Media {
    constructor(footer, loadHandler) {
        this.upload = new MultipleUpload(loadHandler);
        this.handlers = {
            upload: this.uploadData(),
            recreateRec: this.recreateRec(),
        };

        this.container = footer.querySelector('.media');
        this.audioContainer = footer.querySelector('.recorder__audio');
        this.videoContainer = footer.querySelector('.recorder__video');


        this.audioRec = this.initAudio();
        this.videoRec = this.initVideo();
    }

    initAudio() {
        this.audioRec = new AudioRec(this.audioContainer, this.handlers);
    }

    initVideo() {
        this.videoRec = new VideoRec(this.videoContainer, this.handlers);
    }

    uploadData() {
        return (data) => {
            this.upload.onUpload(data);
        };
    }

    recreateRec() {
        return (container, deleteHandler) => {
            const rec = container.querySelector('.video-js');
            const html = engine(recT(rec.id));

            deleteHandler();

            container.insertAdjacentHTML('afterbegin', html);
            rec.id === 'audio' ? this.initAudio() : this.initVideo();
        };
    }
}

// import './styles';
// import AudioRec from './recorder/recorders/audioRec';
// import VideoRec from './recorder/recorders/videoRec';

// import MultipleUpload from '../../../upload/multipleUpload';

// export default class Media {
//     constructor(footer, loadHandler) {
//         this.upload = new MultipleUpload(loadHandler);
//         const uploadHandler = this.uploadData();

//         this.container = footer.querySelector('.media');
//         const audioContainer = footer.querySelector('.recorder__audio');
//         const videoContainer = footer.querySelector('.recorder__video');

//         this.audioRec = new AudioRec(audioContainer, uploadHandler);
//         this.videoRec = new VideoRec(videoContainer, uploadHandler);

//         this.container.addEventListener('click', (e) => this.onClick(e));
//     }

//     uploadData() {
//         return (data) => {
//             this.upload.onUpload(data);
//         };
//     }

//     onClick(e) {
//         const { className } = e.target;
//         if (!className.includes('badge')) return false;

//         // if (className.includes('audio')) {
//         //     this.audio.player.
//         // }
//     }
// }

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
