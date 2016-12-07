// helper for init related code

import { log } from 'js/util';

// initialize all HTML. Passes back canvas context. Takes event liteners.
export const initHtmlCtx = (matrixSideLen, listeners = {}) => {
  const head      = document.head,
        body      = document.body,
        container = document.querySelector('#container');

  // if we're developing, add the hot loading webpack server bit
  // TODO: get some html preprocessor for webpack and put this into index.html
  if (process.env.NODE_ENV === 'development')
    head.appendChild(
      document.createElement('script', {
        src: "http://localhost:8080/webpack-dev-server.js"
      })
    );

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

