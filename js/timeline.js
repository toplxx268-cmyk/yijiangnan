// ============================================================
// Timeline — 时间线渲染
// ============================================================

/** 全局排序状态 */
var SORT_DESC = true; // true=倒序(最新在前), false=正序(最早在前)

/**
 * 切换排序并重新渲染
 */
function toggleSort() {
  SORT_DESC = !SORT_DESC;
  renderTimeline();
}

/**
 * 渲染完整时间线
 */
function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  // 排序按钮（放在时间线顶部右侧）
  var sortIcon = SORT_DESC ? '↓' : '↑';
  var sortCls = SORT_DESC ? ' desc' : '';
  var sortHTML = '' +
    '<div class="tl-sort-toggle' + sortCls + '" id="sortToggle" title="切换排序">' +
      sortIcon + ' 排序' +
    '</div>';

  const moments = [...window.CP_DATA.moments];
  moments.sort((a, b) => {
    var cmp = a.date.localeCompare(b.date);
    return SORT_DESC ? -cmp : cmp;
  });

  container.innerHTML = '';

  // 先插入排序按钮
  container.insertAdjacentHTML('beforeend', sortHTML);
  var sortBtn = container.querySelector('.tl-sort-toggle');
  if (sortBtn) {
    sortBtn.addEventListener('click', toggleSort);
  }

  let lastYear = null;

  moments.forEach((moment, index) => {
    const year = moment.date.substring(0, 4);
    if (year !== lastYear) {
      const sep = document.createElement('div');
      sep.className = 'year-separator';
      sep.setAttribute('data-year', year);
      sep.innerHTML = `<span>${year}</span>`;
      container.appendChild(sep);
      lastYear = year;
    }

    const entry = createEntry(moment, index);
    container.appendChild(entry);
  });

  setupScrollAnimations();
}

/**
 * 创建单条时间线条目
 */
function createEntry(moment, index) {
  const entry = document.createElement('div');
  entry.className = 'timeline-entry';
  if (moment.featured) entry.classList.add('featured');

  entry.id = moment.id;
  entry.setAttribute('data-date', moment.date);
  entry.setAttribute('data-category', moment.category || '');
  entry.setAttribute('data-search', buildSearchText(moment));
  entry.setAttribute('data-icon', moment.icon || '💕');
  entry.style.transitionDelay = `${index * 0.03}s`;

  // Dot
  const dot = document.createElement('div');
  dot.className = 'entry-dot';
  entry.appendChild(dot);

  // Card
  const card = document.createElement('div');
  card.className = 'entry-card';

  // Date
  const dateEl = document.createElement('div');
  dateEl.className = 'entry-date';
  dateEl.textContent = formatDate(moment.date);
  card.appendChild(dateEl);

  // Title
  const titleEl = document.createElement('h3');
  titleEl.className = 'entry-title';
  titleEl.textContent = moment.icon ? `${moment.icon} ${moment.title}` : moment.title;
  card.appendChild(titleEl);

  // Category badge (the big classification, not granular tags)
  if (moment.category) {
    const catBadge = document.createElement('span');
    catBadge.className = 'entry-category';
    catBadge.textContent = moment.category;
    card.appendChild(catBadge);
  }

  // Description
  if (moment.description) {
    const descEl = document.createElement('p');
    descEl.className = 'entry-description';
    descEl.textContent = moment.description;
    card.appendChild(descEl);
  }

  // Images
  renderEntryImages(moment.images || [], card);

  // Links
  if (moment.links && moment.links.length > 0) {
    const linksRow = document.createElement('div');
    linksRow.className = 'entry-links';
    moment.links.forEach(link => {
      const a = document.createElement('a');
      a.className = 'entry-link';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = link.label || '🔗 查看链接';
      linksRow.appendChild(a);
    });
    card.appendChild(linksRow);
  }

  entry.appendChild(card);
  return entry;
}

function buildSearchText(moment) {
  return [
    moment.title || '',
    moment.description || '',
    moment.category || ''
  ].join(' ').toLowerCase();
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${y}年${parseInt(m)}月${parseInt(d)}日`;
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.timeline-entry').forEach(el => observer.observe(el));
}
