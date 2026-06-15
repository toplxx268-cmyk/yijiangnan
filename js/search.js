// ============================================================
// Search — 全文本搜索
// ============================================================

/**
 * Initialize search input with debounced handler.
 */
function initSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', () => {
    // Show/hide clear button
    if (input.value.trim()) {
      clearBtn.classList.add('visible');
    } else {
      clearBtn.classList.remove('visible');
    }

    // Debounced filter
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      applyFilters();
    }, 150);
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.remove('visible');
    applyFilters();
    input.focus();
  });

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
    }
  });
}
