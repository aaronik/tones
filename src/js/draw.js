// draw helpers

// this function takes what you give it and draws it (ATTOW simple,
// only does edged shapes)
export const draw = (ctx, drawable) => {
  // TODO ensure points, fillStyle

  ctx.beginPath();

  // move to the start point
  ctx.moveTo(...drawable.points[0]);

  // draw sides to the rest of the points
  drawable.points.slice(1).forEach(point => {
    ctx.lineTo(...point);
  });

  // completes the final side
  ctx.closePath();

  ctx.fillStyle = drawable.fillStyle;

  ctx.fill();
  ctx.stroke();
};

// set up a draw loop. Returns interval id.
export const initDrawLoop = (drawables, draw, interval) => {
  return setInterval(() => {
    drawables.forEach(draw);
  }, interval);
};

