// helper for init related code

import { log } from 'js/util';

// initialize canvas. Passes back canvas context. Takes event liteners for the canvas el.
export const initCanvas = (matrixSideLen, listeners = {}) => {
  const container = document.querySelector('#container');

  // add canvas
  let canvas     = document.createElement('canvas');
  canvas.id      = "canvas";
  canvas.height  = matrixSideLen;
  canvas.width   = matrixSideLen;

  log('setting canvas side length to:', matrixSideLen);

  container.appendChild(canvas);

  for (let eventName in listeners) {
    log(`Adding listener for event: ${eventName}`);
    canvas.addEventListener(eventName, listeners[eventName], false);
  }

  return canvas.getContext('2d');
};

