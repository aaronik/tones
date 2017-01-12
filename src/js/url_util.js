import _ from 'underscore'
import URL from 'url-parse'
import b2 from 'js/base2_converter'
import sounds from 'js/sounds'

// nab the URL from the nav bar
const url = () => {
  return new URL(window.location.toString(), true);
}

const navTo = (url) => {
  window.history.pushState({}, '', url);
  window.postMessage('pushstate', '*');
}

// turn URL into full state object, which will then
// be consumed by the Store.
const deconstructUrlString = () => {
  var state = {},
      query = url().query;

  // active track
  state.activeTrackId = query.a;

  delete query.a; // make room for easy numerical deconstruction of tracks

  state.tracks = Object.keys(query).map(id => {
    const segments = query[id].split('.');

    const encodedToneBitString = segments[0],
          encodedSlotBitString = segments[1],
          instrumentId         = segments[2],
          tuningId             = segments[3];

    const unencodedToneBitString = b2.decode(encodedToneBitString, 256), // TODO un hard code
          unencodedSlotBitString = b2.decode(encodedSlotBitString, 8);

    return {
      id: id,

      tones: unencodedToneBitString.split('').map((bit, id) => {
        return { id: id.toString(), active: bit === '1' };
      }),

      slots: unencodedSlotBitString.split('').map((bit, id) => {
        return { id: id.toString(), active: bit === '1' };
      }),

      tuning: sounds.getTuning(tuningId),

      instrument: sounds.getInstrument(instrumentId)
    };
  });

  return state;
};

const constructUrlString = (state) => {

  // active track
  let query = { a: state.activeTrackId };

  // tracks
  state.tracks.forEach(track => {

    // tone portion
    const unencodedToneBitString = track.tones.map(tone => {
      return tone.active ? '1' : '0';
    }).join('');

    const encodedToneBitString = b2.encode(unencodedToneBitString);

    query[track.id] = encodedToneBitString;

    // slot portion
    const unencodedSlotBitString = track.slots.map(slot => {
      return slot.active ? '1' : '0';
    }).join('');

    const encodedSlotBitString = b2.encode(unencodedSlotBitString);

    query[track.id] = query[track.id] + '.' + encodedSlotBitString;

    // instrument
    query[track.id] = query[track.id] + '.' + track.instrument.id;

    // tuning
    query[track.id] = query[track.id] + '.' + track.tuning.id;
  });

  navTo(url().set('query', query).toString());
};

export default { deconstructUrlString, constructUrlString }
