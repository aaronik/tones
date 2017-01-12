import React from 'react'
import Track from 'components/track'
import AddTrackButton from 'components/add_track_button'
import propTypes from 'js/prop_types'

const Tracks = React.createClass({
  propTypes: {
    tracks:            React.PropTypes.arrayOf(propTypes.track).isRequired,
    onNewTrack:        React.PropTypes.func.isRequired,
    onRemoveTrack:     React.PropTypes.func.isRequired,
    onMiniMatrixClick: React.PropTypes.func.isRequired,
    onSlotClick:       React.PropTypes.func.isRequired,
    instruments:       React.PropTypes.array.isRequired, // TODO propTypes
    onInstrumentClick: React.PropTypes.func.isRequired
  },

  _renderTracks () {
    return this.props.tracks.map(track => {
      const { id, tones, slots } = track;

      return <Track
        key={id}
        track={track}
        onMiniMatrixClick={this.props.onMiniMatrixClick}
        onRemoveTrack={this.props.onRemoveTrack}
        onSlotClick={this.props.onSlotClick}
        instruments={this.props.instruments}
        onInstrumentClick={this.props.onInstrumentClick}/>
    });
  },

  render() {
    return (
      <div className='tracks-container'>
        <AddTrackButton
          onClick={this.props.onNewTrack}
          instruments={this.props.instruments}/>
        {this._renderTracks()}
      </div>
    )
  }
});

export default Tracks
