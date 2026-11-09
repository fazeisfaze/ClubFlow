import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('screen-to-screen navigation is exposed as hash-route links, not buttons', async () => {
  const [campaign, applications, schedule] = await Promise.all([
    read('src/components/CampaignPage.jsx'),
    read('src/components/ApplicationsPage.jsx'),
    read('src/components/SchedulePage.jsx'),
  ]);

  assert.match(campaign, /<ButtonLink[^>]*href="#\/applications"/);
  assert.match(applications, /<ButtonLink[^>]*href="#\/schedule"/);
  assert.match(schedule, /<ButtonLink[^>]*href="#\/applications"/);
  assert.doesNotMatch(`${campaign}${applications}${schedule}`, /onNavigate\('/);
});

test('application search and filter controls have visible labels', async () => {
  const applications = await read('src/components/ApplicationsPage.jsx');

  assert.equal((applications.match(/className="filter-label/g) || []).length, 3);
});

test('small slate and status text meet WCAG AA contrast on their backgrounds', async () => {
  const css = await read('assets/css/styles.css');
  const slate = css.match(/--color-slate-400:\s*(#[0-9a-f]{6})/i)?.[1];
  const paper = css.match(/--university-paper:\s*(#[0-9a-f]{6})/i)?.[1];
  const unassigned = css.match(/\.status-unassigned\s*\{\s*background:\s*(#[0-9a-f]{6});\s*color:\s*(#[0-9a-f]{6});/i);

  assert.ok(slate, 'slate-400 theme color exists');
  assert.ok(paper, 'page surface color exists');
  assert.ok(unassigned, 'unassigned status colors exist');

  const luminance = (hex) => {
    const channels = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const contrast = (first, second) => {
    const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };

  assert.ok(contrast(slate, '#ffffff') >= 4.5, `${slate} on white must reach 4.5:1`);
  assert.ok(contrast(slate, paper) >= 4.5, `${slate} on ${paper} must reach 4.5:1`);
  assert.ok(contrast(unassigned[2], unassigned[1]) >= 4.5, 'unassigned status text must reach 4.5:1 on its background');
});

test('dense helper text is scaled up from tiny 9–11px utility sizes', async () => {
  const css = await read('assets/css/styles.css');

  assert.match(css, /\[class~="text-\[9px\]"\][^{]*\{[^}]*font-size:\s*\.6875rem/s);
  assert.match(css, /\[class~="text-\[10px\]"\][^{]*\{[^}]*font-size:\s*\.75rem/s);
  assert.match(css, /\[class~="text-\[11px\]"\][^{]*\{[^}]*font-size:\s*\.8125rem/s);
});
