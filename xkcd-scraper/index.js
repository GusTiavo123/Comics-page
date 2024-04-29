import fs from 'fs-extra';
import axios from 'axios';
import { getImageSize } from './getImageSize.js';

const log = (...args) => console.log('[🌀 xkcd-comics ] ',...args);

const {writeJSON} = fs;

const comicStoreArray = [];

const INITIAL_ID_XKCD_COMICS = 2500;
const MAX_ID_XKCD_COMICS = 2588;

for (let i = INITIAL_ID_XKCD_COMICS; i < MAX_ID_XKCD_COMICS; i++){
    const url = `https://xkcd.com/${i}/info.0.json`;
    log('Fetching', url);
    const {data} = await axios.get(url);
    const {num , news, transcript, img,...restOfComic} = data;
    log('Storing', `./comics/${i}.json`);
    const {height, width} = await getImageSize({url: img});
    log('Image size', height, width);
    const comicStore = {
        id: i,
        img,
        height,
        width,
        ...restOfComic
    }
    comicStoreArray.push(comicStore);
}

await writeJSON(`index.json`, comicStoreArray);
log('Done');
