// import utils from 'js/utils'

// Getting an active track
// * Must put it in query string, otherwise we need to do
//   messy stuff to get state to play nice with re-reading URL
// * The URL is now constructed imperitively. Better to have a
//   url store which shoves itself into URL bar on change?

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
  },

  setActiveTrack (trackId) {
    addFrag('a=' + trackId);
  }
}

export default actions
