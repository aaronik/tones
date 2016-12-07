import { generatePixelToneMapping, draw } from 'js/matrix';
import { generateTones } from 'js/tones';
import { initHtmlCtx } from 'js/init';

require('sass/canvas');

// calculate the side length of the full matrix. We'll create a square from it.
const matrixSideLen = Math.floor(
  Math.min(document.body.scrollHeight, document.body.clientWidth) - 10 // bit of border
);

// how many tones are there per side? (square that num for total num tones)
const numTones = 16;

const tones = generateTones(matrixSideLen, numTones);
const pixelToneMapping = generatePixelToneMapping(tones);

const ctx = initHtmlCtx(pixelToneMapping, matrixSideLen);
tones.forEach(draw.bind(null, ctx));
