import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('initWorkFilters();', 'renderPortfolio();')
content = content.replace('initProjectModals();', '')

parts = content.split('/* --------------------------------------------------------------------------\n   5. WORK CATEGORY FILTER SYSTEM')
part2 = parts[1].split('/* --------------------------------------------------------------------------\n   7. SCROLL REVEAL ANIMATIONS')

new_code = """/* --------------------------------------------------------------------------
   5. DYNAMIC PORTFOLIO SYSTEM
   -------------------------------------------------------------------------- */
const portfolioProjects = [
  {
    categoryTitle: "Social Reels",
    categoryDesc: "Short-form vertical content crafted for high viewer retention and viral engagement.",
    items: [
      {
        id: "social-1",
        title: "Social Reel Edit",
        category: "Social Reels",
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
   7. SCROLL REVEAL ANIMATIONS"""

final_content = parts[0] + new_code + part2[1]

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(final_content)
