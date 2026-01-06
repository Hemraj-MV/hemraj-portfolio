/* GAME BACKGROUND */
const canvas = document.getElementById("game-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const isMobile = window.innerWidth < 768;
const COUNT = isMobile ? 60 : 140;
const nodes = [];

for (let i = 0; i < COUNT; i++) {
  nodes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 1
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  const light = document.body.classList.contains("light");

  nodes.forEach((a, i) => {
    a.x += a.vx;
    a.y += a.vy;
    if (a.x < 0 || a.x > w) a.vx *= -1;
    if (a.y < 0 || a.y > h) a.vy *= -1;

    ctx.fillStyle = light ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.strokeStyle = light
          ? "rgba(0,0,0,0.08)"
          : "rgba(255,255,255,0.08)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(draw);
}
draw();

/* THEME TOGGLE */
const toggleBtn = document.getElementById("theme-toggle");
const saved = localStorage.getItem("theme");

if (saved === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

/* AI DEMO WITH TYPING */
let typing;
function typeText(el, text, speed = 30) {
  clearInterval(typing);
  el.textContent = "";
  let i = 0;
  typing = setInterval(() => {
    if (i < text.length) el.textContent += text[i++];
    else clearInterval(typing);
  }, speed);
}

function runAIDemo() {
  const input = document.getElementById("ai-input").value.toLowerCase();
  const out = document.getElementById("ai-output");

  let res =
    input.includes("rag") ? "RAG grounds AI responses using reliable retrieved data."
  : input.includes("ai") ? "I use AI only where it adds real system value."
  : input.includes("system") ? "I design systems by separating UI, logic, data, and intelligence."
  : input.includes("project") ? "I start from the problem, then choose the right tools."
  : input.includes("internship") ? "My internship involved real-world billing and internal systems."
  : "Try: ai, rag, system, project, internship";

  typeText(out, res);
}
