import { generatePixelToneMapping } from 'js/matrix';
import { draw, initDrawLoop } from 'js/draw';
import { generateTones } from 'js/tones';
import { initCanvas } from 'js/init';

require('sass/canvas');

// calculate the side length of the full matrix. We'll create a square from it.
const matrixSideLen = Math.floor(
  Math.min(document.body.scrollHeight, document.body.clientWidth) - 10 // bit of border
);

const numTonesPerSide  = 16;    // how many tones per side (square for total)
const drawInterval     = 1000;  // how often to draw

const tones            = generateTones(matrixSideLen, numTonesPerSide);
const pixelToneMapping = generatePixelToneMapping(tones);

// these are the functions that get fired when you interact with the canvas
const matrixListeners = {
  mousemove: (evt) => { console.log('mouse move', pixelToneMapping[evt.offsetX][evt.offsetY]); },
  mousedown: (evt) => { console.log('mouse down', pixelToneMapping[evt.offsetX][evt.offsetY]); }
};

const ctx              = initCanvas(matrixSideLen, matrixListeners);
const drawWithCtx      = draw.bind(null, ctx);

initDrawLoop(tones, drawWithCtx, drawInterval);
