/* eslint-disable no-use-before-define */
import '../css/defaultStyle.css';
import '../css/fonts.css';

import Controller from './controller/controller';
import registrateSW from './service-worker/registrateSW';

window.onload = async () => {
    registrateSW();
    const controller = new Controller();
};

// const worker = new Worker('first-worker.js');
