# Campaign flow verification

- **Build under test**: React/Vite production build in `dist/`, served locally.
- **Result**: PASS at 360, 768, and 1280 CSS px.
- Preview opens and closes without publishing the campaign.
- Clearing the required campaign name and selecting Publish sets `aria-invalid` and shows an
  error; restoring the name permits the user to continue.
- Draft and campaign fields remain in browser state; campaign details and the linked screens
  use the same configured campaign.
- Browser console/page errors: 0.
- Page width equals viewport width at all three required sizes.
- Evidence: `screenshots/campaign-360.png`, `screenshots/campaign-768.png`,
  `screenshots/campaign-1280.png`.

The test was run against a local preview build, not a deployed service.
