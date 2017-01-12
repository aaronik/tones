import SOUNDS from 'json/sounds'
import jsfx   from 'js/lib/jsfx'

// TODO: This is currently the site of planning for both the UX
// of how audio playing is gonna be, and for getting the audio
// stuff hashed out.
// * One play button below the main grid, one below the tracks.
//   No stop, no x. Play turns to pause to pause it. To kill everything,
//   just spam click the x's below the tracks.
// * Each track has visible slots. mouse over the slot and a + appears,
//   click it to enable slot. Once it's enabled, a (faded?) mini matrix
//   appears in the slot. Once that's there, a mouse over shows a - above it,
//   and that removes it from the slot.

// instrument shape:
// * id
// * iconClassName
// * name (corresponds to value in SOUNDS json)

export default class AudioPlayer {
  constructor() {
    this.instruments = Object.keys(SOUNDS).map(name => {
      return {
        name:          name,
        id:            SOUNDS[name].id,
        iconClassName: SOUNDS[name].iconClassName
      };
    });
  }

  // TODO either this or having separate instruments like below
  playSound (soundName, frequency = 1000) {
    const modifier = {
      Frequency: {
        Start: frequency, // frequency in Hz
        Min: 880,         // the ...max... cap for frequency
        Slide: -0.8
      }
    };

    const sound = Object.assign(SOUNDS[soundName], modifier);
    console.log('playing sound:', sound);

    return jsfx.Sound(sound).play(); // the jsfx call returns a an HTML 'audio' element
  }
}

// sketchin it out
class Bass {
  play(level) {
    // where level = the # row, the frequency
  }
}
