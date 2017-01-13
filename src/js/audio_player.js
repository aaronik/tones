// instrument shape:
// * id
// * iconClassName
// * name (corresponds to value in SOUNDS json)

import Tone from 'tone'
import sounds from 'js/sounds'

export default class AudioPlayer {
  constructor(store) {
    this.store = store;

    this.store.onChange(this.update.bind(this));
    this.update();

    // TODO add this to UI, put in store, url
    Tone.Transport.bpm.value = 80;

    this._createMatrixLoop();
    this._createTracksLoop();
  }

  // update everything - active tones, num tracks, instruments, etc.
  update() {
    this._updateActiveTrack();
  }

  _updateActiveTrack() {
    const track = this.store.getActiveTrack(),
          tones = track.tones,
          instrument = sounds.getInstrument(track.instrument.id),
          synth = instrument.synth,
          pitches = sounds.getTuning(track.tuning.id).pitches;

    this.matrixPlayData = tones.reduce((acc, tone, idx) => {
      // which row we're at, starting from top to bottom
      const rowNumString = Math.floor(idx / this.store.MATRIX_SIDE_LEN);

      // which column we're at, starting from left to right
      const colNumString = idx % this.store.MATRIX_SIDE_LEN;

      // instantiate this field of the matrixPlayData
      acc[colNumString] = !!acc[colNumString] ? acc[colNumString] : [];

      // data is shaped like { 0: [list of pitches], 1: []... } where
      // key is column number
      if (tone.active)
        acc[colNumString].push({ pitches: pitches[rowNumString], synth });

      return acc;
    }, {});
  }

  _createMatrixLoop() {
    let colCounter = 0;
    this.matrixLoop = new Tone.Loop(time => {

      // for each column of the matrix, use the poly synth to play
      // each selected pitch at the same time.
      this.matrixPlayData[colCounter].forEach(datum => {
        const { pitches, synth } = datum;
        synth.triggerAttackRelease(pitches, '16n', time);
      });

      colCounter = (colCounter + 1) % this.store.MATRIX_SIDE_LEN;
    }, '16n').start(0);
  }

  _createTracksLoop() {
    let colCounter = 0;
    this.tracksLoop = new Tone.Loop(time => {
      console.log(time);
      colCounter = (colCounter + 1) % this.store.MATRIX_SIDE_LEN;
    }, '16n').start(0);
  }

  startMatrix() {
    this.tracksLoop.mute = true;
    this.matrixLoop.mute = false;
    Tone.Transport.start();
  }

  startTracks() {
    this.matrixLoop.mute = true;
    this.tracksLoop.mute = false;
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }
}
