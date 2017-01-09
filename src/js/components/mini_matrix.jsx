import _          from 'underscore'
import React      from 'react'
import propTypes  from 'js/prop_types'
import MiniTone   from 'components/mini_tone'

const MiniMatrix = React.createClass({
  propTypes: {
    tones:    propTypes.binaryString.isRequired,
    onClick:  React.PropTypes.func.isRequired
  },

  miniTones() {
    let tones = this.props.tones.split('');

    return tones.map((tone, idx) => {
      return <MiniTone key={`tone-${idx}`} tone={tone}/>
    });
  },

  render() {
    let { onClick, tones } = this.props

    return (
      <div className='mini-matrix-container' onClick={onClick}>
        { this.miniTones() }
      </div>
    )
  }
});

export default MiniMatrix
