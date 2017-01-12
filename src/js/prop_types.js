import React from 'react'

// function invalidPropErrStr (propName, componentName, expectedType) {

//   `Invalid prop of type ${propName} supplied to ${componentName}, expected ${expectedType}.`
// }

const tone = React.PropTypes.shape({
  id:     React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired
});

const tones = React.PropTypes.arrayOf(tone);

const slot = React.PropTypes.shape({
  id:     React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired
});

const slots = React.PropTypes.arrayOf(slot);

const track = React.PropTypes.shape({
  id:     React.PropTypes.number.isRequired,
  tones:  tones,
  slots:  slots
});

export default { track, tone, tones, slot, slots };
