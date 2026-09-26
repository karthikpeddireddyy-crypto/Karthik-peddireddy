/* ==========================================================================
   KARTHIK PEDDIRREDDY — INTERACTIVE JAVASCRIPT ENGINE
   Canvas Frame Scrubbing · Custom Cursor · Filter System · Project Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeroCanvasScrubber();
  initNavbarScroll();
  initMobileMenu();
  renderPortfolio();
  
  initScrollReveals();
  initAudioFeedback();
});

/* --------------------------------------------------------------------------
   1. CUSTOM CURSOR ENGINE
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('cursorFollower');
  const cursorLabel = document.getElementById('cursorLabel');

  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant update dot
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Smooth lerp for follower circle
  function renderCursor() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Attach hover states to elements with data-cursor
  const interactiveElements = document.querySelectorAll('[data-cursor], a, button, .project-card, .motion-card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-active');
      const cursorText = el.getAttribute('data-cursor') || 'VIEW';
      if (cursorLabel) cursorLabel.textContent = cursorText;
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
      if (cursorLabel) cursorLabel.textContent = '';
    });
  });
}

/* --------------------------------------------------------------------------
   2. HERO CANVASS SCROLL SCRUBBING ENGINE
   -------------------------------------------------------------------------- */
function initHeroCanvasScrubber() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const frameCount = 124;
  const images = [];
  let loadedFramesCount = 0;
  const frameCounterWidget = document.getElementById('frameCounterWidget');

  // Format frame path: ./video_frames_30fps/frame_000001.png
  function getFramePath(index) {
    const padded = index.toString().padStart(6, '0');
    return `./video_frames_30fps/frame_${padded}.png`;
  }

  // Preload all 124 frames into memory for ultra-smooth scrubbing
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    images.push(img);

    img.onload = () => {
      loadedFramesCount++;
      if (i === 1) {
        resizeCanvas();
        renderFrame(0);
      }
    };
  }

  function renderFrame(index) {
    const safeIndex = Math.max(0, Math.min(frameCount - 1, index));
    const img = images[safeIndex];

    if (img && img.complete && img.naturalWidth !== 0) {
      // Scale cover
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
      );

      if (frameCounterWidget) {
        const frameNumStr = (safeIndex + 1).toString().padStart(3, '0');
        frameCounterWidget.textContent = `FRAME ${frameNumStr} / ${frameCount}`;
      }
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateFrameOnScroll();
  }

  function updateFrameOnScroll() {
    const heroWrapper = document.getElementById('heroWrapper');
    if (!heroWrapper) return;

    const rect = heroWrapper.getBoundingClientRect();
    const totalScrollableHeight = heroWrapper.offsetHeight - window.innerHeight;
    
    if (totalScrollableHeight <= 0) return;

    // Calculate fraction scrolled inside heroWrapper
    let scrollFraction = -rect.top / totalScrollableHeight;
    scrollFraction = Math.max(0, Math.min(1, scrollFraction));

    const targetFrameIndex = Math.floor(scrollFraction * (frameCount - 1));
    requestAnimationFrame(() => renderFrame(targetFrameIndex));
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', updateFrameOnScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   3. STICKY NAVBAR SCROLL STATE
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. MOBILE MENU OVERLAY TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const overlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    overlay.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   5. DYNAMIC PORTFOLIO SYSTEM
   -------------------------------------------------------------------------- */
const portfolioProjects = [
  {
    categoryTitle: "Social Reel",
    categoryDesc: "Short-form vertical content crafted for high viewer retention and viral engagement.",
    items: [
      {
        id: "social-1",
        title: "Social Reel Edit",
        category: "Social Reel",
        video: "social reel.mp4",
        year: "2026",
        role: "Video Editor",
        description: "Fast-paced vertical reel designed for maximum retention on Instagram and TikTok.",
        approach: "Engineered frame-accurate cuts on beat drops with engaging hooks.",
        editing: "Rapid pace editing, seamless transitions, dynamic zoom-ins.",
        motion: "Kinetic text overlays and motion tracking stickers.",
        aspect: "aspect-vertical"
      }
    ]
  },
  {
    categoryTitle: "Motion Design",
    categoryDesc: "Kinetic typography, animated elements, and visual transitions that bring ideas to life.",
    items: [
      {
        id: "motion-1",
        title: "TEDx Ticket Promo",
        category: "Motion Design",
        video: "Book Tedx ticket .mp4",
        year: "2026",
        role: "Motion Designer",
        description: "Dynamic motion graphics and kinetic typography for event promotion.",
        approach: "Crafted fluid typography motion to emphasize the event messaging.",
        editing: "Rhythmic timing matching custom soundscapes.",
        motion: "Custom 3D typography integration and animated callouts.",
        aspect: "aspect-landscape"
      }
    ]
  },
  {
    categoryTitle: "Promotional",
    categoryDesc: "High-impact commercial promos highlighting brand aesthetics and kinetic messaging.",
    items: [
      {
        id: "promo-1",
        title: "Xcelerate Launch",
        category: "Promotional",
        video: "xcelerate.mp4",
        year: "2026",
        role: "Video Editor",
        description: "Sleek product showcase combining fast-paced edits with custom sound design.",
        approach: "Combined macro shot edits with elegant slow-motion cuts.",
        editing: "Color grading for deep contrast, smooth speed ramping.",
        motion: "Sleek specs overlay graphics and animated logo reveal.",
        aspect: "aspect-landscape"
      }
    ]
  }
];

function renderPortfolio() {
  const container = document.getElementById('dynamic-portfolio-container');
  if (!container) return;
  
  let html = '';
  portfolioProjects.forEach(cat => {
    html += `<div class="portfolio-category-block">
      <div class="category-header">
        <h3 class="category-title">${cat.categoryTitle}</h3>
        <p class="category-desc">${cat.categoryDesc}</p>
      </div>
      <div class="category-grid">`;
      
    cat.items.forEach(item => {
      html += `
        <article class="portfolio-item ${item.aspect}" data-project-id="${item.id}" data-cursor="PLAY">
          <div class="portfolio-media-wrapper">
            <video src="${item.video}" muted loop playsinline class="portfolio-video" preload="metadata"></video>
            <div class="play-indicator">
               <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
          <div class="portfolio-info">
            <h4 class="item-title">${item.title}</h4>
            <div class="item-meta">
              <span class="item-category">${item.category}</span>
              <span class="item-year">${item.year}</span>
            </div>
          </div>
        </article>
      `;
    });
    
    html += `</div></div>`;
  });
  
  container.innerHTML = html;
  
  // Attach event listeners for modal
  const items = document.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    item.addEventListener('click', () => openProjectModal(item.getAttribute('data-project-id')));
  });
  
  // Video Intersection Observer for Play/Pause
  const videos = document.querySelectorAll('.portfolio-video');
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.1 });
  
  videos.forEach(v => videoObserver.observe(v));
}

