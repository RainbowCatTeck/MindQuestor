import { describe, it, expect } from 'vitest';
import { loadApp } from './loadApp.js';

describe('attribute-context XSS escaping', () => {
  it('renderQuickLinksHeader cannot be broken out of via a quote in a backup-imported url', () => {
    const window = loadApp();
    const evilUrl = '"><script>window.pwned=1</script>';
    window.localStorage.setItem('fb-links', JSON.stringify([{ id: 1, name: 'x', url: evilUrl, cat: 'other', emoji: '🔗' }]));
    window.loadQuickHub();
    window.renderQuickLinksHeader();

    const box = window.document.getElementById('head-links');
    expect(box.querySelectorAll('script').length).toBe(0);
    expect(box.querySelector('a').getAttribute('href')).toBe(evilUrl);
  });
});
