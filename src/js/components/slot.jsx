import React from 'react'
import propTypes from 'js/prop_types'

const Slot = React.createClass({
  propTypes: {
    slot:    propTypes.slot.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    const { slot, onClick } = this.props;

    let className = 'slot-container '

    if (slot.active) className += 'active';

    return (
      <div className={className} onClick={onClick}></div>
    );
  }
});

export default Slot
