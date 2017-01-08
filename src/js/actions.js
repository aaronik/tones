import utils from 'js/utils'

function navTo (url) {
  window.history.pushState({}, '', url);
  window.postMessage('pushstate', '*');
}

function addFrag (frag) {
  if (window.location.search.indexOf('?') > -1) {
    navTo(window.location.search + '&' + frag);
  } else {
    navTo('?' + frag)
  }
}

var actions = {
  addTrack() {
    let trackId = utils.generateTrackId();
    addFrag(trackId + '=0000000000000000000000000000000000000000000.');
  },

  navigateToTracks (tracks) {
    let newUrlString = '?' + utils.tracksToUrlString(tracks);
    navTo(newUrlString);
  }
}

export default actions
