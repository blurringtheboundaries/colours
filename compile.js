import pug from 'pug';
import fs from 'fs-extra';
import beautify from 'js-beautify';

// const sourceFolder = 'keyboard/src';
// const buildFolder = 'keyboard/build';

const sourceFolder = 'test_src/pug';
const buildFolder = 'test';

// Quickly testing pug rendering...
let html = pug.render(fs.readFileSync(`${sourceFolder}/index.pug`, "utf-8"), {filename: `${sourceFolder}/index.pug`});
html = beautify(html);
fs.writeFileSync(`${buildFolder}/index.html`, html, "utf-8");
// fs.copyFileSync(`${sourceFolder}/script.js`, `${buildFolder}/script.js`); 
fs.copyFileSync(`${sourceFolder}/style.css`, `${buildFolder}/style.css`);
console.log('\u001b[' + 41 + 'm' + 'done' + '\u001b[0m')

// console.log( "\u001b[1;31m Red message" );
// console.log( "\u001b[1;32m Green message" );
// console.log( "\u001b[1;33m Yellow message" );
// console.log( "\u001b[1;34m Blue message" );
// console.log( "\u001b[1;35m Purple message" );
// console.log( "\u001b[1;36m Cyan message" );

// console.log( "\u001b[1;41m Red background" );
// console.log( "\u001b[1;42m Green background" );
// console.log( "\u001b[1;43m Yellow background" );
// console.log( "\u001b[1;44m Blue background" );
// console.log( "\u001b[1;45m Purple background" );
// console.log( "\u001b[1;46m Cyan background" );