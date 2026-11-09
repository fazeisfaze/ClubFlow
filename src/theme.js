export const THEME_STORAGE_KEY = 'clubflow-color-theme';

export function readThemePreference(storage) {
  try {
    const savedTheme = (storage ?? globalThis.localStorage)?.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveThemePreference(theme, storage) {
  if (theme !== 'light' && theme !== 'dark') return;
  try {
    (storage ?? globalThis.localStorage)?.setItem(THEME_STORAGE_KEY, theme);
  } catch { /* The selected theme still applies for the current page. */ }
}

export function toggleTheme(theme) {
  return theme === 'dark' ? 'light' : 'dark';
}
