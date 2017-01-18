require('../sass/main.scss');

import _           from 'underscore'
import React       from 'react'
import ReactDOM    from 'react-dom'
import Track       from 'components/track'
import Tracks      from 'components/tracks'
import Matrix      from 'components/matrix'
import PlayButton  from 'components/play_button'
import Store       from 'js/store'
import AudioPlayer from 'js/audio_player'
import sounds      from 'js/sounds'

// TODO Make robust to ill-formed URLs

const store       = new Store();
const audioPlayer = new AudioPlayer(store);

const getStateFromStore = () => {
  return {
    tracks:      store.getTracks(),
    activeTrack: store.getActiveTrack()
  };
};

const INACTIVE_PLAYBACK_BAR_STATE = {
  activeMatrixColumn: -1, // -1 means don't show the playback bar
  activeTrackColumn: -1,
  activeSlotId: -1
};

const App = React.createClass({
  getInitialState() {
    return Object.assign({
      matrixPlayActive: false,
      tracksPlayActive: false
    }, INACTIVE_PLAYBACK_BAR_STATE, getStateFromStore());
  },

  componentWillMount() {
    store.onChange(() => {
      this.setState(getStateFromStore());
    });

    audioPlayer.addMatrixPlayHook(this.onMatrixPlayHit);
    audioPlayer.addTracksPlayHook(this.onTracksPlayHit);
  },

  onMatrixPlayHit (colNum) {
    this.setState({ activeMatrixColumn: colNum });
  },

  onTracksPlayHit (slotId, colNum) {
    this.setState({ activeSlotId: slotId, activeTrackColumn: colNum });
  },

  onToneClick (toneId) {
    store.toggleTone(this.state.activeTrack.id, toneId);
  },

  onSlotClick (trackId, slotId) {
    store.toggleSlot(trackId, slotId);
  },

  onNewTrack() {
    store.addTrack();
  },

  onRemoveTrack (trackId) {
    store.removeTrack(trackId);
  },

  onMiniMatrixClick (trackId) {
    store.setActiveTrack(trackId);
  },

  onInstrumentClick (trackId, instrumentId) {
    store.setInstrument(trackId, instrumentId);
  },

  onTuningClick (trackId, tuningId) {
    store.setTuning(trackId, tuningId);
  },

  onMatrixPlayClick() {
    audioPlayer.stop();

    if (!this.state.matrixPlayActive) audioPlayer.startMatrix();

    this.setState(Object.assign({
      tracksPlayActive: false,
      matrixPlayActive: !this.state.matrixPlayActive
    }, INACTIVE_PLAYBACK_BAR_STATE));
  },

  onTracksPlayClick() {
    audioPlayer.stop();

    if (!this.state.tracksPlayActive) audioPlayer.startTracks();

    this.setState(Object.assign({
      matrixPlayActive: false,
      tracksPlayActive: !this.state.tracksPlayActive
    }, INACTIVE_PLAYBACK_BAR_STATE));
  },

  render() {
    const { tracks, activeTrack } = this.state;
    const { tones } = activeTrack;

    // TODO are the classnames below here being used?

    return (
      <div>
        <div className='layout-row'>

          <Matrix
            className='layout-matrix-container'
            tones={tones}
            activeColumn={this.state.activeMatrixColumn}
            onToneClick={this.onToneClick}/>

          <Tracks
            className='layout-tracks-container'
            tracks={tracks}
            activeTrackId={this.state.activeTrack.id}
            activeColumn={this.state.activeTrackColumn}
            activeSlotId={this.state.activeSlotId}
            onNewTrack={this.onNewTrack}
            onRemoveTrack={this.onRemoveTrack}
            onMiniMatrixClick={this.onMiniMatrixClick}
            onSlotClick={this.onSlotClick}
            instruments={sounds.INSTRUMENTS}
            onInstrumentClick={this.onInstrumentClick}
            tunings={sounds.TUNINGS}
            onTuningClick={this.onTuningClick}/>
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

