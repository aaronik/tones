import Tone from 'tone'
import util from 'js/util'

export default class AudioPlayer {
  constructor(store) {
    this.store = store;

    this.store.onChange(this.update.bind(this));
    this.update();

    // TODO add this to UI, put in store, url
    Tone.Transport.bpm.value = 80;

    // The master playback location state
    this._colCounter = 0;
    this._slotCounter = 0;

    this._createMatrixLoop();
    this._createTracksLoop();
  }

  // update everything - active tones, num tracks, instruments, etc.
  update() {
    this._updateMatrixData();
    this._updateTracksData();
  }

  // create an internal memory structure that makes it easy to
  // play the right tones at the right time. This one is for
  // the matrix play.
  _updateMatrixData() {
    const track = this.store.getActiveTrack(),
          tones = track.tones,
          synth = track.instrument.synth,
          pitches = track.tuning.pitches;

    this._matrixPlayData = tones.reduce((acc, tone, idx) => {
      // which row we're at, starting from top to bottom
      const rowNum = Math.floor(idx / this.store.MATRIX_SIDE_LEN);

      // which column we're at, starting from left to right
      const colNum = idx % this.store.MATRIX_SIDE_LEN;

      // instantiate this field of the matrixPlayData
      if (!acc[colNum]) acc[colNum] = [];

      // data is shaped like { 0: {[list of pitches], synth}, 1: []... } where
      // key is column number
      if (tone.active)
        acc[colNum].push({ pitches: pitches[rowNum], synth });

      return acc;
    }, {});
  }

  // create an internal memory structure that makes it easy to
  // play the right tones at the right time. This is for when
  // the tracks are playing.
  _updateTracksData() {
    const tracks = this.store.tracks;

    // { <slot>: <col>: [list of pitches], synth, ... }
    // TODO iterate over actual slot IDs, don't assume
    this._tracksPlayData = util.oneTo(8).reduce((acc, slotId) => {
      tracks.forEach(track => {

        const slot    = track.slots[slotId],
              synth   = track.instrument.synth,
              pitches = track.tuning.pitches;

        track.tones.forEach((tone, idx) => {

          // which row we're at, starting from top to bottom
          const rowNum = Math.floor(idx / this.store.MATRIX_SIDE_LEN);

          // which column we're at, starting from left to right
          const colNum = idx % this.store.MATRIX_SIDE_LEN;

          if (!acc[slotId]) acc[slotId] = {};
          if (!acc[slotId][colNum]) acc[slotId][colNum] = [];

          if (slot.active && tone.active)
            acc[slotId][colNum].push({ pitches: pitches[rowNum], synth });
        });
      });

      return acc;
    }, {});
  }

  _createMatrixLoop() {
    this.matrixLoop = new Tone.Loop(time => {

      // for each column of the matrix, use the poly synth to play
      // each selected pitch at the same time.
      this._matrixPlayData[this._colCounter].forEach(datum => {
        const { pitches, synth } = datum;
        synth.triggerAttackRelease(pitches, '16n', time);
      });

      this._colCounter = (this._colCounter + 1) % this.store.MATRIX_SIDE_LEN;
    }, '16n').start(0);
  }

  _createTracksLoop() {
    this.tracksLoop = new Tone.Loop(time => {

      this._tracksPlayData[this._slotCounter][this._colCounter].forEach(datum => {
        const { pitches, synth } = datum;
        synth.triggerAttackRelease(pitches, '16n', time);
      });

      this._colCounter = (this._colCounter + 1) % this.store.MATRIX_SIDE_LEN;
      if (this._colCounter === 0)
        this._slotCounter = (this._slotCounter + 1) % this.store.NUM_SLOTS;

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
    this._colCounter = 0;
    this._slotCounter = 0;
  }
}
