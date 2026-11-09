# Interview Scheduling verification

- **Build under test**: React/Vite production build in `dist/`, served locally.
- **Initial fixture totals**: 5 rows = 2 Proposed + 2 Conflict + 1 Unassigned. Both conflict rows
  are for An Nguyễn's overlapping applications, A01 (09:00–09:20) and A02 (09:10–09:30).
- A03 starts at 09:30, so it does not overlap A02; no false conflict is reported for that row.
- Confirmation is disabled while conflict and unassigned rows remain.
- Moving A02 to 09:50–10:10 and assigning A04 to 10:20–10:40 clears both issues. The system
  rechecks applicant, interviewer, and room intervals.
- Confirming changes all five rows to Confirmed and disables schedule editing/generation.
  Navigating back confirms campaign fields and application decisions are read-only too.
- The schedule CSV export contains its header and all five initial schedule rows.
- Browser console/page errors: 0; document width equals viewport width at all required sizes.
- Evidence: `screenshots/schedule-360.png`, `screenshots/schedule-768.png`,
  `screenshots/schedule-1280.png`, `screenshots/schedule-ready-1280.png`.
