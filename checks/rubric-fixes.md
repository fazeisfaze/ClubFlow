# Flow, responsive and design fixes

Date: 2026-11-09. This record supersedes the earlier rubric-audit results for the changed
implementation. Neither the self-assessment report nor its PDF template was read or edited.

## Changes

| Previously reproduced issue | Resulting behavior |
|---|---|
| Interviews could precede the application deadline | Invalid dates block generation and confirmation; field errors identify the problem. |
| A changed date could disagree with the confirmation summary | All selected settings persist. A mismatch with draft settings blocks edit/confirmation until regeneration, and rows show their own dates. |
| Different interviews could have different durations | Duration belongs to the campaign; it is read-only in the individual editor. Generation and confirmation check every interval. |
| A changed window did not invalidate the draft | Any date/window/duration change invalidates the existing draft, including after reload. |
| Applicant availability was not represented | Each fixture has explicit availability. Generation and final validation require applicant, interviewer and room availability, plus qualifications and conflict freedom. |
| Invalid position details could be published | Department/position names, descriptions, requirements and positive integer quotas are checked with field-linked messages. Existing submission dates must fit the receiving period. |
| Small targets and small text | Default body/control/status text is at least 16 px and independent buttons/links/summary controls have minimum 44×44 px targets. Tables keep local scroll wrappers. |
| Dark warning colours lacked contrast | Required-field and unassigned-count colours were adjusted using actual rendered-colour measurements. |

All initial fixture dates, identities, six applications and five schedule rows remain intact.
Initial schedule totals remain 2 Proposed + 2 Conflict + 1 Unassigned. Applicant/interviewer
and room availability is configured for November 7, 2026, 09:00–11:00. There is no new
availability-configuration screen; choosing unsupported dates correctly leaves rows Unassigned.

The production build and all three hash routes remain local-only. Existing browser state is
hydrated with the new fixture availability/settings rather than requiring users to clear it.
Unknown applicants without availability stay unschedulable. Confirmed state remains read-only.

## Verification

- `npm.cmd test`: **25 passed, 0 failed**. Regression tests cover invalid publishing data,
  dates/windows, all changed-setting cases, mixed durations, missing/corrupt cached assignments,
  qualifications, all resource availability, duplicate assignment records, newly shortlisted
  applications, and migration of legacy browser state.
- `npm.cmd run build`: **passed**, Vite 7.3.7; local `dist/` retained.
- Built-app Chrome checks: **18 screen/theme/width combinations** at 360, 768 and 1280 px.
- In all measured combinations, document width equals viewport width; no measured non-table
  element crosses the right edge. Table content is permitted to scroll inside its own wrapper.
- Minimum measured text size: **16 px**. No measured button, anchor or summary target is
  below **44×44 px**. Checkbox labels provide the larger activation area.
- The rendered-text colour scan found no contrast ratios below **4.5:1** in the initial states,
  excluding disabled controls. This is a browser colour scan, not a complete accessibility audit.
- Browser regression flows include publication validation, search/filter retention, isolated
  decisions, note reload, six-row CSV export, manual conflict/unassigned resolution, confirmation,
  post-confirm locks, stale-setting reload, generation at 15 minutes, applicant unavailability,
  unqualified interviewer and cached-status bypass prevention.
- Preview, edit and confirmation dialogs fit **360×640**. A browser-only long-name scenario
  also has no page overflow; the source fixture identities were preserved.
- Browser page errors: **0**. External asset requests: **0** while non-local requests were blocked.
- Local Nu HTML Checker **26.11.9 (524d973)**: **0 errors, 0 warnings** across 11 initial,
  error, preview, edit, confirmation and confirmed HTML snapshots; no external upload.

## Evidence

- `checks/rubric-fixes/browser-results.json`: measured sizes, colours, overflow and flow checks.
- `checks/rubric-fixes/validator-results.json`: raw local checker output.
- Adjacent HTML files are the exact checked browser-rendered snapshots; the CSV is the sample
  download checked during the browser flow.
- `screenshots/<screen>-<width>.png` and `<screen>-dark-<width>.png`: 18 refreshed full-page captures.
- `screenshots/schedule-ready-1280.png`: manually resolved draft before confirmation.

No grade, production persistence, real CV upload, exhaustive accessibility audit or final ZIP
verification is claimed. Earlier audit reports describe earlier snapshots and their scores
should not be reused for this implementation without a fresh assessment.
