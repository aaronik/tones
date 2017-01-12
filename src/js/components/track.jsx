import React from 'react'
import MiniMatrix from 'components/mini_matrix'
import TrackRemoveButton from 'components/track_remove_button'
import TrackBody from 'components/track_body'
import InstrumentSelector from 'components/instrument_selector'
import propTypes from 'js/prop_types'

const Track = React.createClass({
  propTypes: {
    track:             propTypes.track.isRequired,
    onRemoveTrack:     React.PropTypes.func.isRequired,
    onMiniMatrixClick: React.PropTypes.func.isRequired,
    onSlotClick:       React.PropTypes.func.isRequired,
    instruments:       React.PropTypes.array.isRequired, // TODO propTypes
    onInstrumentClick: React.PropTypes.func.isRequired
  },

  render() {
    const { onMiniMatrixClick, onRemoveTrack, instruments } = this.props;
    const { id, tones, slots } = this.props.track;

    const onSlotClick       = this.props.onSlotClick.bind(null, id);
    const onInstrumentClick = this.props.onInstrumentClick.bind(null, id);

    return (
      <div className='track-container'>

        <MiniMatrix tones={tones} onClick={onMiniMatrixClick.bind(null, id)}/>

        <InstrumentSelector
          activeInstrumentId={this.props.track.instrument.id}
          instruments={instruments}
          onInstrumentClick={onInstrumentClick}/>

        <TrackBody slots={slots} onSlotClick={onSlotClick}/>

        <TrackRemoveButton onClick={onRemoveTrack.bind(null, id)}/>

      </div>
    )
  }
});

export default Track
