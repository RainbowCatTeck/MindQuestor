import { describe, it, expect, beforeEach } from 'vitest';
import { loadApp } from './loadApp.js';

function colPos(window, key) {
  const el = window.document.querySelector(`.pgrid-col[data-col="${key}"]`);
  return { gridRow: el.style.gridRow, gridColumn: el.style.gridColumn };
}

describe('movePgridBlock', () => {
  let window;

  beforeEach(() => {
    window = loadApp();
  });

  it('swaps two blocks when the target cell is already occupied', () => {
    // default layout: quests(0,0) loadouts(0,1) timeline(0,2) suggestions(1,0)
    expect(colPos(window, 'loadouts')).toEqual({ gridRow: '1 / span 1', gridColumn: '2 / span 1' });
    expect(colPos(window, 'timeline')).toEqual({ gridRow: '1 / span 1', gridColumn: '3 / span 1' });

    window.movePgridBlock('timeline', 'left'); // (0,2) -> (0,1), occupied by loadouts

    expect(colPos(window, 'timeline')).toEqual({ gridRow: '1 / span 1', gridColumn: '2 / span 1' });
    expect(colPos(window, 'loadouts')).toEqual({ gridRow: '1 / span 1', gridColumn: '3 / span 1' });

    const saved = JSON.parse(window.localStorage.getItem('mq-pgrid-pos'));
    expect(saved.timeline).toEqual({ row: 0, col: 1 });
    expect(saved.loadouts).toEqual({ row: 0, col: 2 });
  });

  it('does not move past the left edge of the grid', () => {
    window.movePgridBlock('quests', 'left'); // already at col 0

    expect(colPos(window, 'quests')).toEqual({ gridRow: '1 / span 1', gridColumn: '1 / span 1' });
  });
});

describe('togglePgridHidden', () => {
  let window;

  beforeEach(() => {
    window = loadApp();
  });

  it('hides a block from layout and persists it', () => {
    window.togglePgridHidden('timeline');

    const el = window.document.querySelector('.pgrid-col[data-col="timeline"]');
    expect(el.classList.contains('col-hidden')).toBe(true);
    expect(JSON.parse(window.localStorage.getItem('mq-pgrid-hidden'))).toEqual(['timeline']);
  });

  it('shows it again on a second toggle', () => {
    window.togglePgridHidden('timeline');
    window.togglePgridHidden('timeline');

    const el = window.document.querySelector('.pgrid-col[data-col="timeline"]');
    expect(el.classList.contains('col-hidden')).toBe(false);
    expect(JSON.parse(window.localStorage.getItem('mq-pgrid-hidden'))).toEqual([]);
  });
});
