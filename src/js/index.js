import { generatePixelToneMapping } from 'js/matrix';
import { draw, initDrawLoop } from 'js/draw';
import { generateTones } from 'js/tones';
import { initHtmlCtx } from 'js/init';

require('sass/canvas');

// calculate the side length of the full matrix. We'll create a square from it.
const matrixSideLen = Math.floor(
  Math.min(document.body.scrollHeight, document.body.clientWidth) - 10 // bit of border
);

const numTonesPerSide  = 16;    // how many tones per side (square for total)
const drawInterval     = 1000;  // how often to draw

const tones            = generateTones(matrixSideLen, numTonesPerSide);
const pixelToneMapping = generatePixelToneMapping(tones);

const ctx              = initHtmlCtx(pixelToneMapping, matrixSideLen);
const drawWithCtx      = draw.bind(null, ctx);

initDrawLoop(tones, drawWithCtx, drawInterval);
