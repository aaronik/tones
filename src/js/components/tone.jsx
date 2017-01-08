import React from 'react'

const Tone = React.createClass({
  propTypes: {
    tone: React.PropTypes.oneOf(['0', '1']).isRequired,
    onClick: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired
  },

  render() {
    let className = 'tone-container ';

    if (this.props.tone == '1') {
      className += 'tone-container-active';
    }

    return <div
      className={className}
      onClick={this.props.onClick.bind(null, this.props.id)}>
    </div>;
  }
});

export default Tone
