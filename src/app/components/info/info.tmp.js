const infoHeaderT = (icon) => ({
    block: 'header',
    cls: 'info-header',
    content: {
        block: 'img',
        cls: 'info-svg',
        content: '',
        attrs: {
            src: icon,
        },
    },
});

const infoContentT = (title, desc) => ({
    block: 'div',
    cls: 'info-content',
    content: [
        {
            block: 'span',
            cls: 'info-content-title',
            content: title,
        },
        {
            block: 'span',
            cls: 'info-content-desc',
            content: desc,
        },
    ],
});

const infoFooter = {
    block: 'footer',
    cls: 'info-footer',
    content: {
        block: 'button',
        cls: 'btn info-btn',
        attrs: {
            type: 'button',
        },
        content: 'Понятно',
    },
};

const infoT = (icon, title, desc) => ({
    block: 'div',
    cls: 'info',
    content: [infoHeaderT(icon), infoContentT(title, desc), infoFooter],
});

export default infoT;
