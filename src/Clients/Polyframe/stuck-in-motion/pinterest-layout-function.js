useLocalhost = true;
// layout script

window.createdGrid = window.createdGrid || {};
window.createdGrid.isReady = false;
function triggerLayoutReady() {
  window.createdGrid.isReady = true;
  $(document).trigger('work-layout-ready');
}
(function ($) {

  const ratioHeightWeight = {
    "9/16": 16 / 9,
    "3/4":  4 / 3,
    "1/1":  1,
    "4/3":  3 / 4,
    "16/9": 9 / 16
  };

  /* ================================
     INTERNAL STATE
     ================================ */

  const state = {
    items: [],
    currentIndex: 0,
    columns: [],
    columnHeights: []
  };

  /* ================================
     RATIO PRIORITY (TALLEST → SHORTEST)
     ================================ */

  const ratioPriority = [
    "9/16",
    "3/4",
    "1/1",
    "4/3",
    "16/9"
  ];

  /* ================================
     COLUMN COUNT BY SCREEN SIZE
     ================================ */

  function getColumnCount() {
    const w = window.innerWidth;
    if (w > 1600) return 4;
    if (w > 991) return 3;
    if (w > 479) return 2;
    return 1;
  }

  /* ================================
     SEQUENCE ITEMS BY RATIO (helper)
     ================================ */

  function sequenceByRatio(items) {
    const buckets = {};

    ratioPriority.forEach(ratio => {
      buckets[ratio] = [];
    });

    items.forEach(item => {
      if (!buckets[item.ratio]) buckets[item.ratio] = [];
      buckets[item.ratio].push(item);
    });

    const sequence = [];
    let hasItems = true;

    while (hasItems) {
      hasItems = false;

      ratioPriority.forEach(ratio => {
        if (buckets[ratio] && buckets[ratio].length) {
          sequence.push(buckets[ratio].shift());
          hasItems = true;
        }
      });
    }

    return sequence;
  }

  /* ================================
     COLLECT + SEQUENCE ITEMS
     (PRIORITY → RATIO)
     ================================ */

  function collectAndSequenceItems($list) {
    const priorityGroups = {};

    // Collect items and group by priority
    $list.find('.created-item').each(function () {
      const $item = $(this);
      const ratio = $item.data('ratio');
      const priority = parseInt($item.data('priority'), 10) || 0;

      if (!priorityGroups[priority]) {
        priorityGroups[priority] = [];
      }

      priorityGroups[priority].push({
        el: this,
        ratio,
        priority
      });
    });

    // Sort priorities DESC (higher first)
    const sortedPriorities = Object.keys(priorityGroups)
      .map(Number)
      .sort((a, b) => b - a);

    // Build final sequence
    const finalSequence = [];

    sortedPriorities.forEach(priority => {
      const itemsAtPriority = priorityGroups[priority];
      const sequenced = sequenceByRatio(itemsAtPriority);
      finalSequence.push(...sequenced);
    });

    return finalSequence;
  }

  /* ================================
     BUILD COLUMNS + STORE ITEMS
     ================================ */

  function buildColumnsAndStoreItems() {
    const $list = $('.created-list');
    if (!$list.length) return;

    state.items = collectAndSequenceItems($list);
    state.currentIndex = 0;

    // detach items
    state.items.forEach(item => {
      $(item.el).detach();
    });

    // build columns
    const columnCount = getColumnCount();
    $list.empty();
    state.columns = [];
    state.columnHeights = [];

    for (let i = 0; i < columnCount; i++) {
      const $col = $('<div class="created-column"></div>');
      state.columns.push($col);
      state.columnHeights.push(0);
      $list.append($col);
    }
  }

  /* ================================
     ADD ITEM TO COLUMN
     ================================ */

  function addItemToColumn(i) {
    if (!state.columns[i]) return;
    if (state.currentIndex >= state.items.length) return;

    const item = state.items[state.currentIndex];
    state.currentIndex++;

    state.columns[i].append(item.el);

    const weight = ratioHeightWeight[item.ratio] ?? 1;
    state.columnHeights[i] += weight;
  }

  function getShortestColumnIndex() {
    let shortestIndex = 0;
    let minHeight = state.columnHeights[0];

    for (let i = 1; i < state.columnHeights.length; i++) {
      if (state.columnHeights[i] < minHeight) {
        minHeight = state.columnHeights[i];
        shortestIndex = i;
      }
    }

    return shortestIndex;
  }

  function fillLayout() {
    while (state.currentIndex < state.items.length) {
      const colIndex = getShortestColumnIndex();
      addItemToColumn(colIndex);
    }
  }

  /* ================================
     INIT + BREAKPOINT GUARD
     ================================ */

  let lastColumnCount = getColumnCount();

  function rebuildOnBreakpointChange() {
    const currentCount = getColumnCount();
    if (currentCount !== lastColumnCount) {
      lastColumnCount = currentCount;
      buildColumnsAndStoreItems();
      fillLayout();
      triggerLayoutReady();
    }
  }

  $(document).ready(function () {
    buildColumnsAndStoreItems();
    fillLayout();
    triggerLayoutReady();
  });

  $(window).on('resize', function () {
    rebuildOnBreakpointChange();
  });

  /* ================================
     EXPOSE API
     ================================ */

  window.createdGrid = {
    rebuild: buildColumnsAndStoreItems,
    addItemToColumn
  };

})(jQuery);