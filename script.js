const messages = [
  "Thank you for making this place brighter! ✨",
  "Your smile is contagious and uplifting! 😊",
  "Your dedication means the world! 🌍",
  "You bring joy to everyone around you! 🌈",
  "Your kindness touches so many hearts! ❤",
  "Thank you for your amazing work! 👏",
  "You make every day better! ☀",
  "Your positive energy is incredible! ⚡",
  "We appreciate everything you do! 🙏",
  "You're absolutely wonderful! 🌟",
  "Your compassion knows no bounds! 🤗",
  "Thank you for being you! 💫",
  "You inspire us all! 🚀",
  "Your hard work doesn't go unnoticed! 👀",
  "You're a true blessing! 🙌",
  "Your patience is remarkable! ⏰",
  "Thank you for your gentle care! ��",
  "You light up the room! 💡",
  "Your wisdom guides us all! 🦉",
  "You're making a real difference! 📈",
  "Thank you for your endless support! 🔗",
  "Your laughter is medicine! 💊",
  "You're an amazing teammate! 🤝",
  "Your creativity is inspiring! 🎨",
  "Thank you for your leadership! 👑",
  "You bring out the best in others! ⭐",
  "Your generosity is heartwarming! 💝",
  "You're a ray of sunshine! 🌞",
  "Thank you for your understanding! 🤝",
  "Your strength is admirable! 💪",
  "You make the impossible possible! 🎯",
  "Your friendship means everything! 👫",
  "Thank you for your trust! 🔐",
  "You're incredibly talented! 🎭",
  "Your empathy is beautiful! 🦋",
  "You make work feel like play! 🎮",
  "Thank you for your honesty! 💎",
  "Your humor brightens our days! 😄",
  "You're a natural born leader! 🦅",
  "Your reliability is amazing! ⚓",
  "Thank you for going above and beyond! 🚁",
  "You're truly one of a kind! 🦄",
  "Your optimism is contagious! 🌈",
  "You make everyone feel valued! 💰",
  "Thank you for your innovation! 💡",
  "Your courage inspires us! 🦁",
  "You're a problem solver extraordinaire! 🧩",
  "Your thoughtfulness never goes unnoticed! 💭",
  "Thank you for your mentorship! 🎓",
  "You're absolutely irreplaceable! 💎"
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