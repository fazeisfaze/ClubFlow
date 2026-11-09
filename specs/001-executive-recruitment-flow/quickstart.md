# Quickstart: Validate the Executive Recruitment Flow

This guide is for validating the implemented prototype after source pages are created. It does
not claim that implementation or verification has already occurred.

## Prerequisites

- A modern browser with responsive/device emulation and the ability to disable JavaScript.
- W3C HTML Checker access or an equivalent local validator.
- Repository root as the working directory.

## Run

Install dependencies with `npm install`, build with `npm run build`, then serve `dist/` with a
local static file server. Open the paths listed in `PROTOTYPE.md`; each path uses a hash route so
it works without server-side route fallback. Do not use a development CDN or remote assets.

## Validation scenarios

1. **Navigation and campaign**: check `index.html` is the campaign screen; exercise draft,
   preview, invalid publication, valid publication, and navigation. Confirm a page transition
   alone does not change application records.
2. **Application review**: search/filter and open a record; confirm list and detail remain
   readable. Close detail and check filters remain. Shortlist/reject one application and verify
   another position's application for the same student is unchanged. Confirm internal notes are
   not exposed outside Executive context.
3. **Scheduling**: generate a draft with shortlisted records, inspect Proposed/Unassigned/
   Conflict counts against rows, resolve a deliberately valid conflict example, and verify that
   incomplete or conflicting drafts cannot be confirmed. Confirm the complete schedule and
   verify the confirmed state is read-only.
4. **Responsive behavior**: repeat at viewport widths 360, 768, and 1280 CSS px. Check the
   page document width does not exceed the viewport and all controls/content are reachable.
5. **Built offline behavior**: serve `dist/` with outside network blocked and load all three
   documented screen paths. Confirm built CSS/JS load from local files.
6. **HTML validity**: validate the delivered `dist/index.html` with W3C. Record zero-error results in
   `checks/` and capture representative screenshots in `screenshots/`.
7. **Fix these audit**: explicitly verify shared dates, correct page titles, readable review
   drawer, matching schedule counts, genuine overlap examples, distinct applicant/interviewer
   identities, no verification claims, and absence of prohibited template footer text.

## Expected outcome

All scenarios above pass, validation reports zero HTML errors per screen, and actual evidence is
saved in the submission folders. Any failure must be recorded and fixed before claiming success.

See [data-model.md](data-model.md) for entity/state invariants and
[contracts/screen-interactions.md](contracts/screen-interactions.md) for screen-level behavior.
