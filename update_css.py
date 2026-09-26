css = """
/* --------------------------------------------------------------------------
   FEATURED WORKS DYNAMIC STYLES
   -------------------------------------------------------------------------- */
.portfolio-category-block {
  margin-top: 6rem;
  border-top: 1px solid var(--border-subtle);
  padding-top: 4rem;
}

.category-header {
  margin-bottom: 3rem;
  max-width: 800px;
}

.category-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.category-desc {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
}

.portfolio-item {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
  group;
}

.portfolio-media-wrapper {
  position: relative;
  width: 100%;
  background-color: #0a0a0c;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-smooth);
}

.portfolio-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Aspect Ratios */
.aspect-vertical .portfolio-media-wrapper {
  aspect-ratio: 9 / 16;
}

.aspect-landscape .portfolio-media-wrapper {
  aspect-ratio: 16 / 9;
}

.aspect-square .portfolio-media-wrapper {
  aspect-ratio: 1 / 1;
}

/* Hover Interactions */
.play-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: all var(--transition-smooth);
}

.portfolio-item:hover .portfolio-media-wrapper {
  transform: scale(1.02);
}

.portfolio-item:hover .play-indicator {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* Info */
.portfolio-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;
  transition: color var(--transition-fast);
}

.portfolio-item:hover .item-title {
  color: var(--accent);
}

.item-meta {
  display: flex;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .play-indicator {
    opacity: 1; /* Show always on mobile */
    transform: translate(-50%, -50%) scale(0.8);
    background-color: rgba(0,0,0,0.5);
  }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)
