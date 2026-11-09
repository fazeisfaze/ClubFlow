# Post-merge rubric assessment

Date: 2026-11-09. Source snapshot: `450339d`.

Estimated mark: **82/100** before late, packaging or honesty adjustments. This is an
independent estimate, not an official grade. Neither `SELF_ASSESSMENT_REPORT.md` nor its
PDF template was read. The earlier 68/100 assessment concerns the pre-merge code.

## Interpretation

The seven rubric weights are retained. `REQUIREMENT.md` and the ClubFlow final brief
explicitly permit React, require `dist/`, and allow different layouts from the original
screens. Accordingly, React, hash routes and the revised screen designs are not penalized.
The rubric PDF's original JavaScript-disabled/static-only requirement conflicts with that
permission. The literal static interpretation would yield a very different score: the
current application shows an empty body and zero headings with JavaScript disabled.

## Criterion estimates

| Criterion | Maximum | Estimate | Assessment |
|---|---:|---:|---|
| Three linked screens and the required flow | 20 | 17 | All three routes, native navigation links, isolated application decisions, initial conflict blocking, generation and confirmation work. The functional integrity defects below remain. `PROTOTYPE.md` also lacks the full screen/action/destination mapping. No deduction is made merely for changing the supplied screen layouts. |
| Responsive at 360, 768 and 1280 px | 25 | 18 | All 18 light/dark screen-width combinations have matching viewport and document widths and no measured non-table overflow. Tables have their own scrolling wrappers. Many independent buttons and links remain 36–40 px tall rather than 44 px. Table ID controls are smaller still. The smallest text is now 11 px; much content is 12–14 px. |
| Semantic, valid HTML | 20 | 20 | Local Nu HTML Checker reports zero errors for all six default rendered screen/theme states. The campaign has section-heading warnings, which the rubric permits. Each screen has one h1 and header/nav/main/footer landmarks. Search/filter labels are visible, and main-flow navigation uses anchors. This is not a claim of a complete accessibility or modal-keyboard audit. |
| Design you can check | 10 | 8 | A consistent single-framework palette and spacing system, no custom `!important`, and improved light/dark presentation. Sample slate-400 text now measures 5.44:1 against white. Body/table/helper text remains below the rubric's 16 px criterion; the contrast sample does not establish that every state passes. |
| The brief and the rules file | 10 | 6 | Root rules record the stack and prohibited behavior. `brief.md` now includes two translated user prompts, improving provenance. It still mainly summarizes delivered scope and lacks the complete initial prompt sequence, explicit spacing scale, breakpoint definitions and several detailed semantic constraints. `PROTOTYPE.md` still lacks its own Team, CSS, full screen mapping, and remaining-controls sections. |
| AI-LOG.md | 10 | 9 | Specific prompts, changed/rejected decisions, reported failed-then-passing checks, implementation paths and commit references. It honestly records browser limitations and that the Figma theme is an interpretation. Some original entries remain broad and some check documents refer to earlier snapshots. The failed-before-fix claims are recorded history, not independently reproduced in this audit. |
| Commit history | 5 | 4 | The merged history contains separate campaign, review, scheduling, test and theme/accessibility commits. It was explicitly split retrospectively and later merged with the former monolithic history; it is not proof of naturally incremental development. The rewritten branch starts with scaffold, then rules, rather than rules first. |
| **Total** | **100** | **82** | An estimate using rubric performance bands, without invented fixed per-bug penalties. |

The 14-point increase from the earlier estimate comes from semantic HTML (+5), design (+2),
prompt evidence (+2), AI log detail (+2), and scoped history (+3). The core flow and
responsive estimates remain unchanged because the previously reproduced functional defects
and undersized targets remain.

## Current positive evidence

- `npm.cmd test`: **17 passed, 0 failed**.
- `npm.cmd run build`: **passed**, Vite 7.3.7, local production assets generated.
- Built app served locally at `127.0.0.1:4173` in Chrome.
- Three routes at 360, 768 and 1280 px, in light and dark themes: **18 measured cases**.
- Zero page errors and zero external asset requests during those browser flows.
- One h1 and all four main page landmarks in each initial screen.
- Light/dark switching and saved dark preference survive route navigation/reload.
- A01 rejection leaves A02 Shortlisted.
- Initial confirmation is disabled; generating a valid default draft permits confirmation;
  confirmed state disables regeneration.
- At 360 px, 9/13 measured targets on Campaign, 23/26 on Applications and 12/15 on
  Schedule are below 44 px. Counts include the logo, theme button, table controls and
  disabled controls; enabled normal action buttons also measure 40 px.

Raw browser measurements: `checks/rubric-audit-current/results.json`.
Full-page captures: `screenshots/rubric-audit-current/` (18 images).

## Local HTML validation

Nu HTML Checker **26.11.9 (524d973)** was installed into a temporary tools directory and
run locally against six browser-rendered snapshots: Campaign, Applications and Schedule,
each in light and dark mode. Exit status: **0**. Errors: **0**. Warnings: **4**, all for
the two department sections without headings in each campaign theme snapshot.

Raw checker output: `checks/rubric-audit-current/validator-rendered.json`.
Rendered inputs: `checks/rubric-audit-current/*-rendered.html`.

This is the Nu checker used locally, not a new upload to the hosted W3C website. No project
content was uploaded. Validation covers these six default rendered states, not every modal,
error or arbitrary edited state. Viewport measurement excludes overflow within table scroll
wrappers and does not establish that every possible edited state is free of overlap.

## Functional defects still reproduced after the merge

1. **Interview before application deadline is confirmable.** From a fresh sample state,
   choose 2026-10-01, generate a draft, and observe confirmation enabled despite the
   2026-10-30 application deadline. `src/domain.js:41` does not validate this timeline.
2. **Confirmation summary date differs from assignment dates.** Generate the default
   2026-11-07 draft, change the date to 2026-12-01 without regeneration, and open the
   confirmation summary. It shows December 1 while stored assignments retain November 7.
   See `src/components/SchedulePage.jsx:125` and `:152`.
3. **Mixed interview durations are accepted.** Generate 20-minute slots, edit the first
   assignment to 15 minutes, and save. Other assignments remain 20 minutes, yet confirmation
   remains enabled. The brief requires one duration for the whole campaign.
4. **Changing the time window does not invalidate the existing draft.** Generate a valid
   draft, change the end of the window to 09:05, and observe confirmation still enabled
   with interviews extending past that time.
5. **Invalid position data can be published.** Clear the first position title, set its quota
   to zero and publish. The campaign is Published with a success message.
   `src/domain.js:6` validates only top-level fields and opening/closing ordering.

Source inspection also finds no applicant availability data or checks in generation, and no
Executive controls for configuring interviewer qualifications/availability; interviewers and
rooms are fixed imports. These are source findings, not simulated applicant availability
interaction results. The three-screen milestone does not require implementing unrelated
applicant/interviewer portals, real uploads or a production backend.

## Priorities

1. Enforce one shared scheduling validation before saving and confirming: dates, one campaign
   duration, applicant/interviewer availability, qualification, rooms and overlaps. Invalidate
   or regenerate the draft when its date/window/duration changes.
2. Validate all department/position requirements and positive integer quotas before publishing.
3. Increase independent tap targets to at least 44 px and body text to the rubric's 16 px.
4. Complete `PROTOTYPE.md` and retain real prompt evidence instead of inventing past prompts.
5. Keep old checks clearly associated with their tested snapshot; reference the new evidence
   for the current interface.

No source implementation or self-assessment report was modified during this assessment.
