//
// general helper for tone related stuff
//

import util from 'js/util';

// TODO put in config file
const DEACTIVATED_COLOR = "#5CF1F1";
const ACTIVATED_COLOR = "#FBB034";

let tonesUtil = {};
export default tonesUtil;

// initial generation of all the tones
tonesUtil.generateTones = (matrixSideLen, tonesPerRow) => {
  const round = Math.round; // convenience

  const toneSideLen = round(matrixSideLen / tonesPerRow);

  const tones = util.oneTo(tonesPerRow).map(x => {
    return util.oneTo(tonesPerRow).map(y => {
      return {
        active:    false, // clicked or not
        hovered:   false, // has ongoing hover effect
        fillStyle: DEACTIVATED_COLOR,
        points: [
          [round(x * toneSideLen), round(y * toneSideLen)],
          [round((x + 1) * toneSideLen), round(y * toneSideLen)],
          [round((x + 1) * toneSideLen), round((y + 1) * toneSideLen)],
          [round(x * toneSideLen), round((y + 1) * toneSideLen)]
        ]
      }
    });
  });

  // It's handy to construct tones as a 2d array, but no entity down the line
  // should need it in 2d form, so we'll export it in 1d form.
  return util.flatten(tones);
};

// 'activate' a tone, i.e. make it selected
tonesUtil.toggleToneActivation = (tones, tid) => {
  tones[tid].active = !tones[tid].active;

  if (tones[tid].active)
    tones[tid].fillStyle = ACTIVATED_COLOR;
  else
    tones[tid].fillStyle = DEACTIVATED_COLOR;
};

tonesUtil.hoverTone = (tones, tid) => {
  // * if a hover effect is already on the tone, bail
  // * set hover effect active
  // * animate
  //   * Want to do one animation frame per draw loop tic
  // * set hover effect not active
};
