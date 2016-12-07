import { oneTo, flatten, log } from 'js/util';
import { generatePixelToneMapping, draw } from 'js/matrix';

require('sass/canvas');

const bodyHeight    = document.body.scrollHeight,
      bodyWidth     = document.body.clientWidth,
      matrixSideLen = Math.floor(Math.min(bodyHeight, bodyWidth) - 10); // bit of border

const initContext = (pixelToneMapping) => {
  const canvas  = document.getElementById('canvas');

  canvas.addEventListener('mousemove', evt => {
    console.log(evt.offsetX, evt.offsetY, pixelToneMapping[evt.offsetX][evt.offsetY]);
  }, false);

  return canvas.getContext('2d');
};

const initHtml = () => {
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
}

// TODO move to tone helper or something
const generateTones = (matrixSideLen, tonesPerRow) => {
  const round = Math.round; // convenience

  const toneSideLen = round(matrixSideLen / tonesPerRow);

  const tones = oneTo(tonesPerRow).map(x => {
    return oneTo(tonesPerRow).map(y => {
      return {
        points: [
          [round(x * toneSideLen), round(y * toneSideLen)],
          [round((x + 1) * toneSideLen), round(y * toneSideLen)],
          [round((x + 1) * toneSideLen), round((y + 1) * toneSideLen)],
          [round(x * toneSideLen), round((y + 1) * toneSideLen)]
        ],
        fillStyle: "#5CF1F1"
      }
    });
  });

  // It's handy to construct tones as a 2d array, but no entity down the line
  // should need it in 2d form, so we'll export it in 1d form.
  return flatten(tones);
};

const tones = generateTones(matrixSideLen, 16);
const pixelToneMapping = generatePixelToneMapping(tones);

// TODO initHtml and initContext are tied together, can initHtml just return the context?
initHtml();
const ctx = initContext(pixelToneMapping);
tones.forEach(draw.bind(null, ctx));
