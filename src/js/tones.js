//
// general helper for tone related stuff
//

import util from 'js/util';

let tonesUtil = {};
export default tonesUtil;

tonesUtil.generateTones = (matrixSideLen, tonesPerRow) => {
  const round = Math.round; // convenience

  const toneSideLen = round(matrixSideLen / tonesPerRow);

  const tones = util.oneTo(tonesPerRow).map(x => {
    return util.oneTo(tonesPerRow).map(y => {
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
  return util.flatten(tones);
};

