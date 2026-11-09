# Final brief “Fix these” audit

| Brief issue | Result | Evidence |
|---|---|---|
| Inconsistent application/interview dates | PASS — campaign dates are Oct 1–30, 2026; interview day is Nov 7, 2026; application timestamps fall within the application period. | `checks/shared-fixtures.md`; all three screenshots |
| Screen 2 title still says campaign creation | PASS — Application Review uses its own page heading and browser title. | `src/components/ApplicationsPage.jsx`; `src/App.jsx` |
| Review drawer obscures list | PASS — list and detail are a side-by-side panel at wide widths; at narrow widths the detail stacks above the list; the page has no horizontal overflow. | `checks/application-review.md`; viewport screenshots |
| Schedule totals mismatch rows | PASS — initial state is 5 rows: 2 Proposed, 2 Conflict, 1 Unassigned; the two affected rows of the actual applicant overlap are both identified as conflicts. | `checks/interview-scheduling.md`; `src/domain.js` |
| False schedule conflict | PASS — A01 and A02 are the same applicant and overlap 09:10–09:20. A03 starts at 09:30. | `checks/shared-fixtures.md`; `src/data.js` |
| Same people used as applicant and interviewer | PASS — applicant and interviewer fixture names are disjoint. | `src/data.js`; `checks/shared-fixtures.md` |
| University verification claim | PASS — no university account-verification feature or claim appears in the UI. | `src/`; `screenshots/` |
| Template footer text | PASS — prohibited copyright/footer links are absent. | `src/components/Shell.jsx`; screenshots |
