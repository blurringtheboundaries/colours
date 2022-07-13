const pug = require('pug');
const fs = require("fs-extra");
const sourceFolder = 'keyboard/src';
const buildFolder = 'keyboard/build';
const beautify = require('js-beautify').html;


// Quickly testing pug rendering...
let html = pug.render(fs.readFileSync(`${sourceFolder}/index.pug`, "utf-8"), {filename: `${sourceFolder}/index.pug`});
html = beautify(html);
fs.writeFileSync(`${buildFolder}/index.html`, html, "utf-8");
fs.copyFileSync(`${sourceFolder}/script.js`, `${buildFolder}/script.js`); 
fs.copyFileSync(`${sourceFolder}/style.css`, `${buildFolder}/style.css`);