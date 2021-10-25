// export const videoRecT = {
//     block: 'video',
//     cls: 'video-js vjs-default-skin',
//     id: 'myVideo',
// };

// export const audioRecT = {
//     block: 'audio',
//     cls: 'video-js vjs-default-skin',
//     id: 'myAudio',
// };

const recT = (rec) => ({
    block: `${rec}`,
    cls: 'video-js vjs-default-skin',
    attrs: {
        id: `${rec}`,
    },
});

export default recT;
