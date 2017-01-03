//
// This guy does the animations on the tones.
// It's a singleton, saves the animation progress as internal state.
// Has API allowing you to perform animations, and has
// main call "mask" that takes the tones and outputs modified, animated
// tones. Has secondary call "tic" that must be called to step forward
// each animation.
//
// TODO:
//  * Does this also hold onto 'active' state? Heck yah why not,
//    will enable us to do cool animations on active stuff.

// adds decimals to hex colors. ex. hexAdd('#abc', 1) -> '#abd'
const hexAdd = (poundHex, dec) => {
  const hex = poundHex.slice(1); // remove # from given hex number
  const num = parseInt(hex, 16); // hex to dec
  const sumDec = Math.round(num + dec); // do the addition in dec
  return '#' + sumDec.toString(16); // back to hex, add the pound
};

class Animator {
  constructor (tones) {
    this.tones = tones;
    // either take tones in here and save to state or take them in mask, tic
    // pros/cons:
    //  +
    //  -

    // create object with keys: the ids of each tone, val empty array
    this._animations = tones.reduce((animations, tone, idx) => {
      animations[idx] = [];
      return animations;
    }, {});
  }

  _addAnimation (tid, animGen) {
    this._animations[tid].push(animGen);
  }

  toggleToneActivation (tid) {
    this._addAnimation(tid, function*(tone) {
      for (let step = 0; step < 10; step--) {
        yield { fillStyle: hexAdd(tone.fillStyle, step) };
      };
    });

  }

  mask () {
    // return list of tones but with ones undergoing active
    // animation replaced with their animated selves

  }

  tic () {
    // step to next animation step
    for (tid in this._animations) {
      this._animations[tid]
    }
  }

}

const animator = new Animator;
export default animator;
