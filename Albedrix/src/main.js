import './style.css';

window.history.scrollRestoration = 'manual';

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

  /* LOADING SCREEN */
  const loader = document.querySelector('.loader-wrapper');
  const loaderBar = document.querySelector('.loader-bar');
  let loadProgress = 0;

  const loadingInterval = setInterval(() => {
    loadProgress += Math.random() * 12;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadingInterval);
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        loader.style.transition = '1s ease';
      }, 500);
    }
    loaderBar.style.width = loadProgress + '%';
  }, 120);

  /* SCROLL PROGRESS BAR */
  const progressBar = document.querySelector('.scroll-progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
  }, { passive: true });

  /* NAVBAR GLASS EFFECT */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* THEME TOGGLE */
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });

  /* HERO TYPING EFFECT */
  const typingElement = document.querySelector('.typing-text');
  const words = ['Embedded Systems', 'Edge AI', 'IoT Innovation', 'Intelligent Engineering'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (!deleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeEffect, deleting ? 50 : 100);
  }
  typeEffect();

  /* SMOOTH SCROLL LINKS */
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu on link click
        navMenu.classList.remove('mobile-open');
        mobileBtn.classList.remove('active');
      }
    });
  });

  /* SCROLL REVEAL ANIMATIONS */
  const revealElements = document.querySelectorAll(
    '.service-card, .about-card, .project-card, .tech-card, .social-card'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => {
    el.classList.add('hidden-reveal');
    revealObserver.observe(el);
  });

  /* FLOATING PARTICLES */
  const particlesContainer = document.querySelector('.particles-container');
  function createParticle() {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.opacity = Math.random();
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 20000);
  }
  setInterval(createParticle, 250);

  /* HERO PARALLAX — desktop only */
  // const heroSection = document.querySelector('.hero-section');
  // window.addEventListener('mousemove', (e) => {
  //   if (window.innerWidth < 1024) return;
  //   const x = (window.innerWidth / 2 - e.clientX) / 40;
  //   const y = (window.innerHeight / 2 - e.clientY) / 40;
  //   heroSection.style.transform = `translate(${x}px, ${y}px)`;
  });

  /* MOBILE MENU TOGGLE */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('mobile-open');
    mobileBtn.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      navMenu.classList.remove('mobile-open');
      mobileBtn.classList.remove('active');
    }
  });

  /* PROJECT CARD HOVER GLOW */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,43,43,0.15), rgba(255,255,255,0.03))`;
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });

  /* ACTIVE NAV LINK ON SCROLL */
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

});
