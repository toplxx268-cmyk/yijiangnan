// ============================================================
// App — 核心应用逻辑
// ============================================================

(function () {
  'use strict';

  if (!window.CP_DATA || !window.CP_DATA.moments) {
    console.error('CP Archive: CP_DATA not found. Make sure js/data.js is loaded.');
    return;
  }

  const data = window.CP_DATA;

  // ——— Header ———
  document.querySelector('.site-title').textContent = data.meta.coupleName;
  document.querySelector('.site-subtitle').textContent = data.meta.subtitle;

  // Header background image
  if (data.meta.headerImage) {
    const header = document.getElementById('header');
    if (header) {
      header.style.backgroundImage = `url('${data.meta.headerImage}')`;
      header.style.backgroundSize = 'cover';
      header.style.backgroundPosition = 'center top';
      header.classList.add('has-bg-image');
    }
  }

  // Days counter
  if (data.meta.startDate) {
    const start = new Date(data.meta.startDate);
    const today = new Date();
    const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const daysEl = document.querySelector('.days-number');
    if (daysEl && days > 0) {
      daysEl.textContent = days;
    }
  }

  // ——— Initialize ———
  Lightbox.init();
  renderTimeline();
  initCategoryFilters();
  initSearch();
  renderGallery();
  initUtterances();

  console.log(`💕 CP Archive ready — ${data.moments.length} moments loaded.`);
})();

// ============================================================
// Gallery — 左侧美图合集（仅展示 data.js galleryImages）
// ============================================================

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  if (!grid) return;

  const images = window.CP_DATA.galleryImages || [];

  if (images.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = '';
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.innerHTML = '';

  images.forEach((img, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.caption || '美图';
    imgEl.loading = 'lazy';
    imgEl.addEventListener('click', () => {
      const allSrcs = images.map(i => i.src);
      Lightbox.open(allSrcs, index);
    });

    const actions = document.createElement('div');
    actions.className = 'gallery-item-actions';

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'gallery-download-btn';
    downloadBtn.title = '下载图片';
    downloadBtn.innerHTML = '⬇';
    downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadImage(img.src, img.caption || 'image');
    });
    actions.appendChild(downloadBtn);

    item.appendChild(imgEl);
    item.appendChild(actions);

    if (img.caption) {
      const cap = document.createElement('div');
      cap.className = 'gallery-caption';
      cap.textContent = img.caption;
      item.appendChild(cap);
    }

    grid.appendChild(item);
  });
}

function downloadImage(src, filename) {
  if (src.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    fetch(src).then(r => r.blob()).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename + '.' + (blob.type.split('/')[1] || 'jpg');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }).catch(() => window.open(src, '_blank'));
  }
}

// ============================================================
// Utterances — GitHub Issues 留言（所有人可见）
// ============================================================

function initUtterances() {
  const container = document.getElementById('utterances-comments');
  if (!container) return;

  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.setAttribute('repo', 'toplxx268-cmyk/yijiangnan');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('theme', 'github-light');
  script.setAttribute('label', '💬 留言');
  script.crossOrigin = 'anonymous';
  script.async = true;

  container.appendChild(script);
}
