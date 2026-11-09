# Cross-screen validation

- **Build command**: `npm run build` — passed; generated `dist/index.html` and local assets.
- **Rule tests**: `npm test` — 8 passed, 0 failed.
- **Viewport widths**: 360, 768, and 1280 CSS px. On each screen, `document.documentElement.scrollWidth`
  equaled the viewport width.
- **Navigation**: `#/campaign`, `#/applications`, and `#/schedule` each loaded the expected
  screen and title from the built app.
- **Offline asset check**: all three built routes loaded while the browser blocked non-local
  requests; 0 external requests were attempted.
- **Browser runtime**: 0 page errors across the tested flows.
- **Interaction coverage**: campaign preview and invalid required field; review search, close
  detail/filter retention, per-application decision; schedule conflict/unassigned blocking,
  resolution, confirmation, and post-confirm read-only behavior.
- **Evidence**: corresponding records in `checks/campaign-flow.md`,
  `checks/application-review.md`, `checks/interview-scheduling.md` and screenshots.
