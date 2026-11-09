# Application Review verification

- **Build under test**: React/Vite production build in `dist/`, served locally.
- **Result**: PASS at 360, 768, and 1280 CSS px.
- Searching for An Nguyễn returns the two separate applications (A01 and A02).
- Closing the selected-application detail keeps the current search value; selecting a row opens
  that application's detail again.
- Rejecting A01 leaves A02 Shortlisted, confirming decisions are per application.
- Saving an internal note survives a local reload in the same browser; the exported application
  CSV contains the header and all six fixture rows.
- Internal notes are rendered only in the Executive review panel. CV sample preview and
  motivation statement are available in the selected record.
- Browser console/page errors: 0; document width equals viewport width at all required sizes.
- Evidence: `screenshots/applications-360.png`, `screenshots/applications-768.png`,
  `screenshots/applications-1280.png`.
