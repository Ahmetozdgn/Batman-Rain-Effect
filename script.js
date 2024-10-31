const rainCanvas = document.getElementById("rain");
const ctxRain = rainCanvas.getContext("2d");
const rainCount = 500;
const rainArray = [];
let w, h;

const init = () => {
  w = rainCanvas.width = window.innerWidth;
  h = rainCanvas.height = window.innerHeight;
  window.addEventListener("resize", onResizeHandler);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.framerate = 60;
  populateRain();
};

const random = (min, max) => {
  return min + Math.random() * (max - min + 1);
};

const onResizeHandler = () => {
  w = rainCanvas.width = window.innerWidth;
  h = rainCanvas.height = window.innerHeight;
};

const populateRain = () => {
  for (let i = 0; i < rainCount; i++) {
    rainArray.push({
      x: Math.random() * w * 1.2,
      y: Math.random() * h,
      width: random(1, 1),
      length: Math.random() * 4,
      opacity: random(0.1, 0.3),
      speedX: random(-1, -3),
      speedY: random(7, 15),
    });
  }
};

const moveRaindrops = () => {
  rainArray.forEach((raindrop) => {
    raindrop.x += raindrop.speedX;
    raindrop.y += raindrop.speedY;
    if (raindrop.y > h) {
      raindrop.x = Math.random() * w * 1.2;
      raindrop.y = -20;
    }
  });
};

const drawRaindrops = () => {
  rainArray.forEach((raindrop) => {
    const startpoint = { x: raindrop.x, y: raindrop.y };
    const endpoint = {
      x: raindrop.x + raindrop.speedX * raindrop.length,
      y: raindrop.y + raindrop.speedY * raindrop.length,
    };
    const grad = ctxRain.createLinearGradient(
      startpoint.x,
      startpoint.y,
      endpoint.x,
      endpoint.y
    );
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(1, `rgba(255,255,255,${raindrop.opacity})`);

    ctxRain.beginPath();
    ctxRain.moveTo(startpoint.x, startpoint.y);
    ctxRain.lineTo(endpoint.x, endpoint.y);
    ctxRain.strokeStyle = grad;
    ctxRain.lineWidth = raindrop.width;
    ctxRain.lineCap = "round";
    ctxRain.stroke();
  });
};

const updateRain = () => {
  ctxRain.clearRect(0, 0, w, h);
  moveRaindrops();
  drawRaindrops();
};

const handleTick = (ev) => {
  if (!ev.paused) {
    updateRain();
  }
};

init();
