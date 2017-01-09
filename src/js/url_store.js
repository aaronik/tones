// Alright, this will be a JS store object which contains the state
// of the URL bar. It's too hard to constantly work with the URL
// bar itself. Messy string manipulation. Instead, this will hold
// state, and when it changes, it'll update the URL bar. It'll also
// contain all the methods of getting at the URL state info.

import util    from 'js/util'
import urlUtil from 'js/url_util'

// constants TODO move to App
const NUM_SLOTS       = 8,
      MATRIX_SIDE_LEN = 16;

class UrlStore {
  constructor(state) {
    // take the state, validate its shape, set it.
    // TODO take state or build it from URL here?
    // TODO if there are no tracks in the URL, let's make one here
    this.tracks        = state.tracks || [];
    this.activeTrackId = state.activeTrackId || 0 // TODO or the first track
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
    this.tracks.push({
      id: this._generateUniqueTrackId(),

      slots: util.oneTo(NUM_SLOTS).map(id => {
        return { id: id, active: false };
      },

      tones: util.oneTo(Math.pow(MATRIX_SIDE_LEN, 2)).map(id => {
        return { id: id, active: false };
      })
    });

    this._emitChange();
  }

  toggleTone(toneId, trackId) {
    this.tracks.forEach(track => {
      if (track.id !== trackId) return;

      track.tones.forEach(tone => {
        if (tone.id !== toneId) return;
        tone.active = !tone.active;
      });
    });

    this._emitChange();
  }

  setActiveTrack(trackId) {
    this.activeTrackId = trackId;

    this._emitChange();
  }

  ////
  // private helpers

  // return a track id that has not been used yet
  _generateUniqueTrackId() {
    let usedIds = this.tracks.map(track => { return track.id });

    // major hack?
    for (var newId = 0; _.contains(usedIds, newId); newId++) {}
    return newId;
  }

  _emitChange() {
    // build URL here
    urlUtil.constructUrlString({
      activeTrackId: this.activeTrackId,
      tracks: this.tracks
    });
  }
}

