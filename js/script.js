const newsItems = document.querySelectorAll('.news-item');
let currentIndex = 0;

// function cycleNews() {
//     const current = newsItems[currentIndex];
//     current.classList.add('exit');
//     current.classList.remove('active');
//     setTimeout(() => {
//         current.classList.remove('exit');
//         currentIndex = (currentIndex + 1) % newsItems.length;
//         const next = newsItems[currentIndex];
//         next.classList.add('active');
//     }, 500);
// }
// setInterval(cycleNews, 1000);


const Settings = {
  frameWidth: 300,
  frameHeight: 300,
  spriteColumn: 10,
  frameCount: 340,
  frameDuration: 1000 / 30, 
  gravity: 0.6,
  bounce: 0.3,
};

const canvas = document.getElementById("gremlinCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spriteSheet = new Image();
spriteSheet.src = "./images/agnes.png";
let currentFrame = 0;
let lastTime = 0;

let gremlinX = canvas.width / 2 - Settings.frameWidth / 2;
let gremlinY = 0;
let velocityY = 0;

let dragging = false;
let offsetX = 0;
let offsetY = 0;

spriteSheet.onload = () => {
  requestAnimationFrame(loop);
};

canvas.addEventListener("mousedown", (e) => {
  if (
    e.clientX >= gremlinX &&
    e.clientX <= gremlinX + Settings.frameWidth &&
    e.clientY >= gremlinY &&
    e.clientY <= gremlinY + Settings.frameHeight
  ) {
    dragging = true;
    offsetX = e.clientX - gremlinX;
    offsetY = e.clientY - gremlinY;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (dragging) {
    gremlinX = e.clientX - offsetX;
    gremlinY = e.clientY - offsetY;
    velocityY = 0; 
  }
});

canvas.addEventListener("mouseup", () => {
  dragging = false;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function playAnimation(time) {
  if (time - lastTime > Settings.frameDuration) {
    const col = currentFrame % Settings.spriteColumn;
    const row = Math.floor(currentFrame / Settings.spriteColumn);

    const sx = col * Settings.frameWidth;
    const sy = row * Settings.frameHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!dragging) {
      velocityY += Settings.gravity;
      gremlinY += velocityY;

      const bottom = canvas.height - Settings.frameHeight;
      if (gremlinY > bottom) {
        gremlinY = bottom;
        velocityY *= -Settings.bounce;
      }
    }

    // Draw the current frame
    ctx.drawImage(
      spriteSheet,
      sx, sy, Settings.frameWidth, Settings.frameHeight,
      gremlinX, gremlinY, Settings.frameWidth, Settings.frameHeight
    );

    currentFrame = (currentFrame + 1) % Settings.frameCount;
    lastTime = time;
  }
}

function loop(time) {
  playAnimation(time);
  requestAnimationFrame(loop);
}


let isPlaying = false;
const audio = new Audio('./images/bakushin.mp3'); 

  function togglePulse(element) {  
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
  }