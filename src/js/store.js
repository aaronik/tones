// Alright, this will be a JS store object which contains the state
// of the URL bar. It's too hard to constantly work with the URL
// bar itself. Messy string manipulation. Instead, this will hold
// state, and when it changes, it'll update the URL bar. It'll also
// contain all the methods of getting at the URL state info.
import _       from 'underscore'
import Tone    from 'tone'
import util    from 'js/util'
import urlUtil from 'js/url_util'

// TODO move all this.tracks, this.activeTrackId to this.state.x
// TODO Can we use numeric ids instead of string based ones? Would be easier.

// constants TODO move to App
const NUM_SLOTS       = 8,
      MATRIX_SIDE_LEN = 16;

// TODO Move this and insruments to some kinda constants / music library
const TUNINGS = [
  {
    id: '0',
    name: 'Major Pentatonic', // TODO use something more language independent, like M5?
    pitches: [
      'D6', 'C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'C2'
    ]
  }
];

const INSTRUMENTS = [
  {
    id: '0',
    iconClassName: 'fa fa-bullhorn',
    name: 'Synth', // for printing purposes?
    synth: new Tone.Synth().toMaster() // TODO is this the best spot for this?
  },
  {
    id: '1',
    iconClassName: 'fa fa-bullhorn',
    name: 'AMSynth',
    synth: new Tone.AMSynth().toMaster()
  },
  {
    id: '2',
    iconClassName: 'fa fa-bullhorn',
    name: 'FMSynth',
    synth: new Tone.FMSynth().toMaster()
  }
];


export default class Store {
  constructor() {
    this.MATRIX_SIDE_LEN = MATRIX_SIDE_LEN;
    this.NUM_SLOTS       = NUM_SLOTS;

    // TODO move this outta here, it's used by app but app can access it directly
    // once it's in its own file
    this.instruments     = INSTRUMENTS;

    const state = urlUtil.deconstructUrlString();

    this.tracks = state.tracks || []; // TODO state.tracks will have empty array. Change?

    // If there aren't any tracks in the URL, let's make a new one
    if (!this.tracks.length) this._addTrack();

    this.activeTrackId = state.activeTrackId || this.tracks[0].id;

    this.listeners = [];

    this._emitChange();
  }

  ////
  // listener

  onChange (fn) {
    this.listeners.push(fn);
  }

  ////
  // accessors

  getActiveTrack() {
    return _.find(this.tracks, { id: this.activeTrackId });
  }

  getTracks() {
    return this.tracks;
  }

  getTuning (tuningId) {
    return TUNINGS.find(tuning => {
      return tuning.id === tuningId;
    });
  }

  getInstrument (instrumentId) {
    return INSTRUMENTS.find(instrument => {
      return instrument.id === instrumentId;
    });
  }

  ////
  // writers

  addTrack() {
    this._addTrack();

    // set active track to the one just created.
    this.activeTrackId = this.tracks[this.tracks.length - 1].id;
    this._emitChange();
  }

  removeTrack (trackId) {
    this.tracks = _.filter(this.tracks, track => {
      return track.id !== trackId;
    });

    // if we're removing the last track, add a new blank one
    if (!this.tracks.length) this._addTrack();

    // if the currently selected track was removed,
    // modify the active track to reflect it
    if (trackId === this.activeTrackId) this.activeTrackId = this.tracks[0].id;

    this._emitChange();
  }

  toggleTone (trackId, toneId) {
    let track = this._getTrack(trackId);

    track.tones.forEach(tone => {
      if (tone.id !== toneId) return;

      tone.active = !tone.active;
    });

    this._emitChange();
  }

  toggleSlot (trackId, slotId) {
    let track = this._getTrack(trackId);

    track.slots.forEach(slot => {
      if (slot.id !== slotId) return;

      slot.active = !slot.active;
    });

    this._emitChange();
  }

  setActiveTrack (trackId) {
    this.activeTrackId = trackId;

    this._emitChange();
  }

  setInstrument (trackId, instrumentId) {
    let track = this._getTrack(trackId);

    track.instrument = this.getInstrument(instrumentId);

    this._emitChange();
  }

  ////
  // private helpers

  _getTrack (trackId) {
    return this.tracks.find(track => {
      return track.id === trackId;
    });
  }

  // return a track id that has not been used yet
  _generateUniqueTrackId() {
    const usedIds = this.tracks.map(track => { return track.id });

    // our ids are stringified, we'll use a numerical technique to generate
    // a new one, so we parse them here.
    const parsedUsedIds = usedIds.map(id => { return parseInt(id, 10) });

    // major hack?
    for (var newId = 0; _.contains(parsedUsedIds, newId); newId++) {}
    return newId.toString();
  }

  _emitChange() {
    // build URL, put it in the bar
    urlUtil.constructUrlString({
      activeTrackId: this.activeTrackId,
      tracks:        this.tracks
    });

    // also emit change from this JS object. This will
    // decouple the URL bar with the state of the app.
    // If things start to go wrong with the URL bar,
    // given this setup, it won't look weird in the app.
    // It'll only break when the user tries to reload
    // their app. Big problem! TODO: To fix: Limit number of
    // tracks. Also consider using larger than 64 character
    // helix. There are 1.15792089237316e77 possibilities,
    // so it should be way bigger than 64 ;). I believe there
    // will be significantly diminishing returns going up. Maybe
    // by doubling we'll shave off 1 character per track?
    this.listeners.forEach(fn => { fn() });
  }

  // adds track, but unlike the public writer function, this
  // does not call emitChange. This is used internally in the
  // constructor.
  _addTrack() {
    this.tracks.push({
      id: this._generateUniqueTrackId(),

      slots: util.oneTo(NUM_SLOTS).map(id => {
        return { id: id.toString(), active: false };
      }),

      tones: util.oneTo(Math.pow(MATRIX_SIDE_LEN, 2)).map(id => {
        return { id: id.toString(), active: false };
      }),

      tuning: TUNINGS[0],

      instrument: INSTRUMENTS[0]
    });
  }
}

