import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { THEME_STORAGE_KEY, readThemePreference, saveThemePreference, toggleTheme } from '../src/theme.js';

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    values,
  };
}

test('theme preference defaults to light and accepts only a saved dark preference', () => {
  assert.equal(readThemePreference(createStorage()), 'light');
  assert.equal(readThemePreference(createStorage({ [THEME_STORAGE_KEY]: 'dark' })), 'dark');
  assert.equal(readThemePreference(createStorage({ [THEME_STORAGE_KEY]: 'sepia' })), 'light');
});

test('theme preference persists safely when storage is available or blocked', () => {
  const storage = createStorage();
  saveThemePreference('dark', storage);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), 'dark');
  assert.doesNotThrow(() => saveThemePreference('light', { setItem() { throw new Error('blocked'); } }));
});

test('theme toggle switches between light and dark', () => {
  assert.equal(toggleTheme('light'), 'dark');
  assert.equal(toggleTheme('dark'), 'light');
});

test('the header exposes a labelled pressed-state theme switch and CSS dark surfaces', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');

  assert.match(app, /readThemePreference\(\)/);
  assert.match(app, /theme=\{theme\} onToggleTheme=/);
  assert.match(shell, /aria-pressed=\{theme === 'dark'\}/);
  assert.match(shell, /aria-label=\{theme === 'dark' \?[^}]+: [^}]+\}/);
  assert.match(html, /localStorage\.getItem\('clubflow-color-theme'\)/);
  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(css, /\[data-theme="dark"\].*bg-white/s);
});

test('dark theme muted text keeps readable contrast on the dark page surface', async () => {
  const css = await readFile(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
  const darkTokens = css.match(/:root\[data-theme="dark"\]\s*\{([^}]+)\}/)?.[1];
  const paper = darkTokens?.match(/--university-paper:\s*(#[0-9a-f]{6})/i)?.[1];
  const muted = darkTokens?.match(/--color-slate-400:\s*(#[0-9a-f]{6})/i)?.[1];

  assert.ok(paper, 'dark page surface token exists');
  assert.ok(muted, 'dark muted-text token exists');
  const luminance = (hex) => {
    const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const values = [luminance(paper), luminance(muted)].sort((a, b) => b - a);
  assert.ok((values[0] + 0.05) / (values[1] + 0.05) >= 4.5, `${muted} on ${paper} must reach 4.5:1`);
});
