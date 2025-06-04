$(window).on('scroll', function () {
  $('section').each(function () {
    const top = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll + windowHeight - 100 > top) {
      $(this).addClass('animated fadeInUp');
    }
  });

  if ($(this).scrollTop() > 300) {
    $('#scrollTopBtn').fadeIn();
  } else {
    $('#scrollTopBtn').fadeOut();
  }
});

$('#scrollTopBtn').on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 600);
});

// 激光動畫
const canvas = document.getElementById('laserCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const lasers = [];

function createLaser() {
  const g = Math.floor(Math.random() * 155 + 100);
  const b = Math.floor(255 - (g - 100));
  return {
    x: Math.random() * canvas.width,
    y: canvas.height,
    length: Math.random() * 100 + 100,
    speed: Math.random() * 5 + 5,
    color: `rgba(0, ${g}, ${b}, 0.1)`
  };
}


function drawLaser(laser) {
  ctx.beginPath();
  ctx.strokeStyle = laser.color;
  ctx.lineWidth = 2;
  ctx.moveTo(laser.x, laser.y);
  ctx.lineTo(laser.x, laser.y - laser.length);
  ctx.stroke();
}

function updateLasers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lasers.forEach((laser, i) => {
    laser.y -= laser.speed;
    drawLaser(laser);
    if (laser.y + laser.length < 0) lasers.splice(i, 1);
  });
  if (Math.random() < 0.2) lasers.push(createLaser());
  requestAnimationFrame(updateLasers);
}
updateLasers();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});