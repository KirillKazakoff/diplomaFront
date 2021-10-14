import '../css/defaultStyle.css';
import '../css/fonts.css';
import Controller from './controller/controller';
// import api from './request/api';

window.onload = async () => {
    const controller = new Controller();
    // const blob = await api.message.getImg();

    // const video = document.createElement('video');
    // video.controls = true;
    // const url = URL.createObjectURL(blob);
    // const form = document.querySelector('.chat');

    // video.addEventListener('canplay', () => {
    //     form.append(video);
    // });
    // video.src = url;
};
