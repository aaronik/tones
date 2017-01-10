import React from 'react'
import propTypes from 'js/prop_types'

const TrackBody = React.createClass({
  propTypes: {
    slots: propTypes.slots.isRequired
  },

  render() {
    return (
      <div className='track-body-container'></div>
    )
  }
});

export default TrackBody
