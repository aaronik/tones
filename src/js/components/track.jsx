import React from 'react'
import MiniMatrix from 'components/mini_matrix'
import TrackRemoveButton from 'components/track_remove_button'
import TrackBody from 'components/track_body'
import propTypes from 'js/prop_types'

const Track = React.createClass({
  propTypes: {
    id:                React.PropTypes.string.isRequired,
    tones:             propTypes.tones.isRequired,
    slots:             propTypes.slots.isRequired,
    onRemoveTrack:     React.PropTypes.func.isRequired,
    onMiniMatrixClick: React.PropTypes.func.isRequired,
    onSlotClick:       React.PropTypes.func.isRequired
  },

  render() {
    const { onMiniMatrixClick, id, tones, onRemoveTrack, slots } = this.props;
    const onSlotClick = this.props.onSlotClick.bind(null, id);

    return (
      <div className='track-container'>
        <MiniMatrix tones={tones} onClick={onMiniMatrixClick.bind(null, id)}/>
        <TrackBody slots={slots} onSlotClick={onSlotClick}/>
        <TrackRemoveButton onClick={onRemoveTrack.bind(null, id)}/>
      </div>
    )
  }
});

export default Track
