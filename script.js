const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const teaseText = document.getElementById("teaseText");

let yesScale = 1;
let noScale = 1;

const messages = [
  "Try harder 😏",
  "You can't escape destiny 💘",
  "You are mine forever ❤️",
  "Resistance is useless 😌",
  "Just press Yes already 💖",
  "Stop playing hard to get 😜",
  "My heart choose you 💞",
  "No option available 😎"
];

noBtn.addEventListener("click", () => moveButton(true));
yesBtn.addEventListener("click", sayYes);

// Hover behavior: move repeatedly while hovered, update tease text
let hoverInterval = null;
noBtn.addEventListener("mouseenter", () => {
  // immediate move on enter
  moveButton(false);
  if (hoverInterval) clearInterval(hoverInterval);
  hoverInterval = setInterval(() => moveButton(false), 380);
});
noBtn.addEventListener("mouseleave", () => {
  if (hoverInterval) {
    clearInterval(hoverInterval);
    hoverInterval = null;
  }
});

function moveButton(applyScale = true) {

  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnWidth - 8;
  const maxY = window.innerHeight - btnHeight - 8;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  // Update tease text on every move (hover or click)
  teaseText.innerText = messages[Math.floor(Math.random() * messages.length)];

  // Only change button scales on explicit actions (clicks)
  if (applyScale) {
    yesScale += 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;

    noScale -= 0.1;
    if (noScale < 0.3) noScale = 0.3;
    noBtn.style.transform = `scale(${noScale})`;
  }
}

function sayYes() {

  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  setTimeout(() => {
    window.location.href = "card.html";
  }, 2500);
}
function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "💖";
  heart.classList.add("floating-heart");

  // Random horizontal position
  heart.style.left = Math.random() * 100 + "vw";

  // Random size
  const size = Math.random() * 20 + 15;
  heart.style.fontSize = size + "px";

  // Random animation duration
  const duration = Math.random() * 3 + 3;
  heart.style.animationDuration = duration + "s";

  document.body.appendChild(heart);

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}
// Create hearts continuously
setInterval(createHeart, 300);
