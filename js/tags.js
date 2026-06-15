// ============================================================
// Tags → 按分类（category）筛选，不再用细碎标签
// ============================================================

let activeCategory = null;

/**
 * 初始化分类筛选按钮
 */
function initCategoryFilters() {
  const container = document.getElementById('tagFilters');
  if (!container) return;

  // 按指定顺序排列分类
  const categoryOrder = ['采访', 'Q&A', '双人直播', '单人直播', '节目', 'Vlog', '二创', '命中注定', '情侣款', '汇总'];

  // 统计每个分类的数量
  const countMap = {};
  (window.CP_DATA.moments || []).forEach(m => {
    const cat = m.category || '其他';
    countMap[cat] = (countMap[cat] || 0) + 1;
  });

  container.innerHTML = '';

  // 「全部」按钮
  const allBtn = document.createElement('button');
  allBtn.className = 'tag-btn active';
  allBtn.textContent = '全部';
  allBtn.addEventListener('click', () => selectCategory(null, allBtn));
  container.appendChild(allBtn);

  // 各分类按钮
  categoryOrder.forEach(cat => {
    if (!countMap[cat]) return; // 跳过没有内容的分类
    const btn = document.createElement('button');
    btn.className = 'tag-btn';
    btn.innerHTML = `${cat} <span class="tag-count">${countMap[cat]}</span>`;
    btn.addEventListener('click', () => selectCategory(cat, btn));
    container.appendChild(btn);
  });
}

function selectCategory(cat, clickedBtn) {
  if (cat === activeCategory) {
    activeCategory = null;
    updateCategoryButtons(null);
  } else {
    activeCategory = cat;
    updateCategoryButtons(clickedBtn);
  }
  applyFilters();
}

function updateCategoryButtons(activeBtn) {
  document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
  if (activeBtn) {
    activeBtn.classList.add('active');
  } else {
    const allBtn = document.querySelector('.tag-btn');
    if (allBtn) allBtn.classList.add('active');
  }
}

/**
 * 同时应用分类筛选 + 搜索筛选
 */
function applyFilters() {
  const searchQuery = document.getElementById('searchInput')?.value || '';
  const entries = document.querySelectorAll('.timeline-entry');
  let visibleCount = 0;

  entries.forEach(entry => {
    const cat = entry.getAttribute('data-category') || '';
    const searchText = entry.getAttribute('data-search') || '';

    const catMatch = !activeCategory || cat === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const searchMatch = !query || searchText.includes(query);

    if (catMatch && searchMatch) {
      entry.classList.remove('filtered-out');
      visibleCount++;
    } else {
      entry.classList.add('filtered-out');
    }
  });

  updateYearSeparators();
  updateNoResults(visibleCount === 0, searchQuery);
}

/** 隐藏没有可见条目的年份分隔 */
function updateYearSeparators() {
  document.querySelectorAll('.year-separator').forEach(sep => {
    const year = sep.getAttribute('data-year');
    let hasVisible = false;
    let el = sep.nextElementSibling;
    while (el && !el.classList.contains('year-separator')) {
      if (el.classList.contains('timeline-entry') && !el.classList.contains('filtered-out')) {
        hasVisible = true;
        break;
      }
      el = el.nextElementSibling;
    }
    sep.classList.toggle('filtered-out', !hasVisible);
  });
}

function updateNoResults(show, query) {
  const el = document.getElementById('noResults');
  const queryEl = document.getElementById('noResultsQuery');
  if (!el || !queryEl) return;
  if (show && query.trim()) {
    el.hidden = false;
    queryEl.textContent = query.trim();
  } else {
    el.hidden = true;
  }
}
