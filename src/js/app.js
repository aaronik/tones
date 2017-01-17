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

const store = new Store();
const audioPlayer = new AudioPlayer(store);

window.AP = audioPlayer; // TODO remove

const getStateFromStore = () => {
  return {
    tracks:      store.getTracks(),
    activeTrack: store.getActiveTrack()
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
    store.onChange(() => {
      this.setState(getStateFromStore());
    });
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
    if (this.state.matrixPlayActive) {
      audioPlayer.stop();
    } else {
      audioPlayer.startMatrix();
    }

    this.setState({
      tracksPlayActive: false,
      matrixPlayActive: !this.state.matrixPlayActive
    });
  },

  onTracksPlayClick() {
    if (this.state.tracksPlayActive) {
      audioPlayer.stop();
    } else {
      audioPlayer.startTracks();
    }

    this.setState({
      matrixPlayActive: false,
      tracksPlayActive: !this.state.tracksPlayActive
    });
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
            onToneClick={this.onToneClick}/>

          <Tracks
            className='layout-tracks-container'
            tracks={tracks}
            activeTrackId={this.state.activeTrack.id}
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

