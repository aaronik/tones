// Alright, this will be a JS store object which contains the state
// of the URL bar. It's too hard to constantly work with the URL
// bar itself. Messy string manipulation. Instead, this will hold
// state, and when it changes, it'll update the URL bar. It'll also
// contain all the methods of getting at the URL state info.
import _       from 'underscore'
import util    from 'js/util'
import urlUtil from 'js/url_util'

// TODO move all this.tracks, this.activeTrackId to this.state.x

// constants TODO move to App
const NUM_SLOTS       = 8,
      MATRIX_SIDE_LEN = 16;

export default class UrlStore {
  constructor() {
    const state = urlUtil.deconstructUrlString();

    // If there aren't any tracks in the URL, let's make a new one
    this.tracks = state.tracks || []; // TODO state.tracks will have empty array. Change?

    if (!this.tracks.length) this._addTrack();

    this.activeTrackId = state.activeTrackId || this.tracks[0].id;
    this.listeners = [];

    this._emitChange();
  }

  ////
  // listener

  onChange(fn) {
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
    this.tracks.forEach(track => {
      if (track.id !== trackId) return;

      track.tones.forEach(tone => {
        if (tone.id !== toneId) return;

        tone.active = !tone.active;
      });
    });

    this._emitChange();
  }

  toggleSlot (trackId, slotId) {
    this.tracks.forEach(track => {
      if (track.id !== trackId) return;

      track.slots.forEach(slot => {
        if (slot.id !== slotId) return;

        slot.active = !slot.active;
      });
    });

    this._emitChange();
  }

  setActiveTrack (trackId) {
    this.activeTrackId = trackId;

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
      })
    });
  }
}
