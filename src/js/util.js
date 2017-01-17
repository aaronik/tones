//
// Random helper functions
//

let util = {};

// build array of 1 to n ascending by 1
// TODO: test only take num, negative
util.oneTo = (n) => {
  return [...new Array(n).keys()];
};

// TODO: test
util.flatten = (nestedArray) => {
  return nestedArray.reduce((flatArray, el) => {
    return flatArray.concat(el);
  }, []);
};

// print messages prettily
util.log = (...args) => {
  console.log('Tones: ', ...args);
};

export default util;
