import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadApp } from './loadApp.js';

function fillQuestForm(window, { name, hours = 0, minutes = 30 }) {
  window.document.getElementById('qname').value = name;
  window.document.getElementById('qdur-h').value = String(hours);
  window.document.getElementById('qdur-m').value = String(minutes);
}

function enablePoolMode(window) {
  const cb = window.document.getElementById('qpool-toggle-cb');
  cb.checked = true;
  window.togglePoolMode();
}

function addVariant(window, label) {
  window.document.getElementById('qpool-var-name').value = label;
  window.addPoolVariant();
}

// Pulls the quest's real id out of the rendered DOM (the delete button's
// onclick attribute), since the `quests` array itself is a closure-scoped
// `let` and isn't reachable as a window global.
function firstQuestId(window) {
  const del = window.document.querySelector('#qlist .qdel');
  const match = del.getAttribute('onclick').match(/delQuest\(([\d.]+)\)/);
  return Number(match[1]);
}

function chipVariantId(window, label) {
  const chips = [...window.document.querySelectorAll('#qlist .qpool-chip')];
  const chip = chips.find((c) => c.textContent.trim() === label);
  const match = chip.getAttribute('onclick').match(/pickQuestPool\(([\d.]+),([\d.]+)\)/);
  return Number(match[2]);
}

describe('activity pool: creating a pool quest', () => {
  let window;

  beforeEach(() => {
    window = loadApp();
  });

  it('refuses to create a pool with fewer than 2 variants', () => {
    fillQuestForm(window, { name: 'movement block' });
    enablePoolMode(window);
    addVariant(window, 'only one variant');

    window.addQuest();

    expect(window.document.getElementById('qlist').textContent).toContain('no quests yet');
  });

  it('creates a pool quest with a separate title and the variants as pool items', () => {
    fillQuestForm(window, { name: 'movement block', minutes: 0, hours: 1 });
    enablePoolMode(window);
    addVariant(window, 'strength basics');
    addVariant(window, 'dance practice');
    addVariant(window, 'yoga flow');

    window.addQuest();

    const qlist = window.document.getElementById('qlist');
    expect(qlist.querySelector('.qname').textContent).toBe('movement block');
    expect(qlist.querySelector('.qdur').textContent).toBe('1h');

    const chipLabels = [...qlist.querySelectorAll('.qpool-chip')].map((c) => c.textContent.trim());
    expect(chipLabels).toEqual(['strength basics', 'dance practice', 'yoga flow']);
    // the title itself must not be one of the selectable variants
    expect(chipLabels).not.toContain('movement block');
  });
});

describe('activity pool: rolling and picking a variant', () => {
  let window;

  beforeEach(() => {
    window = loadApp();
    fillQuestForm(window, { name: 'movement block', minutes: 0, hours: 1 });
    enablePoolMode(window);
    addVariant(window, 'strength basics');
    addVariant(window, 'dance practice');
    window.addQuest();
  });

  it('rollQuestPool lands on a variant different from the current one', () => {
    vi.useFakeTimers();
    const id = firstQuestId(window);

    window.rollQuestPool(id);
    vi.advanceTimersByTime(600);

    const activeChip = window.document.querySelector('#qlist .qpool-chip.active');
    expect(activeChip.textContent.trim()).toBe('dance practice');
    vi.useRealTimers();
  });

  it('pickQuestPool marks the chosen variant active, while the displayed title stays the pool title', () => {
    const id = firstQuestId(window);
    const danceId = chipVariantId(window, 'dance practice');

    window.pickQuestPool(id, danceId);

    const activeChip = window.document.querySelector('#qlist .qpool-chip.active');
    expect(activeChip.textContent.trim()).toBe('dance practice');
    expect(window.document.querySelector('#qlist .qname').textContent).toBe('movement block');
  });

  it('keeps the quest duration unchanged when switching variants', () => {
    const id = firstQuestId(window);
    const danceId = chipVariantId(window, 'dance practice');

    window.pickQuestPool(id, danceId);

    expect(window.document.querySelector('#qlist .qdur').textContent).toBe('1h');
  });
});

describe('activity pool: syncing the scheduled timeline block', () => {
  let window;

  beforeEach(() => {
    window = loadApp();
    fillQuestForm(window, { name: 'movement block', minutes: 0, hours: 1 });
    enablePoolMode(window);
    addVariant(window, 'strength basics');
    addVariant(window, 'dance practice');
    window.addQuest();
    window.autoSchedule();
  });

  it('updates the matching scheduled block when a different variant is picked', () => {
    const tl = window.document.getElementById('tl');
    expect(tl.textContent).toContain('strength basics');

    const id = firstQuestId(window);
    const danceId = chipVariantId(window, 'dance practice');
    window.pickQuestPool(id, danceId);

    expect(tl.textContent).toContain('dance practice');
    expect(tl.textContent).not.toContain('strength basics');
  });
});
