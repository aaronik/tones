import React from 'react'
import propTypes from 'js/prop_types'
import Slot from 'components/slot'

const TrackBody = React.createClass({
  propTypes: {
    slots:       propTypes.slots.isRequired,
    onSlotClick: React.PropTypes.func.isRequired
  },

  renderSlots() {
    return this.props.slots.map(slot => {
      const onClick = this.props.onSlotClick.bind(null, slot.id);

      return (
        <Slot key={slot.id} slot={slot} onClick={onClick}/>
      );
    });
  },

  render() {
    return (
      <div className='track-body-container'>
        {this.renderSlots()}
      </div>
    )
  }
});

export default TrackBody
