import React from 'react'
import propTypes from 'js/prop_types'

const Slot = React.createClass({
  propTypes: {
    slot:      propTypes.slot.isRequired,

    // tracks are playing, this is the slot playback's on
    isPlaying: React.PropTypes.bool.isRequired,
    onClick:   React.PropTypes.func.isRequired
  },

  render() {
    const { slot, onClick } = this.props;

    let className = 'slot'

    if (slot.active)          className += ' active';
    if (this.props.isPlaying) className += ' playing';

    return <div className={className} onClick={onClick}></div>;
  }
});

export default Slot
