import React from 'react'

const AddTrackButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className='add-track-button-container' onClick={this.props.onClick}>
        <i className='fa fa-plus'></i>
      </div>
    )
  }
});

export default AddTrackButton
