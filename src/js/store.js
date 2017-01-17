// Alright, this will be a JS store object which contains the state
// of the URL bar. It's too hard to constantly work with the URL
// bar itself. Messy string manipulation. Instead, this will hold
// state, and when it changes, it'll update the URL bar. It'll also
// contain all the methods of getting at the URL state info.
import _       from 'underscore'
import Tone    from 'tone'
import util    from 'js/util'
import urlUtil from 'js/url_util'
import sounds  from 'js/sounds'

// TODO move all this.tracks, this.activeTrackId to this.state.x
// TODO Can we use numeric ids instead of string based ones? Would be easier.

// constants TODO move to App
const NUM_SLOTS       = 8,
      MATRIX_SIDE_LEN = 16;

export default class Store {
  constructor() {
    this.MATRIX_SIDE_LEN = MATRIX_SIDE_LEN;
    this.NUM_SLOTS       = NUM_SLOTS;

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

  getTrack (trackId) {
    return this.tracks.find(track => {
      return track.id === trackId;
    });
  }

  getSlot (trackId, slotId) {
    const track = this.getTrack(trackId);
    return track.slots.find(slot => slot.id === slotId);
  }

  getTone (trackId, toneId) {
    const track = this.getTrack(trackId);
    return track.tones.find(tone => tone.id === toneId);
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
    let tone = this.getTone(trackId, toneId);
    tone.active = !tone.active;

    this._emitChange();
  }

  toggleSlot (trackId, slotId) {
    let slot = this.getSlot(trackId, slotId);
    slot.active = !slot.active;

    this._emitChange();
  }

  setActiveTrack (trackId) {
    this.activeTrackId = trackId;

    this._emitChange();
  }

  setInstrument (trackId, instrumentId) {
    let track = this.getTrack(trackId);

    track.instrument = sounds.getInstrument(instrumentId);

    this._emitChange();
  }

  setTuning (trackId, tuningId) {
    let track = this.getTrack(trackId);

    track.tuning = sounds.getTuning(tuningId);

    this._emitChange();
  }

  ////
  // private helpers

  // return a track id that has not been used yet
  _generateUniqueTrackId() {
    const usedIds = this.tracks.map(track => { return track.id });

    // our ids are stringified, we'll use a numerical technique to generate
    // a new one, so we parse them here.
    const parsedUsedIds = usedIds.map(id => { return parseInt(id, 10) });

    // major hack?
    for (var newId = 0; _.contains(parsedUsedIds, newId); newId++) {}
    return newId;
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
        return { id: id, active: false };
      }),

      tones: util.oneTo(Math.pow(MATRIX_SIDE_LEN, 2)).map(id => {
        return { id: id, active: false };
      }),

      tuning: sounds.TUNINGS[0],

      instrument: sounds.INSTRUMENTS[0]
    });
  }
}

