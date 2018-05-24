import _          from 'underscore'
import React      from 'react'
import propTypes  from 'js/prop_types'
import MiniTone   from 'components/mini_tone'

const MiniMatrix = React.createClass({
  propTypes: {
    tones:        propTypes.tones.isRequired,
    activeColumn: React.PropTypes.number.isRequired,
    onClick:      React.PropTypes.func.isRequired
  },

  miniTones() {
    const tones = this.props.tones;

    return tones.map((tone, idx) => {

      // TODO un hard-code 16, use global instead
      const inActiveColumn = (idx % 16) === this.props.activeColumn

      return <MiniTone
        key={`tone-${idx}`}
        tone={tone}
        inActiveColumn={inActiveColumn}/>
    });
  },

  render() {
    let { onClick, tones } = this.props

    return (
      <div className='mini-matrix' onClick={onClick}>
        { this.miniTones() }
      </div>
    )
  }
});

export default MiniMatrix
