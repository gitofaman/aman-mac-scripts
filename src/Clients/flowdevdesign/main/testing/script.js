
$('.section-hero').css({
    "pointer-events": 'none'
})

var usedRadius = 140
const canvas = document.getElementById('fogCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// mouse position
let mouseX = null;
let mouseY = null;

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
  mouseX = null;
  mouseY = null;
});

function animate() {
  // draw the full fog layer
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // fog
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (mouseX !== null && mouseY !== null) {
    // cut out a circular transparent area at the mouse
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, usedRadius);
    gradient.addColorStop(0.5, 'rgba(0,0,0,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, usedRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  requestAnimationFrame(animate);
}

animate();



