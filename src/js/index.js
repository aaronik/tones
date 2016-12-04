console.log('javascript be workin!');

require('../sass/canvas.scss');

const initCanvas = () => {
  const canvas  = document.getElementById('canvas');

  return canvas.getContext('2d');
}

const ctx = initCanvas();
