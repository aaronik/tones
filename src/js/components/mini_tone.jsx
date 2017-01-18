import React from 'react'
import propTypes from 'js/prop_types'

const MiniTone = React.createClass({
  propTypes: {
    tone: propTypes.tone.isRequired,
    inActiveColumn: React.PropTypes.bool.isRequired
  },

  render() {
    let className = 'mini-tone';

    if (this.props.tone.active)    className += ' active';
    if (this.props.inActiveColumn) className += ' column-active';

    return <div className={className}></div>;
  }
});

export default MiniTone
