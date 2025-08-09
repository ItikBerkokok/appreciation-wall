const messages = [
      "On behalf of our community, we express our heartfelt gratitude for your unwavering commitment to public health and safety. Your professionalism, courage, and compassion embody the highest ideals of your noble profession. Thank you ✨",
      "We may not wear masks and gowns, but we wear gratitude in our hearts for you always. You are not alone. The entire community stands behind you with gratitude and respect. Thank you! 😊",
      "To the heroes of Hospital Selayang, your care heals more than just bodies; it lifts hearts. Thank you for your strength, your smiles, and your endless dedication. You inspire us every day! 🌍",
      "Thank you for bringing joy and light to the lives of many. Keep fighting, and please know that you’re doing great! Although times may seem hard and days are long, your sacrifice is priceless, and you are saving lives. Hugs! 🌈",
      "Thank you for your care, strength, and sacrifices. You touch lives every day with your kindness and dedication, even when it's not easy. We see you, we appreciate you, and we are forever grateful. ❤️",
      "Thank you for your contributions to society and your selflessness in always helping those in need.👏",
      "Much love to Hospital Selayang staff. You cared when it mattered most. Thank you for your service. ☀️",
      "Hi there! Have courage and be kind to others, okay! Always stay positive and be happy! ⚡",
];

const icons = ['🧸', '🍼', '🩺', '👶', '❤', '👩‍⚕', '👨‍⚕', '🌟', '💫', '✨', '🎈', '🎉', '🌸', '🦋', '🌺'];

const container = document.getElementById('messages-container');
const list = document.getElementById('messageList');

let animationFrames = [];

function createFloatingElements() {
  // Clear any existing animations
  animationFrames.forEach(frame => cancelAnimationFrame(frame));
  animationFrames = [];
  
  // Clear existing elements
  container.innerHTML = '';

  messages.forEach((msg, index) => {
    const bubble = document.createElement('div');
    bubble.className = 'message';
    bubble.innerHTML = msg;
    container.appendChild(bubble);

    // Start all elements from the center
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    // Position first to get element dimensions
    bubble.style.left = centerX + 'px';
    bubble.style.top = centerY + 'px';
    
    // Force a layout to get actual dimensions
    bubble.offsetWidth;
    
    // Now center properly accounting for element size
    let x = centerX - (bubble.offsetWidth / 2);
    let y = centerY - (bubble.offsetHeight / 2);
    
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';

    let dx = (Math.random() - 0.5) * 2.5;
    let dy = (Math.random() - 0.5) * 2.5;

    function move() {
      x += dx;
      y += dy;
      
      // Bounce off walls with some damping
      if (x < 0 || x > window.innerWidth - bubble.offsetWidth) {
        dx *= -0.9;
        x = Math.max(0, Math.min(x, window.innerWidth - bubble.offsetWidth));
      }
      if (y < 0 || y > window.innerHeight - bubble.offsetHeight) {
        dy *= -0.9;
        y = Math.max(0, Math.min(y, window.innerHeight - bubble.offsetHeight));
      }
      
      bubble.style.left = x + 'px';
      bubble.style.top = y + 'px';
      
      const frameId = requestAnimationFrame(move);
      animationFrames.push(frameId);
    }
    
    // Start animation immediately for all elements
    const frameId = requestAnimationFrame(move);
    animationFrames.push(frameId);

    bubble.addEventListener('click', () => {
      const isFocused = bubble.classList.contains('focused');
      document.querySelectorAll('.message').forEach(el => {
        el.classList.remove('focused');
        el.classList.remove('dimmed');
      });
      if (!isFocused) {
        bubble.classList.add('focused');
        document.querySelectorAll('.message:not(.focused)').forEach(el => el.classList.add('dimmed'));
      }
    });
  });

  // Create floating icons
  icons.forEach((iconChar, index) => {
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.innerHTML = iconChar;
    container.appendChild(icon);

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    // Position first to get element dimensions
    icon.style.left = centerX + 'px';
    icon.style.top = centerY + 'px';
    
    // Force a layout to get actual dimensions
    icon.offsetWidth;
    
    // Now center properly accounting for element size
    let x = centerX - (icon.offsetWidth / 2);
    let y = centerY - (icon.offsetHeight / 2);
    
    icon.style.left = x + 'px';
    icon.style.top = y + 'px';

    let dx = (Math.random() - 0.5) * 1.5;
    let dy = (Math.random() - 0.5) * 1.5;

    function moveIcon() {
      x += dx;
      y += dy;
      
      // Bounce off walls
      if (x < 0 || x > window.innerWidth - icon.offsetWidth) {
        dx *= -1;
        x = Math.max(0, Math.min(x, window.innerWidth - icon.offsetWidth));
      }
      if (y < 0 || y > window.innerHeight - icon.offsetHeight) {
        dy *= -1;
        y = Math.max(0, Math.min(y, window.innerHeight - icon.offsetHeight));
      }
      
      icon.style.left = x + 'px';
      icon.style.top = y + 'px';
      
      const frameId = requestAnimationFrame(moveIcon);
      animationFrames.push(frameId);
    }
    
    // Start icon animation immediately
    const frameId = requestAnimationFrame(moveIcon);
    animationFrames.push(frameId);
  });
}

// Populate list view
messages.forEach(msg => {
  const li = document.createElement('li');
  li.innerHTML = msg;
  list.appendChild(li);
});

function showList() {
  // Stop animations when showing list
  animationFrames.forEach(frame => cancelAnimationFrame(frame));
  animationFrames = [];
  
  container.style.display = 'none';
  document.getElementById('list-view').style.display = 'block';
  document.getElementById('backBtn').style.display = 'block';
  document.getElementById('scrollBtn').style.display = 'none';
}

function showFloating() {
  container.style.display = 'block';
  document.getElementById('list-view').style.display = 'none';
  document.getElementById('backBtn').style.display = 'none';
  document.getElementById('scrollBtn').style.display = 'block';
  
  // Restart animations
  createFloatingElements();
}

function fadeOutPhoto() {
  document.getElementById('committee').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('committee').style.display = 'none';
    container.style.display = 'block';
    createFloatingElements();
    const audio = document.getElementById('bgm');
    audio.volume = 1.0;
    audio.muted = false;
    audio.play().catch(err => console.log('Audio blocked:', err));
  }, 1000);
}

// Handle window resize
window.addEventListener('resize', () => {
  if (container.style.display !== 'none') {
    createFloatingElements();
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  animationFrames.forEach(frame => cancelAnimationFrame(frame));
});
