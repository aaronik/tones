// I use prop types to enhance React's type system.
// I'd say I hope y'all do too but it's entirely
// possible using typescript nullifies the need.

import React from 'react'

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
