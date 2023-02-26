const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pixelSize = 10;
const rows = canvas.height / pixelSize;
const cols = canvas.width / pixelSize;

let color = '#ffffff';

function drawPixel(x, y, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / pixelSize);
  const y = Math.floor((event.clientY - rect.top) / pixelSize);
  return [x, y];
}

canvas.addEventListener('click', (event) => {
  const [x, y] = getCursorPosition(canvas, event);
  socket.emit('drawPixel', {x: x, y: y, color: color});
});

const colorInput = document.getElementById('color');
colorInput.addEventListener('change', (event) => {
  color = event.target.value;
});

const socket = io('https://MALKIabdessamad.github.io');

socket.on('drawPixel', (data) => {
  drawPixel(data.x, data.y, data.color);
});
