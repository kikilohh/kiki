const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    this.initParticles();
  }

  initParticles() {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 2 + 1,
      });
    }
  }

  update() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.alpha -= 0.02;
    });
    this.particles = this.particles.filter((p) => p.alpha > 0);
  }

  draw() {
    this.particles.forEach((particle) => {
      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

const fireworks = [];
const colors = ['#ff6666', '#ffcc66', '#66ff66', '#66ccff', '#cc66ff'];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = colors[Math.floor(Math.random() * colors.length)];
  fireworks.push(new Firework(x, y, color));
}

let textAlpha = 0; // Transparansi awal untuk teks
let fadeIn = true; // Status animasi fade-in teks

function drawText() {
  ctx.globalAlpha = textAlpha; // Terapkan alpha ke teks
  ctx.fillStyle = '#ffffff';
  ctx.font = '60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Happy New Year!', canvas.width / 2, canvas.height / 2);

  // Animasi teks: fade-in lalu tetap terlihat
  if (fadeIn) {
    textAlpha += 0.01; // Tingkatkan transparansi
    if (textAlpha >= 1) fadeIn = false; // Hentikan fade-in saat alpha penuh
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.particles.length === 0) {
      fireworks.splice(index, 1);
    }
  });

  // Tambahkan teks di tengah canvas
  drawText();

  requestAnimationFrame(animate);
}

// Jalankan kembang api dan animasi
setInterval(createFirework, 500);
animate();
