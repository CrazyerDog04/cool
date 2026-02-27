$(window).on('scroll', function () {
  const windowHeight = $(window).height();
  const scroll = $(window).scrollTop();

  $('section').each(function () {
    const $this = $(this);
    // Only process if it doesn't already have the class
    if (!$this.hasClass('animated')) {
      const top = $this.offset().top;
      if (scroll + windowHeight - 100 > top) {
        $this.addClass('animated fadeInUp');
      }
    }
  });

  if (scroll > 300) {
    $('#scrollTopBtn').fadeIn();
  } else {
    $('#scrollTopBtn').fadeOut();
  }
});

$('#scrollTopBtn').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, 600);
});

const canvas = document.getElementById('laserCanvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();

const lasers = [];

function createLaser() {
  const g = Math.floor(Math.random() * 155 + 100);
  const b = 255 - (g - 100);
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 200, // Start slightly off-screen
    length: Math.random() * 100 + 100,
    speed: Math.random() * 5 + 5,
    color: `rgba(0, ${g}, ${b}, 0.5)` // Slightly higher opacity for visibility
  };
}

function updateLasers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i];
    laser.y -= laser.speed;

    ctx.beginPath();
    ctx.strokeStyle = laser.color;
    ctx.lineWidth = 2;
    ctx.moveTo(laser.x, laser.y);
    ctx.lineTo(laser.x, laser.y - laser.length);
    ctx.stroke();

    if (laser.y + laser.length < 0) {
      lasers.splice(i, 1);
    }
  }

  if (Math.random() < 0.2) lasers.push(createLaser());
  requestAnimationFrame(updateLasers);
}

updateLasers();

window.addEventListener('resize', setCanvasSize);
