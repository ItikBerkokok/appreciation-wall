const container = document.getElementById("floating-messages-container");
const messages = [];

for (let i = 1; i <= 100; i++) {
  messages.push(`👨‍⚕️👩‍⚕️🩷 Appreciation message #${i}`);
}

function createFloatingMessage() {
  const msg = document.createElement("div");
  msg.className = "floating-message";

  const message = messages[Math.floor(Math.random() * messages.length)];
  msg.textContent = message;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const startX = screenWidth / 2 + (Math.random() * 100 - 50); // Center start X ±50px
  const startY = screenHeight / 2 + (Math.random() * 100 - 50); // Center start Y ±50px

  msg.style.left = `${startX}px`;
  msg.style.top = `${startY}px`;

  msg.addEventListener("click", () => {
    msg.remove();
    createFloatingMessage(); // Create a new one
  });

  container.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 10000);
}

setInterval(createFloatingMessage, 1500);

function scrollToMessages() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}
