import './link.css';
import linkT from './link.tmp';
import engine from '../../../lib/engine/engine';

function setLinksInText(txt) {
    let text = txt;
    const regExp = /https:\/\/\w*|http:\/\/\w*/g;
    const linkMatches = txt.match(regExp);

    if (linkMatches) {
        linkMatches.forEach((link) => {
            const linkHtml = engine(linkT(link));
            text = text.replace(link, linkHtml);
        });
    }

    return text;
}

export default setLinksInText;
