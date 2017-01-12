import _ from 'underscore'
import URL from 'url-parse'
import b2 from 'js/base2_converter'

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
    const encodedToneBitString = query[id].split('.')[0],
          encodedSlotBitString = query[id].split('.')[1];

    const unencodedToneBitString = b2.decode(encodedToneBitString, 256), // TODO un hard code
          unencodedSlotBitString = b2.decode(encodedSlotBitString, 8);

    // TODO this logic is duplicated in the store, combine it
    return {
      id: id,

      tones: unencodedToneBitString.split('').map((bit, id) => {
        return { id: id.toString(), active: bit === '1' };
      }),

      slots: unencodedSlotBitString.split('').map((bit, id) => {
        return { id: id.toString(), active: bit === '1' };
      }),

      tuningId: '0', // TODO

      instrumentId: '0' // TODO
    };
  });

  return state;
};

const constructUrlString = (state) => {

  let query = { a: state.activeTrackId };

  state.tracks.forEach(track => {
    const unencodedToneBitString = track.tones.map(tone => {
      return tone.active ? '1' : '0';
    }).join('');

    const unencodedSlotBitString = track.slots.map(slot => {
      return slot.active ? '1' : '0';
    }).join('');

    const encodedToneBitString = b2.encode(unencodedToneBitString);
    const encodedSlotBitString = b2.encode(unencodedSlotBitString);

    query[track.id] = encodedToneBitString + '.' + encodedSlotBitString;
  });

  navTo(url().set('query', query).toString());
};

export default { deconstructUrlString, constructUrlString }
