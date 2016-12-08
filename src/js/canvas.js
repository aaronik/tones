//
// helper for init related code
//

import util from 'js/util';

let canvasUtil = {};
export default canvasUtil;

// initialize canvas. Passes back canvas context. Takes event liteners for the canvas el.
canvasUtil.initCanvas = (canvasDim) => {
  util.log('canvasUtil: setting canvas side length to:', canvasDim);

  // we'll toss the canvas into the container element
  const container = document.querySelector('#container');

  // create a canvas element, add it to DOM
  let canvas     = document.createElement('canvas');
  canvas.id      = "canvas";
  canvas.height  = canvasDim;
  canvas.width   = canvasDim;

  container.appendChild(canvas);

  return canvas;
};

// attach listeners to the canvas, convenience
// Args canvas, { key: <event name>, val: <on fn()> }
canvasUtil.attachListeners = (canvas, listeners) => {
  for (let eventName in listeners) {
    util.log(`Adding listener for event: ${eventName}`);
    canvas.addEventListener(eventName, listeners[eventName], false);
  }
};

// translate canvas event to pixel id
canvasUtil.canvasEvtToPxlId = (evt, pixelToTone) => {
  let [x, y] = [evt.offsetX, evt.offsetY];

  // not sure why, but sometimes evt.offsetX is -1. Just
  // gonna slide those events over to 0 for now.
  x = Math.max(x, 0);

  return pixelToTone(x, y);
};