/* --------------------------------------------------------------------------
   6. PROJECT MODAL ENGINE
   -------------------------------------------------------------------------- */
function openProjectModal(projectId) {
  const modalBackdrop = document.getElementById('projectModal');
  if (!modalBackdrop) return;
  
  let data = null;
  for (const cat of portfolioProjects) {
    const found = cat.items.find(i => i.id === projectId);
    if (found) { data = found; break; }
  }
  if (!data) return;
  
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalCategory').textContent = `${data.category} · ${data.year}`;
  document.getElementById('modalRole').textContent = data.role;
  document.getElementById('modalDescription').textContent = data.description;
  document.getElementById('modalApproach').textContent = data.approach;
  document.getElementById('modalEditing').textContent = data.editing;
  document.getElementById('modalMotion').textContent = data.motion;
  
  const modalVideo = document.getElementById('modalVideoElement');
  if (modalVideo) {
    modalVideo.src = data.video;
    // modalVideo.poster = data.thumbnail;
    modalVideo.play().catch(() => {});
  }
  
  modalBackdrop.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

function closeModal() {
  const modalBackdrop = document.getElementById('projectModal');
  if (modalBackdrop) modalBackdrop.classList.remove('active');
  const modalVideo = document.getElementById('modalVideoElement');
  if (modalVideo) modalVideo.pause();
}

/* --------------------------------------------------------------------------
   7. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(
    '.intro-headline, .intro-copy-large, .intro-copy-secondary, .portfolio-item, .flow-stage, .about-portrait-box'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        entry.target.style.filter = 'blur(0px)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.98)';
    el.style.filter = 'blur(4px)';
    el.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.9s ease-out';
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   8. WEB AUDIO SOUND FEEDBACK (OPTIONAL IMMERSION)
   -------------------------------------------------------------------------- */
function initAudioFeedback() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  let audioCtx = null;
  let isMuted = true;

  if (!soundToggleBtn) return;

  soundToggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isMuted = !isMuted;
    soundToggleBtn.textContent = isMuted ? 'SOUND: OFF' : 'SOUND: ON';

    if (!isMuted) {
      playClickSound();
    }
  });

  function playClickSound() {
    if (isMuted || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  }
}
