import React from 'react'
import propTypes from 'js/prop_types'

const Tone = React.createClass({
  propTypes: {
    id:      React.PropTypes.string.isRequired,
    tone:    propTypes.tone.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    let className = 'tone-container ';

    if (this.props.tone.active) {
      className += 'tone-container-active';
    }

    return <div
      className={className}
      onClick={this.props.onClick.bind(null, this.props.id)}>
    </div>;
  }
});

export default Tone
