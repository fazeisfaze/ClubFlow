# Cross-screen validation

- **Build command**: `npm run build` — passed; generated `dist/index.html` and local assets.
- **Rule tests**: `npm test` — 25 passed, 0 failed in the latest rubric-fixes pass.
- **Viewport widths**: 360, 768, and 1280 CSS px. On each screen, `document.documentElement.scrollWidth`
  equaled the viewport width in both light and dark themes (18 combinations).
- **Text and targets**: the smallest rendered text was 16 px; no measured button, link or
  summary target was below 44 px in either dimension. No foreground text contrast below
  4.5:1 was found by the default-state browser colour scan, excluding disabled controls.
- **Navigation**: `#/campaign`, `#/applications`, and `#/schedule` each loaded the expected
  screen and title from the built app.
- **Offline asset check**: all three built routes loaded while the browser blocked non-local
  requests; 0 external requests were attempted.
- **Browser runtime**: 0 page errors across the tested flows.
- **Interaction coverage**: campaign preview and invalid required field; review search, close
  detail/filter retention, per-application decision; schedule conflict/unassigned blocking,
  resolution, confirmation, and post-confirm read-only behavior.
- **Regression coverage**: invalid position/quota, interview dates before the deadline,
  persisted stale date/window/duration changes, uniform duration after regeneration,
  unavailable applicants, unqualified interviewers and cached Proposed-state bypass attempts.
- **Mobile dialogs**: campaign preview, schedule editor and confirmation fit a 360×640 viewport.
- **Long content**: a separate browser-only long campaign/applicant-name scenario wrapped
  without page overflow at 360 px; the submitted initial identities remain unchanged.
- **Evidence**: corresponding records in `checks/campaign-flow.md`,
  `checks/application-review.md`, `checks/interview-scheduling.md` and screenshots.
- **Current raw evidence**: `checks/rubric-fixes/browser-results.json` and
  `checks/rubric-fixes/validator-results.json`. Earlier rubric-audit directories describe
  earlier snapshots and are not the current implementation's score or verification.
