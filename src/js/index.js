require('sass/canvas');

const initCanvas = () => {
  const canvas  = document.getElementById('canvas');
  return canvas.getContext('2d');
}

const ctx = initCanvas();
