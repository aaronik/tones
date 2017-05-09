//
// Random helper functions
//

let util = {};

// build array of 0 to n - 1 ascending by 1
util.zeroTo = (n) => {
  return [...new Array(n).keys()];
};

// print messages prettily
util.log = (...args) => {
  console.log('Tones: ', ...args);
};

export default util;
