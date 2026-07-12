import { describe, it, expect } from 'vitest';
import { loadApp } from './loadApp.js';

describe('attribute-context XSS escaping', () => {
  it('escAttr escapes quotes as well as & < >', () => {
    const window = loadApp();
    expect(window.escAttr(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&#39;');
  });
});
