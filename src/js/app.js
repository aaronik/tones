require('../sass/main.scss');

import _        from 'underscore'
import React    from 'react'
import ReactDOM from 'react-dom'
import Track    from 'components/track'
import Tracks   from 'components/tracks'
import Matrix   from 'components/matrix'
import PlayButton from 'components/play_button'
import UrlStore from 'js/url_store'
import AudioPlayer from 'js/audio_player'

// TODO Make robust to ill-formed URLs

const urlStore = new UrlStore();

window.AP = new AudioPlayer();

const getStateFromStore = () => {
  return {
    tracks:      urlStore.getTracks(),
    activeTrack: urlStore.getActiveTrack()
  };
};

const App = React.createClass({
  getInitialState() {
    return Object.assign({
      matrixPlayActive: false,
      tracksPlayActive: false
    }, getStateFromStore());
  },

  componentWillMount() {
    urlStore.onChange(() => {
      this.setState(getStateFromStore());
    });
  },

  onToneClick (toneId) {
    urlStore.toggleTone(this.state.activeTrack.id, toneId);
  },

  onSlotClick (trackId, slotId) {
    urlStore.toggleSlot(trackId, slotId);
  },

  onNewTrack() {
    urlStore.addTrack();
  },

  onRemoveTrack (trackId) {
    urlStore.removeTrack(trackId);
  },

  onMiniMatrixClick (trackId) {
    urlStore.setActiveTrack(trackId);
  },

  onMatrixPlayClick() {
    this.setState({
      tracksPlayActive: false,
      matrixPlayActive: !this.state.matrixPlayActive
    });
  },

  onTracksPlayClick() {
    this.setState({
      matrixPlayActive: false,
      tracksPlayActive: !this.state.tracksPlayActive
    });
  },

  render() {
    const { tracks, activeTrack } = this.state;
    const { tones } = activeTrack;

    console.log('matrixPlayActive:', this.state.matrixPlayActive);
    console.log('tracksPlayActive:', this.state.tracksPlayActive);

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
            onMiniMatrixClick={this.onMiniMatrixClick}
            onSlotClick={this.onSlotClick}/>


        </div>

        <div className='layout-row'>
          <PlayButton
            onClick={this.onMatrixPlayClick}
            active={this.state.matrixPlayActive}/>

          <PlayButton
            onClick={this.onTracksPlayClick}
            active={this.state.tracksPlayActive}/>
        </div>
      </div>
    )
  }
});

let container = document.getElementById('container');
ReactDOM.render(<App/>, container);

