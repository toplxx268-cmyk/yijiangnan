// ============================================================
// Gallery & Lightbox — 图片画廊 + 灯箱
// ============================================================

const Lightbox = {
  el: null,
  img: null,
  counter: null,
  images: [],       // All image srcs currently in context
  currentIndex: 0,

  init() {
    this.el = document.getElementById('lightbox');
    this.img = document.getElementById('lightboxImg');
    this.counter = document.getElementById('lightboxCounter');

    // Close on backdrop click
    this.el.querySelector('.lightbox-backdrop').addEventListener('click', () => this.close());

    // Close button
    this.el.querySelector('.lightbox-close').addEventListener('click', () => this.close());

    // Prev/Next
    this.el.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    this.el.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (this.el.hidden) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe
    let touchStartX = 0;
    this.el.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
    this.el.addEventListener('touchend', (e) => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        delta > 0 ? this.next() : this.prev();
      }
    });
  },

  open(imageSrcs, startIndex) {
    this.images = imageSrcs;
    this.currentIndex = startIndex || 0;
    this.showImage();
    this.el.hidden = false;
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.el.hidden = true;
    document.body.style.overflow = '';
  },

  showImage() {
    // Brief opacity flash for transition feel
    this.img.style.opacity = '0';
    setTimeout(() => {
      this.img.src = this.images[this.currentIndex];
      this.img.style.opacity = '1';
    }, 100);
    this.img.style.transition = 'opacity 0.2s ease';

    if (this.images.length > 1) {
      this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    } else {
      this.counter.textContent = '';
    }

    // Show/hide prev/next buttons
    const prevBtn = this.el.querySelector('.lightbox-prev');
    const nextBtn = this.el.querySelector('.lightbox-next');
    prevBtn.style.display = this.images.length > 1 ? '' : 'none';
    nextBtn.style.display = this.images.length > 1 ? '' : 'none';
  },

  next() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showImage();
  },

  prev() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showImage();
  }
};

/**
 * Render thumbnail images within an entry card.
 * @param {string[]} images - Array of image src paths
 * @param {HTMLElement} container - The DOM element to append images to
 */
function renderEntryImages(images, container) {
  if (!images || images.length === 0) return;

  const grid = document.createElement('div');
  grid.className = 'entry-images';
  if (images.length === 1) {
    grid.classList.add('single-image');
  }

  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('click', () => {
      Lightbox.open(images, i);
    });
    grid.appendChild(img);
  });

  container.appendChild(grid);
}
