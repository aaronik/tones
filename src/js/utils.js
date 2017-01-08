import _ from 'underscore'
import URL from 'url-parse'

import b2 from 'js/base2_converter'

// TODO
// * stop hard coding 16 (matrix side length)

function trackObjectsFromQuery (queryObj) {
  let trackObjects = [];
  let ids = Object.keys(queryObj);

  return ids.map( (id) => {
    let infoString = queryObj[id];
    let [encodedTones, encodedslots] = infoString.split('.');
    let tones = b2.decode(encodedTones, 256);
    let slots = b2.decode(encodedslots, 8);
    return { id, tones, slots };
  });
}

function url() {
  return new URL(window.location.toString(), true);
}

// parse out all the complete track objects from the URL bar
function getTracksFromUrl() {
  return trackObjectsFromQuery(url().query);
}

// generate a new track ID, guaranteed it hasn't been used yet
// by scanning through existing track ids from the URL bar
function generateTrackId() {
  var usedIds = _.pluck(trackObjectsFromQuery(url().query), 'id')
    .map( (strId) => {
      return parseInt(strId);
    });

  // major hack?
  for (var newId = 0; _.contains(usedIds, newId); newId++) {}
  return newId;
}

// takes a toneId and track and modifies a duplicated track object
// with the tone in question toggled. Remember the track object
// has a 'tones' property which is a list of 0's and 1's.
function toggleTone (toneId, track) {
  // toneId looks like 'row.column', ex. '5.2'
  let [row, column] = toneId.split('.').map(str => { return parseInt(str, 10) });

  if (isNaN(row) || isNaN(column)) {
    throw new Error('usage: toggleTone(toneId: num.num, track: propTypes.track');
  }

  let index = (row * 16) + column;
  let newTrack = _.clone(track);
  let newTones = newTrack.tones.split('');
  newTones[index] = track.tones[index] == '1' ? '0' : '1';
  newTrack.tones = newTones.join('');
  return newTrack;
}

function trackToUrlString (track) {
  let str = '';
  str += track.id + '=';
  str += b2.encode(track.tones);
  str += '.'
  str += b2.encode(track.slots);
  return str;
}

function tracksToUrlString (tracks) {
  if (!_.isArray(tracks)) {
    throw new Error('tracksToUrlString takes an array');
  }

  return tracks.map(trackToUrlString).join('&');
}

// TODO: Make tests for this
// var edString = '111111000000';
// console.log('edStrin:', edString);
// var encodedString = encode(edString);
// console.log('encoded:', encodedString);
// var decodedString = decode(encodedString, edString.length);
// console.log('decoded:', decodedString);
// console.log('same:', edString == decodedString);

let utils = { getTracksFromUrl, generateTrackId, toggleTone, tracksToUrlString }

export default utils
