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

## Latest rubric-fixes pass

- Generation, edits and final confirmation use the same authoritative validation rules:
  required assignment fields, date/window, one campaign duration, applicant identity and
  availability, interviewer qualification/availability, room availability and all overlaps.
- Selected settings and the settings used to create the current draft are stored separately.
  Changing any setting invalidates the draft until regeneration, including after reload.
- The per-assignment duration is read-only. Global duration changes require regeneration.
- A newly shortlisted application with no assignment appears as Unassigned and blocks confirmation.
- Cached Proposed labels or empty conflict arrays cannot override missing/invalid assignment data.
- Final confirmation validates the current state again before locking it.
- The table shows each assignment's date. Sample availability is explicitly explained
  as Nov 7, 2026, 09:00–11:00; dates without available resources remain Unassigned.
- The editor and confirmation dialog fit 360×640. Current raw browser/HTML evidence is in
  `checks/rubric-fixes/`, with refreshed light/dark screenshots in `screenshots/`.
