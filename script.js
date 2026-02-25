// ===== MATRIX RAIN BACKGROUND =====
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\~`ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθ';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff41';
  ctx.font = fontSize + 'px Share Tech Mono, monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== TERMINAL TYPING EFFECT =====
const command = 'cat perfil.txt';
const cmdEl = document.getElementById('typed-cmd');
const outputEl = document.getElementById('terminal-output');
let cmdIndex = 0;

function typeCommand() {
  if (cmdIndex < command.length) {
    cmdEl.textContent += command[cmdIndex];
    cmdIndex++;
    setTimeout(typeCommand, 80);
  } else {
    // Show output after typing
    setTimeout(() => {
      outputEl.classList.remove('hidden');
      // Animate each line
      const lines = outputEl.querySelectorAll('p');
      lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
        setTimeout(() => {
          line.style.transition = 'all 0.3s ease';
          line.style.opacity = '1';
          line.style.transform = 'translateX(0)';
        }, i * 150);
      });
    }, 300);
  }
}

// Start typing after page load
setTimeout(typeCommand, 1200);

// ===== HERO SUBTITLE TYPEWRITER =====
const subtitles = [
  'Estudiante de Informática 💻',
  'Aprendiendo Hacking Ético 🔐',
  'Fan de Linux & Ubuntu 🐧',
  'Aprendiendo Python 🐍',
  'Gamer & Amante de la Tech 🎮'
];

let subtitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const subtitleEl = document.getElementById('subtitle-text');

function typeSubtitle() {
  const current = subtitles[subtitleIndex];

  if (isDeleting) {
    subtitleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    subtitleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    subtitleIndex = (subtitleIndex + 1) % subtitles.length;
    speed = 400;
  }

  setTimeout(typeSubtitle, speed);
}

setTimeout(typeSubtitle, 2000);

// ===== INTERSECTION OBSERVER - SKILL CARDS =====
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.getAttribute('data-delay')) || 0;

      setTimeout(() => {
        card.classList.add('visible');
        // Animate skill bar
        const bar = card.querySelector('.skill-bar');
        if (bar) {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        }
      }, delay);

      skillObserver.unobserve(card);
    }
  });
}, { threshold: 0.2 });

skillCards.forEach(card => skillObserver.observe(card));

// ===== INTERSECTION OBSERVER - GENERAL FADE IN =====
const fadeElements = document.querySelectorAll('.interest-card, .stat-item, .info-card, .tools-section');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  fadeObserver.observe(el);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    formSuccess.style.animation = 'fadeIn 0.5s ease';
  }, 1500);
});

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.style.color = '';
    link.style.textShadow = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--green)';
      link.style.textShadow = '0 0 8px var(--green)';
    }
  });
});

// ===== GLITCH EFFECT ON HOVER =====
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
  glitchEl.addEventListener('mouseenter', () => {
    glitchEl.style.animation = 'none';
    setTimeout(() => {
      glitchEl.style.animation = '';
    }, 100);
  });
}

// ===== CURSOR TRAIL EFFECT =====
const trail = [];
const trailLength = 8;

for (let i = 0; i < trailLength; i++) {
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    width: ${6 - i * 0.5}px;
    height: ${6 - i * 0.5}px;
    background: rgba(0, 255, 65, ${0.6 - i * 0.07});
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
  `;
  document.body.appendChild(dot);
  trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  trail.forEach(t => { t.el.style.display = 'block'; });
});

function animateTrail() {
  let x = mouseX, y = mouseY;
  trail.forEach((t, i) => {
    const prevX = t.x;
    const prevY = t.y;
    t.x += (x - prevX) * 0.3;
    t.y += (y - prevY) * 0.3;
    t.el.style.left = t.x - 3 + 'px';
    t.el.style.top = t.y - 3 + 'px';
    x = prevX;
    y = prevY;
  });
  requestAnimationFrame(animateTrail);
}

animateTrail();

// ===== CONSOLE EASTER EGG =====
console.log('%c[BRAYAN TORRES]', 'color: #00ff41; font-size: 20px; font-weight: bold; font-family: monospace;');
console.log('%cEthical Hacker | Developer | Linux Enthusiast', 'color: #00e5ff; font-family: monospace;');
console.log('%c> Si puedes leer esto, eres uno de los nuestros 😏', 'color: #94a3b8; font-family: monospace;');
