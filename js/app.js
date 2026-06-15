// ============================================================
// App — 核心应用逻辑：初始化一切
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

  // ——— Initialize modules ———
  Lightbox.init();
  renderTimeline();
  initCategoryFilters();
  initSearch();
  renderGuestbook();
  initGuestbookForm();
  renderGallery();
  initGalleryUpload();

  console.log(`💕 CP Archive ready — ${data.moments.length} moments loaded.`);
})();

// ============================================================
// Gallery — 左侧图片展览区
// ============================================================

const GALLERY_STORAGE_KEY = 'cp_archive_gallery';

/** 获取所有画廊图片：内置 + 用户上传（localStorage） */
function getAllGalleryImages() {
  const builtin = (window.CP_DATA.galleryImages || []).map(img => ({
    src: img.src,
    caption: img.caption || '',
    source: 'builtin'
  }));

  // 从 localStorage 读取用户上传的图片
  let uploaded = [];
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    uploaded = raw ? JSON.parse(raw) : [];
  } catch (e) {
    uploaded = [];
  }

  return [...builtin, ...uploaded];
}

/** 渲染左侧画廊 */
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const empty = document.getElementById('galleryEmpty');
  if (!grid) return;

  const images = getAllGalleryImages();

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
    imgEl.alt = img.caption || '画廊图片';
    imgEl.loading = 'lazy';

    // 点击图片在灯箱中打开
    imgEl.addEventListener('click', () => {
      const allSrcs = images.map(i => i.src);
      Lightbox.open(allSrcs, index);
    });

    const actions = document.createElement('div');
    actions.className = 'gallery-item-actions';

    // 下载按钮
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'gallery-download-btn';
    downloadBtn.title = '下载图片';
    downloadBtn.innerHTML = '⬇';
    downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      downloadImage(img.src, img.caption || 'image');
    });

    // 如果是用户上传的，显示删除按钮
    if (img.source === 'uploaded') {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'gallery-delete-btn';
      deleteBtn.title = '删除图片';
      deleteBtn.innerHTML = '✕';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteUploadedImage(img.src);
      });
      actions.appendChild(deleteBtn);
    }

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

/** 初始化上传功能 */
function initGalleryUpload() {
  const input = document.getElementById('galleryFileInput');
  if (!input) return;

  input.addEventListener('change', () => {
    const files = Array.from(input.files);
    if (files.length === 0) return;

    let loaded = 0;
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        saveUploadedImage(reader.result, file.name);
        loaded++;
        if (loaded === files.length || loaded >= files.filter(f => f.type.startsWith('image/')).length) {
          renderGallery();
        }
      };
      reader.readAsDataURL(file);
    });

    // 清空 input 以便重复选择同一文件
    input.value = '';
  });
}

/** 保存用户上传的图片到 localStorage */
function saveUploadedImage(dataUrl, fileName) {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    const images = raw ? JSON.parse(raw) : [];
    const baseName = fileName.replace(/\.[^.]+$/, '');
    images.push({
      src: dataUrl,
      caption: baseName,
      date: new Date().toISOString().slice(0, 10),
      source: 'uploaded'
    });
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(images));
  } catch (e) {
    // localStorage 满了
    alert('存储空间不足，请清理一些旧图片后再上传。');
  }
}

/** 删除用户上传的图片 */
function deleteUploadedImage(src) {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    let images = raw ? JSON.parse(raw) : [];
    images = images.filter(img => img.src !== src);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(images));
    renderGallery();
  } catch (e) {
    // ignore
  }
}

/** 下载图片 */
function downloadImage(src, filename) {
  // 对于 data URL，直接下载
  // 对于远程 URL，使用 fetch + blob
  if (src.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // 远程图片：尝试 fetch 后下载
    fetch(src)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename + '.' + (blob.type.split('/')[1] || 'jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        // 降级：直接在新窗口打开
        window.open(src, '_blank');
      });
  }
}

/** 初始化画廊中所有图片的可下载性（右键也能保存） */
function initGalleryDownload() {
  // 保留接口，实际通过按钮实现
  // 用户也可以右键 → 另存为
}

// ============================================================
// Guestbook — 实时留言板（网站内输入 + 显示）
// ============================================================

const MESSAGES_STORAGE_KEY = 'cp_archive_messages';

/** 获取所有留言：内置 + 用户提交（localStorage） */
function getAllMessages() {
  // 内置留言
  const builtin = (window.CP_DATA.guestbook || []).map(msg => ({
    ...msg,
    source: 'builtin'
  }));

  // 用户通过表单提交的留言
  let userMessages = [];
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    userMessages = raw ? JSON.parse(raw) : [];
  } catch (e) {
    userMessages = [];
  }

  // 合并：用户留言在前 + 内置在后
  return [...userMessages, ...builtin];
}

/** 渲染留言列表 */
function renderGuestbook() {
  const container = document.getElementById('guestbookMessages');
  if (!container) return;

  const messages = getAllMessages();

  if (messages.length === 0) {
    container.innerHTML = `
      <div class="guestbook-empty">
        <p>💬</p>
        <p>还没有留言，来写第一条吧～</p>
      </div>`;
    return;
  }

  container.innerHTML = '';

  messages.forEach(msg => {
    const card = document.createElement('div');
    card.className = 'guestbook-msg';

    const isUserMsg = msg.source === 'user';

    card.innerHTML = `
      <div class="guestbook-msg-header">
        <span class="guestbook-avatar">${msg.avatar || '💬'}</span>
        <span class="guestbook-name">${escapeHTML(msg.name)}</span>
        ${isUserMsg ? '<span class="guestbook-badge">我的留言</span>' : ''}
        <span class="guestbook-date">${msg.date}</span>
      </div>
      <p class="guestbook-text">${escapeHTML(msg.message)}</p>
    `;

    container.appendChild(card);
  });
}

/** 初始化留言表单 */
function initGuestbookForm() {
  const form = document.getElementById('guestbookForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('guestbookName');
    const msgInput = document.getElementById('guestbookMsg');

    const name = nameInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !message) return;

    // 随机头像 emoji
    const avatars = ['🌸', '🍬', '✨', '💖', '🌟', '🎀', '💝', '🦋', '🌺', '💎', '🎆', '🍀'];

    const newMsg = {
      name: name,
      message: message,
      date: new Date().toISOString().slice(0, 10),
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      source: 'user'
    };

    // 保存到 localStorage
    saveUserMessage(newMsg);

    // 清空表单
    nameInput.value = '';
    msgInput.value = '';

    // 重新渲染
    renderGuestbook();

    // 滚动到最新留言
    const container = document.getElementById('guestbookMessages');
    if (container) {
      container.scrollTop = 0;
    }
  });
}

/** 保存用户留言到 localStorage */
function saveUserMessage(msg) {
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const messages = raw ? JSON.parse(raw) : [];
    messages.unshift(msg); // 最新留言在最前面
    // 最多保留 100 条
    if (messages.length > 100) messages.length = 100;
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    alert('存储空间不足，无法保存留言。');
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
