// ============================================================
// 🔑 高德地图 Key & 安全密钥
//    Key 申请地址: https://console.amap.com/dev/key/app
//    选择「Web端(JS API)」
//    安全密钥（jscode）在 Key 详情页可见，2021年底后新建的 Key 必须填写
// ============================================================
var AMAP_KEY    = 'b6a3c822b472de0ef43ac88346651081';
var AMAP_JSCODE = '4bb326d989ffdd2851d44342fc6e6406';  // ← 填入安全密钥，如果没有可以不填

// 动态加载高德地图 JS API
(function loadAmap() {
  if (!AMAP_KEY || AMAP_KEY === 'YOUR_AMAP_KEY') {
    console.warn('🗺️ 请先在 app.js 顶部填入高德地图 Key');
    return;
  }
  var url = 'https://webapi.amap.com/maps?v=2.0&key=' + AMAP_KEY;
  if (AMAP_JSCODE && AMAP_JSCODE !== 'YOUR_JSCODE') {
    url += '&jscode=' + AMAP_JSCODE;
  }
  var s = document.createElement('script');
  s.src = url;
  s.onload = function () { renderFootprintMap(); };
  s.onerror = function () { console.warn('🗺️ 高德地图加载失败，请检查 Key 是否正确'); };
  document.head.appendChild(s);
})();

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
  // 足迹地图由高德 JS 加载完成后自动调用 renderFootprintMap()
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
// WGS-84 → GCJ-02 坐标转换（高德地图使用 GCJ-02 坐标系）
// ============================================================

function wgs84ToGcj02(lng, lat) {
  var a = 6378245.0;
  var ee = 0.00669342162296594323;

  function transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320.0 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
    return ret;
  }

  function transformLng(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
    return ret;
  }

  var dlat = transformLat(lng - 105.0, lat - 35.0);
  var dlng = transformLng(lng - 105.0, lat - 35.0);
  var radlat = lat / 180.0 * Math.PI;
  var magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  var dlat2 = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * Math.PI);
  var dlng2 = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * Math.PI);

  return { lng: lng + dlng2, lat: lat + dlat2 };
}

// ============================================================
// Footprint Map — 足迹地图（高德地图 JS API）
// ============================================================

function renderFootprintMap() {
  var container = document.getElementById('footprintMap');
  if (typeof AMap === 'undefined') return;
  var footprints = window.CP_DATA.footprints || [];
  if (!container || footprints.length === 0) return;

  // 统计城市和国家
  var cities = {}, countries = {};
  footprints.forEach(function(p) {
    if (p.country === '中国' && p.city) cities[p.city] = true;
    if (p.country && p.country !== '中国') countries[p.country] = true;
  });
  var titleEl = document.getElementById('footprintTitle');
  if (titleEl) {
    titleEl.textContent = '👣 ' + Object.keys(cities).length + '城·' + Object.keys(countries).length + '国';
  }

  // 初始化高德地图（GCJ-02 坐标系，国内流畅）
  var map = new AMap.Map(container, {
    zoom: 5,
    center: [110, 28],
    resizeEnable: true
  });

  // 遍历足迹，WGS-84 → GCJ-02 转换后添加标记
  footprints.forEach(function(p) {
    var gcj = wgs84ToGcj02(p.lng, p.lat);

    var markerContent = '' +
      '<div class="fp-marker">' +
      '<div class="fp-emoji">' + p.emoji + '</div>' +
      '<div class="fp-label">' + escapeHTML(p.name) + '</div>' +
      '</div>';

    var marker = new AMap.Marker({
      position: [gcj.lng, gcj.lat],
      content: markerContent,
      offset: new AMap.Pixel(-28, -42),
      zIndex: 100
    });

    // 点击弹窗
    marker.on('click', (function(p, gcj) {
      return function() {
        var info = new AMap.InfoWindow({
          content: '<div style="text-align:center;font-size:14px;"><strong>' + p.emoji + ' ' + escapeHTML(p.name) + '</strong><br><small style="color:#8B6B6B;">' + (p.date || '') + '</small></div>',
          offset: new AMap.Pixel(0, -48)
        });
        info.open(map, [gcj.lng, gcj.lat]);
      };
    })(p, gcj));

    map.add(marker);
  });

  // 自适应所有标记
  map.setFitView(null, false, [60, 60, 60, 60]);
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

