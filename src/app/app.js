import '../css/defaultStyle.css';
import '../css/fonts.css';
import Controller from './controller/controller';

window.onload = () => {
    const controller = new Controller();

    const audio = document.createElement('audio');
    controller.content.messages.append(audio);
};
