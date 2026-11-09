# ClubFlow Project Rules

- Follow `.specify/memory/constitution.md`, `REQUIREMENT.md`, and the ClubFlow final project brief.
- Preserve the three-screen order and hash routes: `#/campaign`, `#/applications`, `#/schedule`.
- Use React and Tailwind compiled into local assets. Do not add runtime CDN, remote font, or
  outside-network dependencies. Keep the production `dist/` build in the submission.
- Keep campaign dates, application fixtures, identities, statuses, schedule rows, and totals
  consistent with `checks/shared-fixtures.md`.
- Keep decisions attached to individual applications. Only shortlisted applications can be
  scheduled. Recheck applicant, interviewer, room, qualification, and availability conflicts
  before confirming; confirmed campaign data and schedule are read-only.
- Do not add university-account verification or prohibited template footer text. Do not claim
  production persistence, real CV uploads, or checks that were not actually run.
- Before submission run `npm test` and `npm run build`; verify all three built screens at 360,
  768, and 1280 px, validate rendered HTML, and update `checks/`, `screenshots/`, and `AI-LOG.md`
  with actual results.
- Keep all submission-facing documents in English; Vietnamese is allowed in the UI.
