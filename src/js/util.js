// Random helper functions

// build array of 1 to n ascending by 1
// TODO: test only take num, negative
export const oneTo = (n) => {
  return [...new Array(n).keys()]
}

// TODO: test
export const flatten = (nestedArray) => {
  return nestedArray.reduce((flatArray, el) => {
    return flatArray.concat(el);
  }, []);
}

// print messages prettily
export const log = (...args) => {
  console.log('Tones: ', ...args);
}
