import React from 'react'
import Track from 'components/track'
import AddTrackButton from 'components/add_track_button'
import propTypes from 'js/prop_types'

const Tracks = React.createClass({
  propTypes: {
    tracks:            React.PropTypes.arrayOf(propTypes.track).isRequired,
    activeTrackId:     React.PropTypes.number.isRequired,
    activeColumn:      React.PropTypes.number.isRequired,
    activeSlotId:      React.PropTypes.number.isRequired,
    onNewTrack:        React.PropTypes.func.isRequired,
    onRemoveTrack:     React.PropTypes.func.isRequired,
    onMiniMatrixClick: React.PropTypes.func.isRequired,
    onSlotClick:       React.PropTypes.func.isRequired,
    instruments:       React.PropTypes.array.isRequired, // TODO propTypes
    onInstrumentClick: React.PropTypes.func.isRequired,
    tunings:           React.PropTypes.array.isRequired, // TODO propTypes
    onTuningClick:     React.PropTypes.func.isRequired
  },

  _renderTracks () {
    return this.props.tracks.map(track => {
      const { id, tones, slots } = track;
      const isActiveTrack = id === this.props.activeTrackId;

      return <Track
        key={id}
        track={track}
        isActiveTrack={isActiveTrack}
        activeColumn={this.props.activeColumn}
        activeSlotId={this.props.activeSlotId}
        onMiniMatrixClick={this.props.onMiniMatrixClick}
        onRemoveTrack={this.props.onRemoveTrack}
        onSlotClick={this.props.onSlotClick}
        instruments={this.props.instruments}
        onInstrumentClick={this.props.onInstrumentClick}
        tunings={this.props.tunings}
        onTuningClick={this.props.onTuningClick}/>
    });
  },

  render() {
    return (
      <div className='tracks-container'>
        <AddTrackButton onClick={this.props.onNewTrack}/>
        {this._renderTracks()}
      </div>
    )
  }
});

export default Tracks
