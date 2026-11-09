# Independent rubric assessment — 2026-11-09

Estimated mark: **68/100**, before submission penalties or the honesty adjustment. This is
an evidence-based estimate, not an official grade. `SELF_ASSESSMENT_REPORT.md` and its PDF
template were not read for this assessment.

## Applicable requirements

Read `PA2-rubric-responsive-prototype.pdf` (seven pages),
`ClubFlow-final-project-brief.pdf`, `REQUIREMENT.md`, `AGENTS.md`, and the constitution.
The original rubric requires static HTML with JavaScript disabled. The project-specific
requirements and final brief explicitly permit React, require a production `dist/`, and
allow different layouts from the supplied screens. This assessment applies those changes
to the rubric. It does not deduct marks merely for React, hash routes, or differences from
the original PA#1 screens. The static-only interpretation would produce a substantially
different result: a JavaScript-disabled browser rendered an empty body and zero headings.

## Estimated marks

| Criterion | Maximum | Estimate | Evidence and remaining limitations |
|---|---:|---:|---|
| Three linked screens and the required flow | 20 | 17 | All three built hash routes load in order. Per-application decisions, initial confirmation blocking, draft generation and confirmation work. Scheduling integrity and campaign validation defects below prevent treating the flow as complete. `PROTOTYPE.md` lists routes but omits the detailed screen/action/link mapping requested by the rubric. |
| Responsive at 360, 768 and 1280 px | 25 | 18 | All nine initial route/width combinations have matching viewport and document widths, with no measured non-table content beyond the right edge. Tables scroll in their wrappers, which the rubric permits. Numerous independent controls are below 44 px, and small text reduces phone readability. Full-page captures are in `screenshots/rubric-audit/`. |
| Semantic, valid HTML | 20 | 15 | Every measured screen has one h1 and header/nav/main/footer landmarks. Search and filter labels in `ApplicationsPage.jsx:57` are visually hidden, while the rubric asks for visible labels. Several forward/back navigation controls use buttons instead of anchors. Existing `checks/html-validation.md` reports zero W3C errors; this audit did not independently rerun W3C, so the estimate remains provisional. |
| Design you can check | 10 | 6 | One locally compiled Tailwind framework, a consistent spacing system, and no custom `!important`. Much body and table text is 9–14 px rather than the rubric's 16 px minimum. Sample slate-400 text on white measures approximately 2.63:1 rather than 4.5:1. |
| The brief and the rules file | 10 | 4 | The root rules file records the stack, constraints, prohibited claims and checks. `brief.md` describes delivered scope, rather than preserving the actual prompts in order as requested. It omits an explicit spacing scale, breakpoint definitions and several semantic constraints. No original prompt transcript was available to verify its provenance. |
| AI-LOG.md | 10 | 7 | Existing entries name the tool, requests, Changed and Rejected decisions, including concrete scheduling corrections. They do not clearly connect each correction to the exact check and user follow-up; the broad implementation commit limits traceability. This estimate evaluates entries that existed before this audit. |
| Commit history | 5 | 1 | Two commits: `980f2bb` puts rules, all three screens, responsive styling and checks in one initial commit; `8c3040c` updates team documentation. There are no separate page commits or responsive-pass commit. |
| **Total** | **100** | **68** | Provisional; no self-assessment comparison or submission penalties applied. |

The rubric does not assign fixed deductions to individual bugs. The estimates above use its
performance bands and the revised functional brief; defects are not separate additive fines.

## Reproduced functional defects

1. **An interview before applications close can be confirmed.** Reset the sample state,
   select 2026-10-01 as the interview date, then generate a draft. Applications close on
   2026-10-30, but the confirmation button is enabled. `generateSchedule` and
   `canConfirmSchedule` in `src/domain.js` do not check this timeline.
2. **The confirmation summary can show a different date from the assignments.** Generate
   the default draft for 2026-11-07, then change the date to 2026-12-01 without regenerating.
   The dialog says December 1 while persisted assignments still say November 7.
   See `src/components/SchedulePage.jsx:125` and `:152`.
3. **Mixed interview durations are accepted.** Generate the 20-minute draft, edit A01 to
   15 minutes, and save. Other interviews remain 20 minutes and confirmation is enabled.
   The final brief requires one duration for the whole campaign. See
   `src/components/SchedulePage.jsx:150`.
4. **Changing the scheduling window does not invalidate the draft.** Generate a valid
   draft, then change the window end to 09:05. Assignments outside the window remain
   confirmable. `checkedAssignments` rechecks overlaps, not all current constraints.
5. **Incomplete position details can be published.** Clear the first position title and
   set its quota to zero, then publish. The UI reports successful publication.
   `validateCampaign` in `src/domain.js:6` checks only top-level fields and date ordering.

Additional source-level gaps: the fixtures contain no applicant availability and generation
checks only interviewer availability; interviewer qualifications/availability and existing
rooms are fixed imports, without Executive configuration controls. These findings are from
code inspection, not a simulated applicant availability interaction.

## Checks actually performed

- `npm.cmd test`: 8 passed, 0 failed.
- `npm.cmd run build`: passed with Vite 7.3.7.
- Headless local Chrome against the built `dist/`, served at `127.0.0.1:4173`.
- Nine initial screen/viewport combinations at 360, 768 and 1280 px. Each has one h1,
  the four page landmarks, and no measured document overflow. The overflow check excludes
  content inside the table scrolling wrappers. It does not prove every possible edited or
  modal state is free from overlap.
- At 360 px: 8 of 12 measured targets on Campaign, 22 of 25 on Applications, and 10 of 14
  on Schedule were below 44 px. Counts include the logo link, table buttons, summary
  control and disabled buttons; normal enabled action buttons also measured 40 px.
- Required campaign name rejection, isolated A01 rejection, initial schedule blocking,
  generation, confirmation and disabled regeneration after confirmation.
- Five negative interaction cases documented above.
- Zero page errors and zero external asset requests during the local browser checks.
- Contrast samples were computed from browser-resolved foreground/background colours;
  this was a sample, not a complete contrast or accessibility audit.
- JavaScript-disabled comparison: empty body and zero h1 elements.

Raw measurements: `checks/rubric-audit/results.json`. Initial rendered DOM snapshots:
`checks/rubric-audit/*-rendered.html`. Full-page screenshots:
`screenshots/rubric-audit/<screen>-<width>.png`.

W3C validation was not rerun. Automatic approval review rejected the proposed external
upload of rendered HTML because assessment authorization did not establish permission to
export the project content. The upload was removed and the remaining audit ran locally.
Existing W3C claims have therefore been kept distinct from newly verified results.

No application implementation was changed. No final zip, late penalty or honesty adjustment
was evaluated, and no self-assessment report content was consulted.
