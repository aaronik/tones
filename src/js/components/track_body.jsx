import React from 'react'
import propTypes from 'js/prop_types'
import Slot from 'components/slot'

const TrackBody = React.createClass({
  propTypes: {
    slots:         propTypes.slots.isRequired,
    activeSlotId:  React.PropTypes.number.isRequired,
    onSlotClick:   React.PropTypes.func.isRequired
  },

  renderSlots() {
    return this.props.slots.map(slot => {

      const onClick = this.props.onSlotClick.bind(null, slot.id);
      const isPlaying = (this.props.activeSlotId === slot.id);

      return (
        <Slot
          key={slot.id}
          slot={slot}
          onClick={onClick}
          isPlaying={isPlaying} />
      );
    });
  },

  render() {
    return (
      <div className='track-body'>
        {this.renderSlots()}
      </div>
    )
  }
});

export default TrackBody
