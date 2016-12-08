import matrixUtil from 'js/matrix';
import drawUtil from 'js/draw';
import tonesUtil from 'js/tones';
import canvasUtil from 'js/canvas';

require('sass/main');

// calculate the side length of the full matrix. We'll create a square from it.
const canvasDim = Math.floor(
  Math.min(document.body.scrollHeight, document.body.clientWidth) - 10 // bit of border
);

const numTonesPerSide  = 16;    // how many tones per side (square for total)
const drawInterval     = 1000;  // how often to draw

const tones            = tonesUtil.generateTones(canvasDim, numTonesPerSide);
const pixelToneMapping = matrixUtil.generatePixelToneMapping(tones);

// these are the functions that get fired when you interact with the canvas
const matrixListeners = {
  mousemove: (evt) => { console.log('mouse move', pixelToneMapping[evt.offsetX][evt.offsetY]); },
  mousedown: (evt) => { console.log('mouse down', pixelToneMapping[evt.offsetX][evt.offsetY]); }
};

// instantialize the HTML canvas element, grab the context
const canvas    = initCanvas(canvasDim, matrixListeners);
const ctx       = canvas.getContext('2d');

// generate an arity 0 function that draws to the canvas.
const pureDraw = () => {
  tones.forEach(tone => { drawUtil.drawDrawable(ctx, tone) });
};

// fire up the draw loop.
initDrawLoop(pureDraw, drawInterval);

