require('../sass/main.scss');

import _        from 'underscore';
import React    from 'react';
import ReactDOM from 'react-dom';
import Track    from 'components/track';
import Tracks   from 'components/tracks';
import Matrix   from 'components/matrix';
import MainMenu from 'components/main_menu';
import utils    from 'js/utils';
import actions  from 'js/actions';

// let's call a track data
// track = { id: string, tones: bin string, slots: bin string }

const App = React.createClass({
  getInitialState() {
    let tracks = utils.getTracksFromUrl();

    return {
      tracks: tracks,
      currentTrack: tracks[0]
    };
  },

  componentWillMount() {
    // TODO: move to actions? actions.listenForUrlChange (event) => ...
    // some kind of store watch mixin?
    window.addEventListener('message', (event) => {
      if (event.data != 'pushstate') return;

      let tracks = utils.getTracksFromUrl();

      this.setState({
        tracks: tracks,
        currentTrack: !!tracks.length && tracks[tracks.length - 1]
      });
    });
  },

  _setActiveTrack (trackId) {
    let newCurrentTrack = _.findWhere(this.state.tracks, {id: trackId});
    this.setState({ currentTrack: newCurrentTrack });
  },

  onToneClick (toneId) {
    let modifiedTrack = utils.toggleTone(toneId, this.state.currentTrack);

    let newTracks = this.state.tracks.map( (track) => {
      if (track.id != modifiedTrack.id) return track;
      return modifiedTrack;
    });

    actions.navigateToTracks(newTracks);
  },

  onNewTrack() {
    actions.addTrack();
  },

  onRemoveTrack (trackId) {
    let newTracks = this.state.tracks.filter( (track) => {
      return track.id != trackId;
    });

    actions.navigateToTracks(newTracks);
  },

  onMiniMatrixClick (trackId) {
    this._setActiveTrack(trackId);
  },

  render() {
    let { tracks, currentTrack } = this.state;
    if (!!currentTrack) var { tones } = currentTrack;

    return (
      <div>
        <div className='layout-row'>

          <Matrix
            className='layout-matrix-container'
            tones={tones}
            onToneClick={this.onToneClick}/>

          <Tracks
            className='layout-tracks-container'
            tracks={tracks}
            onNewTrack={this.onNewTrack}
            onRemoveTrack={this.onRemoveTrack}
            onMiniMatrixClick={this.onMiniMatrixClick}/>


        </div>

        <div className='layout-row'>
          <MainMenu className='layout-main-menu-container'/>
        </div>
      </div>
    )
  }
});

let container = document.getElementById('container');
ReactDOM.render(<App/>, container);

