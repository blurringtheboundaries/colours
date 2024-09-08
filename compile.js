import pug from 'pug';
import fs from 'fs-extra';
import beautify from 'js-beautify';

// const sourceFolder = 'keyboard/src';
// const buildFolder = 'keyboard/build';

const sourceFolder = 'test_src/pug';
const buildFolder = 'test';

const files = ['input','midi','qr', 'keyboard', 'keyboard2'];

files.forEach(x=>{
    let html = pug.render(fs.readFileSync(`${sourceFolder}/${x}.pug`, "utf-8"), {
        filename: `${sourceFolder}/${x}.pug`,
        pretty: true
    });
    // html = beautify(html);
    fs.writeFileSync(`${buildFolder}/${x}.html`, html, "utf-8");
    // fs.copyFileSync(`${sourceFolder}/script.js`, `${buildFolder}/script.js`); 
   
})

fs.copyFileSync(`${sourceFolder}/style.css`, `${buildFolder}/style.css`);

console.log('\u001b[' + 41 + 'm' + 'done' + '\u001b[0m')