// instrument shape:
// * id
// * iconClassName
// * name (corresponds to value in SOUNDS json)

import Tone from 'tone'

export default class AudioPlayer {
  constructor(store) {
    this.store = store;

    this.store.onChange(this.update.bind(this));
    this.update();

    // TODO add this to UI, put in store, url
    Tone.Transport.bpm.value = 80;
  }

  // update everything - active tones, num tracks, instruments, etc.
  update() {
    this._updateActiveTrack();
  }

  // TODO naming
  _updateActiveTrack() {
    const track = this.store.getActiveTrack(),
          tones = track.tones,
          instrument = this.store.getInstrument(track.instrumentId),
          pitches = this.store.getTuning(track.tuningId).pitches;

    this.matrixPlayData = tones.reduce((acc, tone, idx) => {
      // which row we're at, starting from top to bottom
      const rowNumString = Math.floor(idx / this.store.MATRIX_SIDE_LEN).toString();

      // which column we're at, starting from left to right
      const colNumString = (idx % this.store.MATRIX_SIDE_LEN).toString();

      // instantiate this field of the matrixPlayData
      acc[colNumString] = !!acc[colNumString] ? acc[colNumString] : [];

      // data is shaped like { 0: [list of playables], 1: []... } where
      // key is column number, list is all playables within a single column
      if (tone.active)
        acc[colNumString].push({ pitch: pitches[rowNumString], synth: instrument.synth });

      return acc;
    }, {});
  }

  startMatrix() {
    let colCounter = 0;

    console.log(this.matrixPlayData);

    // TODO This isn't workin - choppy, ill-timed,
    // starts at the wrong spot. Read about a loop
    // scheduler, that might make this work better.
    this.transportScheduleId = new Tone.Loop((time) => {
      // TODO this isn't working either. Loop would prob fix it,
      // otherwise if there are multiple instruments, better do
      // poly synth.
      this.matrixPlayData[colCounter].forEach(playDatum => {
        const { synth, pitch } = playDatum;
        synth.triggerAttackRelease(pitch, '16n');
      });

      colCounter = (colCounter + 1) % this.store.MATRIX_SIDE_LEN;
    }, '16n').start(0);

    Tone.Transport.start();
  }

  startTracks() {
    this.transportScheduleId = Tone.Transport.scheduleRepeat(time => {
      console.log(time);
    }, '16n');

    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
    Tone.Transport.cancel(this.transportScheduleId);
  }
}

// sketchin it out
class Bass {
  play(level) {
    // where level = the # row, the frequency
  }
}
