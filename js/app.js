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

  // Days counter（修正时区偏差，按本地时间计算）
  if (data.meta.startDate) {
    var parts = data.meta.startDate.split('-').map(Number);
    var start = new Date(parts[0], parts[1] - 1, parts[2]); // 本地午夜
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    var daysEl = document.querySelector('.days-number');
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
  renderFeeds();
  renderFootprintMap();
  initBackToTop();

  console.log(`💕 CP Archive ready — ${data.moments.length} moments loaded.`);
})();

/** HTML 转义，防止 XSS */
function escapeHTML(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/** Back to top button */
/** 渲染最新动态概览 */
function renderFeeds() {
  var feeds = window.LATEST_FEEDS;
  if (!feeds || feeds.length === 0) return;

  var panel = document.getElementById('feedPanel');
  var list = document.getElementById('feedList');
  var updated = document.getElementById('feedUpdated');
  if (!panel || !list) return;

  panel.hidden = false;

  list.innerHTML = feeds.map(function(f) {
    var platformEmoji = { '微博': '🔵', '抖音': '🎵', '小红书': '📕' }[f.platform] || '🔗';
    var authorEmoji = f.author === '南南' ? '🌸' : '🌟';
    return '<a class="feed-item" href="' + f.url + '" target="_blank" rel="noopener">' +
      '<span class="feed-emoji">' + authorEmoji + '</span>' +
      '<span class="feed-text">' + escapeHTML(f.title || '(无文字)') + '</span>' +
      '<span class="feed-platform">' + platformEmoji + '</span>' +
      '<span class="feed-date">' + (f.date || '') + '</span>' +
      '</a>';
  }).join('');

  if (feeds[0] && feeds[0].date) {
    updated.textContent = '更新于 ' + feeds[0].date;
  }
}

function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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
// Footprint Map — 足迹地图
// ============================================================

function renderFootprintMap() {
  var container = document.getElementById('footprintMap');
  if (typeof L === 'undefined') {
    if (container) container.parentElement.style.display = 'none';
    return;
  }
  var footprints = window.CP_DATA.footprints || [];
  if (!container || footprints.length === 0) return;

  var map = L.map(container, {
    center: [28, 112],
    zoom: 5,
    zoomControl: true,
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  footprints.forEach(function(p) {
    var icon = L.divIcon({
      className: 'footprint-marker',
      html: '<div class="fp-emoji">' + p.emoji + '</div><div class="fp-label">' + p.name + '</div>',
      iconSize: [60, 48],
      iconAnchor: [30, 48]
    });

    L.marker([p.lat, p.lng], { icon: icon })
      .addTo(map)
      .bindPopup(
        '<div class="fp-popup">' +
        '<strong>' + p.emoji + ' ' + escapeHTML(p.name) + '</strong>' +
        '<br><small>' + (p.date || '') + '</small>' +
        '</div>'
      );
  });

  if (footprints.length > 1) {
    var bounds = footprints.map(function(p) { return [p.lat, p.lng]; });
    map.fitBounds(bounds, { padding: [25, 25], maxZoom: 7 });
  }

  setTimeout(function() { map.invalidateSize(); }, 200);
}

// ============================================================
// Gallery — 左侧美图合集（支持分类：合照/自拍/旅行/日常/活动）
// ============================================================

let galleryActiveCategory = '全部';

function renderGallery() {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;
  var images = window.CP_DATA.galleryImages || [];
  grid.innerHTML = '';

  images.forEach(function(img, i) {
    var item = document.createElement('div');
    item.className = 'gallery-item';

    // 画廊展示缩略图（速度快）
    var el = document.createElement('img');
    el.src = img.thumb || img.src || '';
    el.alt = img.caption || '';
    el.loading = 'lazy';
    el.onclick = function() {
      // 灯箱才加载原图
      var fullSrcs = images.map(function(x) { return x.full || x.src || ''; });
      Lightbox.open(fullSrcs, i);
    };

    item.appendChild(el);

    if (img.caption) {
      var cap = document.createElement('div');
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

