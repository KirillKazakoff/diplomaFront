const types = {
    doc: [
        'json',
        'text/plain',
        'txt',
        'java',
        'md',
        'text/javascript',
        'js',
        'application/zip',
        'zip',
        'application/json',
    ],
    pic: ['png', 'jpeg', 'img', 'image', 'image/png', 'image/jpeg'],
    video: [
        'video',
        'mp4',
        'mkv',
        'video/x-matroska;codecs=avc1,opus',
        'video/mp4',
        'video/webm',
        'video/webm;codecs=vp8,opus',
    ],
    audio: [
        'audio',
        'mp3',
        'audio/mpeg',
        'audio/ogg',
        'oga',
        'audio/wav',
        'wav',
        'audio/webm;codecs=opus',
        'webm',
    ],
};

export default function transformType(type) {
    return Object.keys(types).find((key) => {
        const subtypes = types[key];
        const match = subtypes.find((subtype) => subtype === type);
        if (match) return key;
        return false;
    });
}
