import path from 'path';
import { readFile, writeFile, copyFile } from 'fs/promises';
import { ensureDir } from 'fs-extra';
import pug from 'pug';
import beautify from 'js-beautify';

// const sourceFolder = 'keyboard/src';
// const buildFolder = 'keyboard/build';

const sourceFolder = 'test_src/pug';
const buildFolder = 'test';
const files = ['input','midi','qr', 'keyboard', 'keyboard2'];
const USE_BEAUTIFY = false;

await ensureDir(buildFolder);

for (const x of files) {
    const srcPath = path.join(sourceFolder, `${x}.pug`);
    const destPath = path.join(buildFolder, `${x}.html`);
    try {
        const pugSource = await readFile(srcPath, 'utf-8');
        const html = pug.render(pugSource, { filename: srcPath, pretty: true });
        const finalHtml = USE_BEAUTIFY ? beautify.html(html) : html;
        await writeFile(destPath, finalHtml, 'utf-8');
    } catch (err) {
        console.error(`Failed to process ${x}.pug`, err);
    }
}

await copyFile(path.join(sourceFolder, 'style.css'), path.join(buildFolder, 'style.css'));
console.log('\x1b[41m%s\x1b[0m', 'done');