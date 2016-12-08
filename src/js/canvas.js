// helper for init related code

import { log } from 'js/util';

let util;

// initialize canvas. Passes back canvas context. Takes event liteners for the canvas el.
export const initCanvas = (canvasDim, listeners = {}) => {
  const container = document.querySelector('#container');

  // add canvas
  let canvas     = document.createElement('canvas');
  canvas.id      = "canvas";
  canvas.height  = canvasDim;
  canvas.width   = canvasDim;

  log('setting canvas side length to:', canvasDim);

  container.appendChild(canvas);

  return canvas;
};

// attach listeners to the canvas, convenience
// Arg { key: <event name>, val: <on fn()> }, canvas
export const attachListeners = (listeners, canvas) => {
  for (let eventName in listeners) {
    log(`Adding listener for event: ${eventName}`);
    canvas.addEventListener(eventName, listeners[eventName], false);
  }
};
