import engine from './engine';

const template = (tmp, param) => {
    let prm = param;
    if (!param) prm = null;

    const node = document.createElement('div');

    node.innerHTML = engine(tmp(prm));
    return node.firstChild;
};

export default template;
