import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_HTML_PATH = path.join(__dirname, '..', 'mindquestor', 'app', 'index.html');

// Loads the real, unmodified production HTML/JS into a jsdom window so tests
// exercise the actual app code rather than a reimplementation of it.
export function loadApp() {
  const html = fs.readFileSync(APP_HTML_PATH, 'utf8');
  const dom = new JSDOM(html, {
    url: 'http://localhost/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  });
  return dom.window;
}
