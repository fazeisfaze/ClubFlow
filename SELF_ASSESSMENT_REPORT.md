# Self-assessment — PA#2 Responsive Prototype, CSC13008 ClubFlow

Submitted by:

- 24121705 — Huynh Thanh Phuc
- 24127120 — Nguyen Diep Than

**Total I claim: 94 / 100**

Assessment date: November 9, 2026. Implementation assessed: commit `ce54332`.

The seven criteria and weights below come from
[PA2-rubric-responsive-prototype.pdf](PA2-rubric-responsive-prototype.pdf). The project-specific
[requirements](REQUIREMENT.md) and [ClubFlow final project brief](ClubFlow-final-project-brief.pdf)
permit React and different layouts from the supplied screens. We therefore assess the three
ClubFlow hash routes served from the committed `dist/` with JavaScript enabled and external
asset requests blocked, rather than claiming compliance with the original rubric's static-only
delivery. [PROTOTYPE.md](PROTOTYPE.md) documents the routes, actions, layout differences and stack.

| Criterion | Max | I claim | Evidence |
|---|---:|---:|---|
| 1. Three linked screens — adapted to the ClubFlow main flow | 20 | 20 | [Screen/action/link mapping](PROTOTYPE.md), [campaign](checks/campaign-flow.md), [application review](checks/application-review.md) and [scheduling checks](checks/interview-scheduling.md). The three hash routes follow the required order. [Raw browser checks](checks/rubric-fixes/browser-results.json) cover isolated decisions, draft generation, manual resolution, final confirmation and read-only behavior. Commit `d542e66` fixes validation, availability, stale settings and shared duration. |
| 2. Responsive at 360, 768 and 1280 px | 25 | 25 | [Raw measurements](checks/rubric-fixes/browser-results.json): 18 screen/theme/width cases have matching viewport/document widths, no measured non-table right-edge overflow and no measured button/link/summary targets below 44×44 px. Long-name wrapping and three dialogs at 360×640 also pass. [Full-page screenshots](screenshots/) include `<screen>-<width>.png` and `<screen>-dark-<width>.png`; [verification summary](checks/cross-screen-validation.md). |
| 3. Semantic, valid HTML | 20 | 20 | [Local Nu HTML Checker output](checks/rubric-fixes/validator-results.json): version 26.11.9, zero errors and zero warnings across 11 rendered snapshots; [state list](checks/html-validation.md). Each initial screen has one h1 and header/nav/main/footer landmarks in the [browser measurements](checks/rubric-fixes/browser-results.json). [Shared fields](src/components/Shared.jsx) link visible labels and error descriptions to controls; main-flow navigation uses anchors. |
| 4. Design you can check | 10 | 10 | [Stylesheet](assets/css/styles.css): one locally compiled Tailwind framework, its spacing scale, body/status/control text of at least 16 px, explicit touch-target sizes and no custom `!important`. The [rendered-colour scan](checks/rubric-fixes/browser-results.json) found no initial-state text contrast below 4.5:1, excluding disabled controls, in either theme. Commit `57bd331` contains touch-target and dark-warning contrast fixes. |
| 5. The brief and the rules file | 10 | 6 | [brief.md](brief.md) records scope, stack, checks and two translated actual prompts; [AGENTS.md](AGENTS.md) records routes, local assets, data integrity and prohibited claims. The brief does not preserve the complete original prompt sequence or explicitly state every spacing, breakpoint and semantic constraint. The fuller [prototype documentation](PROTOTYPE.md) does not replace evidence of those original prompts. |
| 6. AI-LOG.md | 10 | 9 | [AI-LOG.md](AI-LOG.md), especially “Fix main-flow, responsive and design defects,” records the request, changed/rejected choices, the browser scan that caught dark-mode contrast errors, the encoding issue caught visually and the final checks. Commits `d542e66`, `57bd331` and `9edd17d` identify the resulting work. Some early entries remain broad, so full marks are not claimed. |
| 7. Commit history | 5 | 4 | Git history includes separate screen commits `3ca0beb`, `2f11bb5`, `7c2baa4` and later scoped fixes `d542e66`, `57bd331`, `9edd17d`, `ce54332`. The [AI log](AI-LOG.md) explicitly records retrospective splitting and merging of the histories. The rewritten branch starts with scaffold `a048242`, followed by rules `ac148f3`, and some later commits span several screens; full marks for the requested development sequence are not claimed. |
| **Total** | **100** | **94** | **20 + 25 + 20 + 10 + 6 + 9 + 4 = 94.** |

## Checks supporting this claim

- `npm.cmd test`: **25 passed, 0 failed**. The [domain regression tests](tests/clubflow.test.mjs)
  include invalid publishing data, date/window changes, mixed durations, qualifications,
  availability, duplicate assignments and migration of existing browser state.
- `npm.cmd run build`: **passed**. The production assets are retained in [dist/](dist/).
- **33 browser flow/measurement assertions passed**, with zero page errors and zero external
  asset requests while non-local requests were blocked. See the [raw results](checks/rubric-fixes/browser-results.json).
- Local Nu HTML Checker: **11 rendered states, zero errors and zero warnings**. The checked
  HTML snapshots and raw output are in [checks/rubric-fixes/](checks/rubric-fixes/).

These results were produced by assistant-run tools and recorded in the repository. They are
not presented as additional manual checks performed by each team member. Colour/size scans
cover the recorded states; they are not a complete accessibility audit of every interaction.

## What I did not manage

- The complete original assistant-prompt transcript was not preserved in `brief.md`. We retain
  the actual prompt evidence available rather than inventing missing historical instructions.
- Some early AI-log entries lack the detail and direct commit links of the later fix records.
- The scoped history was partly reconstructed after implementation. It does not establish
  that the original work followed the rubric's exact commit sequence.
- Availability is preconfigured sample data for November 7, 2026, 09:00–11:00. This prototype
  has no separate availability-configuration screen. Unknown availability leaves an application
  Unassigned; it is not assumed to be available. CV contents are samples and persistence is
  limited to browser storage; no real upload service or production backend is claimed.
- A complete manual keyboard/screen-reader audit and final ZIP creation/reopening are not
  recorded as completed. Historical reports in `checks/rubric-audit*/` describe older snapshots;
  their earlier scores and screenshots are not evidence for this final claim.

## What I would do differently

Preserve every real prompt and its constraints when it is given, record the check and response
to each rejected result immediately, and commit each working screen and responsive pass as
the work happens. Add scheduling edge cases before integration and review accessibility in
the browser throughout development instead of relying only on unit or source-pattern tests.
