import { describe, it, expect } from 'vitest';
import { loadApp } from './loadApp.js';

describe('attribute-context XSS escaping', () => {
  it('renderVisionBoard cannot be broken out of via a quote in a backup-imported src', () => {
    const window = loadApp();
    const evilSrc = '"><script>window.pwned=1</script>';
    window.localStorage.setItem('fb-vision', JSON.stringify([{ id: 1, src: evilSrc, x: 0, y: 0, w: 10, h: 10 }]));
    window.loadQuickHub();
    window.renderVisionBoard();

    const board = window.document.getElementById('vision-board');
    expect(board.querySelectorAll('script').length).toBe(0);
    expect(board.querySelector('img').getAttribute('src')).toBe(evilSrc);
  });
});
