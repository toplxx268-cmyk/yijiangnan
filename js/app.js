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
  renderBigDays();
  initUtterances();

  console.log(`💕 CP Archive ready — ${data.moments.length} moments loaded.`);
})();

// ============================================================
// Big Days — 纪念日 & 生日倒计时
// ============================================================

function renderBigDays() {
  const bar = document.getElementById('bigdayBar');
  if (!bar) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(window.CP_DATA.meta.startDate);

  // 计算周年（基于 startDate）
  const anniversaries = [];
  for (let y = 1; y <= 2; y++) {
    const annDate = new Date(startDate);
    annDate.setFullYear(startDate.getFullYear() + y);
    anniversaries.push({
      label: `${y}周年`,
      date: annDate,
      emoji: '💕',
      type: 'anniversary'
    });
  }

  // 生日
  const birthdays = [];
  if (window.CP_DATA.meta.birthdays) {
    const b = window.CP_DATA.meta.birthdays;
    if (b.nannan) {
      birthdays.push({
        label: '南南生日',
        date: getNextBirthday(b.nannan, today),
        emoji: '🌸',
        type: 'birthday'
      });
    }
    if (b.xiaojiang) {
      birthdays.push({
        label: '小江生日',
        date: getNextBirthday(b.xiaojiang, today),
        emoji: '🌟',
        type: 'birthday'
      });
    }
  }

  const allDays = [...anniversaries, ...birthdays].sort((a, b) => a.date - b.date);

  bar.innerHTML = allDays.map(d => {
    const diffDays = Math.ceil((d.date - today) / (1000 * 60 * 60 * 24));
    let status;

    if (diffDays === 0) {
      status = `<span class="bigday-today">🎉 今天！</span>`;
    } else if (diffDays > 0) {
      status = `<span class="bigday-countdown">还有 <strong>${diffDays}</strong> 天</span>`;
    } else {
      status = `<span class="bigday-passed">已过 ${Math.abs(diffDays)} 天</span>`;
    }

    return `
      <div class="bigday-item ${diffDays === 0 ? 'is-today' : ''}">
        <span class="bigday-emoji">${d.emoji}</span>
        <div class="bigday-info">
          <span class="bigday-label">${d.label}</span>
          <span class="bigday-date">${formatBigDay(d.date)}</span>
          ${status}
        </div>
      </div>
    `;
  }).join('');
}

/** 计算下一个生日/纪念日的日期 */
function getNextBirthday(mmdd, today) {
  const [m, d] = mmdd.split('-').map(Number);
  const thisYear = new Date(today.getFullYear(), m - 1, d);
  if (thisYear >= today) return thisYear;
  return new Date(today.getFullYear() + 1, m - 1, d);
}

function formatBigDay(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// ============================================================
// Gallery — 左侧美图合集（支持分类：合照/自拍/旅行/日常/活动）
// ============================================================

let galleryActiveCategory = '全部';

function renderGallery() {
  bindGalleryTabs();
  bindGalleryImages();
}

/** 分类标签点击 */
function bindGalleryTabs() {
  const tabsEl = document.getElementById('galleryTabs');
  if (!tabsEl || tabsEl._bound) return;
  tabsEl._bound = true;

  tabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-tab');
    if (!btn) return;
    tabsEl.querySelectorAll('.gallery-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterGalleryByCategory(btn.dataset.cat);
  });
}

/** 按分类过滤图片 */
function filterGalleryByCategory(cat) {
  const items = document.querySelectorAll('#galleryGrid .gallery-item');
  items.forEach(item => {
    const itemCat = item.dataset.category || '';
    if (cat === '全部' || itemCat === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

/** 给图片绑定灯箱点击 */
function bindGalleryImages() {
  const grid = document.getElementById('galleryGrid');
  if (!grid || grid._bound) return;
  grid._bound = true;

  grid.addEventListener('click', (e) => {
    const img = e.target.closest('.gallery-item img');
    if (!img) return;
    const allImgs = [...grid.querySelectorAll('.gallery-item:not([style*="display: none"]) img')];
    const srcs = allImgs.map(i => i.src);
    const idx = allImgs.indexOf(img);
    Lightbox.open(srcs, idx >= 0 ? idx : 0);
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
