import React from 'react'
import Track from 'components/track'
import AddTrackButton from 'components/add_track_button'
import propTypes from 'js/prop_types'
import actions from 'js/actions'

const Tracks = React.createClass({
  propTypes: {
    tracks: React.PropTypes.arrayOf(propTypes.track).isRequired,
    onNewTrack: React.PropTypes.func.isRequired,
    onRemoveTrack: React.PropTypes.func.isRequired,
    onMiniMatrixClick: React.PropTypes.func.isRequired
  },

  _renderTracks () {
    return this.props.tracks.map( (track) => {
      let { id, tones, slots } = track;
      return <Track
        key={id}
        id={id}
        tones={tones}
        slots={slots}
        onMiniMatrixClick={this.props.onMiniMatrixClick}
        onRemoveTrack={this.props.onRemoveTrack}/>
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
