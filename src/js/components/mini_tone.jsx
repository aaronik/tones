import React from 'react'
import propTypes from 'js/prop_types'

const MiniTone = React.createClass({
  propTypes: {
    tone: propTypes.bit.isRequired
  },

  render() {
    let className = 'mini-tone ';

    if (this.props.tone == '1') {
      className += 'mini-tone-active';
    }

    return <div className={className}></div>;
  }
});

export default MiniTone
