import util       from 'js/util';
import matrixUtil from 'js/matrix';
import drawUtil   from 'js/draw';
import tonesUtil  from 'js/tones';
import canvasUtil from 'js/canvas';

require('sass/main');

// calculate the side length of the full matrix. We'll create a square from it.
const canvasDim = Math.floor(
  Math.min(document.body.scrollHeight, document.body.clientWidth) - 10 // bit of border
);

const numTonesPerSide = 16;    // how many tones per side (square for total)
const drawInterval    = 100;  // how often to draw

const tones           = tonesUtil.generateTones(canvasDim, numTonesPerSide);
const pixelToTone     = matrixUtil.createPixelToneTranslator(tones);

// instantialize the HTML canvas element, grab the context
const canvas          = canvasUtil.initCanvas(canvasDim);
const ctx             = canvas.getContext('2d');

// these are the functions that get fired when you interact with the canvas
const canvasListeners = {
  mousemove: (evt) => {
    const tid = canvasUtil.canvasEvtToToneId(evt, pixelToTone);
    util.log('mouse move', tid);
  },

  mousedown: (evt) => {
    const tid = canvasUtil.canvasEvtToToneId(evt, pixelToTone);
    tonesUtil.toggleToneActivation(tones, tid);
  }
};

canvasUtil.attachListeners(canvas, canvasListeners);

// generate an arity 0 function that draws to the canvas.
const pureDraw = () => {
  tones.forEach(tone => { drawUtil.drawDrawable(ctx, tone) });
};

// fire up the draw loop.
drawUtil.initDrawLoop(pureDraw, drawInterval);

