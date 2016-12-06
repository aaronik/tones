require('sass/canvas');

const initContext = () => {
  const canvas  = document.getElementById('canvas');
  return canvas.getContext('2d');
};

// TODO: move to util
const least = (x, y) => {
  if (x < y) return x;
  return y;
}

const initHtml = () => {
  const head      = document.head,
        body      = document.body,
        container = document.querySelector('#container'),
        height    = document.body.scrollHeight,
        width     = document.body.clientWidth,
        sideLen   = Math.floor(least(height, width) - 10); // bit of border

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
  canvas.height  = sideLen;
  canvas.width   = sideLen;

  container.appendChild(canvas);
}

// generate a
// generateTonePositions = () => {

// };

// Tone data structure thoughts:
// Draw Function:
//  + can animate other things like text on screen, etc.
//  - much less functional
//  -- can't easily modify for effects
// points[] etc data:
//  ++ easily modifiable for effects
//  + more functional
//  - harder to animate other things, but the drawer can just look for a draw function and use that if need be.

// each square is a tone, the whole thing is a matrix.
const generateTones = (ctx) => {
  // TODO don't draw here, just build the objects.
  // Object needs: {
  //   points[]: ordered list of points, first one the start point (to moveTo), rest points to lineTo.
  //   fillStyle: hex color
  //
  ctx.beginPath();
  ctx.moveTo(150,125);
  ctx.lineTo(125,175);
  ctx.lineTo(175,175);
  ctx.closePath();
  ctx.fillStyle="#FF5722";
  ctx.fill();
  ctx.stroke();
};

initHtml();
const ctx = initContext();
generateTones(ctx);

