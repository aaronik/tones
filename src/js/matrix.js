// General methods relating to the matrix

import { log } from 'js/util';

// create pixel to tone map
// We'll use this to achieve lightning fast lookup for mouseover / click
// events. The event will give us a set of coordinates, and we will
// use this map to find which tone the map is over.
export const generatePixelToneMapping = (tones) => {
  const mapping = tones.reduce((map, tone, idx) => {

    // go through every x,y pair and create a 2d map pointing to `idx`
    // nested loop from the first point in tone.points to the last
    // x from the first to x from the last, same with y's.
    const firstX = tone.points[0][0],
          firstY = tone.points[0][1],
          lastX = tone.points[tone.points.length - 2][0], // 2nd to last point is kitty corner
          lastY = tone.points[tone.points.length - 2][1];

    for (let x = firstX; x <= lastX; x++) {
      for (let y = firstY; y <= lastY; y++) {
        if (typeof map[x] !== 'object') map[x] = {};
        map[x][y] = idx;
      }
    }

    return map;
  }, {});

  log("pixel -> tone mapping finished building.");

  return mapping;
};

