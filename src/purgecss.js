// import { PurgeCSS } from 'purgecss';
const PurgeCSS = require('purgecss');

const purgecss = new PurgeCSS({
    content: ['**/*.html'],
    css: ['**/*.css'],
});

const purgecssResult = purgecss.purge();
