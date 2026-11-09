# HTML validation

Validated the three rendered React screen states from the production preview using the W3C
Nu HTML Checker on 2026-11-09.

| Screen state | Errors | Result |
|---|---:|---|
| Campaign (`#/campaign`) | 0 | PASS |
| Application Review (`#/applications`) | 0 | PASS |
| Interview Scheduling (`#/schedule`) | 0 | PASS |

The checker returned informational notices for the campaign document's void-element slash
syntax only; there were no errors. The React build is served with JavaScript enabled as required.
