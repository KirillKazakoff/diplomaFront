const types = {
    doc: ['json', 'text', 'txt', 'java', 'md', 'text/javascript', 'js', 'application/zip', 'zip'],
    pic: ['png', 'jpeg', 'img', 'image', 'image/png'],
    video: ['video', 'mp4', 'mkv', 'video/x-matroska;codecs=avc1,opus'],
    audio: ['audio', 'mp3', 'audio/mpeg'],
};

export default function checkType(checkable, param) {
    const typesArr = types[param];
    if (!typesArr) return false;

    return typesArr.some((type) => type === checkable);
}
