# HTML validation

Validated the built React application's rendered HTML locally using Nu HTML Checker
**26.11.9 (524d973)** on 2026-11-09. No project HTML was uploaded to an external service.

| Screen state | Errors | Result |
|---|---:|---|
| Campaign (`#/campaign`), light and dark | 0 | PASS |
| Application Review (`#/applications`), light and dark | 0 | PASS |
| Interview Scheduling (`#/schedule`), light and dark | 0 | PASS |
| Campaign preview and field-error states | 0 | PASS |
| Schedule editor, confirmation dialog and confirmed state | 0 | PASS |

The final checker result contains **0 errors and 0 warnings** across 11 rendered snapshots;
exit status 0. Raw output is `checks/rubric-fixes/validator-results.json`; checked HTML inputs
are the adjacent `.html` files. The React build is served with JavaScript enabled as required.
This result concerns the captured states; it does not claim validation of every possible
user-entered state or a complete accessibility audit.
