console.log('javascript be workin!');

const initCanvas = () => {
  const canvas  = document.getElementById('canvas'),
        context = canvas.getContext('2d');

  context.beginPath();
  context.rect(50,50,100,100);
  context.fill();
}
