import React from 'react'

// function invalidPropErrStr (propName, componentName, expectedType) {

//   `Invalid prop of type ${propName} supplied to ${componentName}, expected ${expectedType}.`
// }

function isBinaryString (string) {
  if (typeof string != 'string') return false;

  return string.split('').every(char => {
    return (char == '0' || char == '1');
  });
}

function binaryStringValidator (props, propName, componentName) {
  if (!isBinaryString(props[propName])) {
    return new Error();
  }
}

// wrap in React.oneOfType for .isRequired
var binaryString = React.PropTypes.oneOfType([binaryStringValidator]);

var track = React.PropTypes.shape({
  id: React.PropTypes.string,
  tones: binaryString,
  slots: binaryString
});

var bit = React.PropTypes.oneOf(['1', '0']);

export default {
  binaryString: binaryString,
  track: track,
  bit: bit
};
