// general helper for tone related stuff

import { oneTo, flatten } from 'js/util';

export const generateTones = (matrixSideLen, tonesPerRow) => {
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

