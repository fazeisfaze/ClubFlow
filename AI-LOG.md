# AI-LOG.md — CSC13008 ClubFlow

## 2026-11-09 — Update the self-assessment report
Tool: Codex assistant.
Prompt (English translation): “Update the self-assessment report.”
Kept: The independent 94/100 assessment of implementation `ce54332`, the two team identities and the recorded test/browser/HTML evidence.
Changed: Read the report and its official PDF template under this new request, replaced five unscored draft rows with the rubric's seven weighted criteria, linked evidence for every claim, documented remaining prompt/log/history limitations, and synchronized the submission checklist with `24121705-24127120_94.zip`.
Rejected: Retaining the obsolete assertion that rubric weights were unavailable, inventing original prompts or manual team checks, and claiming that a final ZIP already exists. Earlier independent assessments were completed without reading the report; this entry records the later explicit request to edit it.
Checks: Verified the seven maxima sum to 100, claims sum to 94 and linked local evidence exists. Reused the recorded 25-test/build, 33-browser-check and local Nu results; no application code changed and no new browser/test/build run is claimed for this documentation update.
By hand: The report is assistant-assisted self-assessment, not an official awarded mark. No manual team review, ZIP verification, commit or push is claimed for this update.

## 2026-11-09 — Commit the fixes in scoped groups
Tool: Codex assistant.
Prompt (English translation): “Split the changes into separate commits and commit them.”
Kept: The verified implementation, all current and historical evidence, and the rubric PDF.
Changed: Grouped the work into campaign/scheduling validation and connected forms; responsive styles, shell and obsolete-test cleanup; historical rubric audits; current prototype documentation/screenshots/checks; and the compiled production build. This is a retrospective split of the completed changes, not a claim that they were originally developed in that sequence.
Checks: Reran `npm.cmd test`: 25 passed, 0 failed. Checked source/document whitespace and the staged file lists; captured HTML retains the browser's whitespace-only lines verbatim and is excluded from that whitespace check. The preceding fix entry records the completed production build, browser and local Nu validation; those checks were not rerun merely to organize commits.
By hand: No manual team check is claimed. Used the existing Git author configuration. Commits are local; no push was requested or performed. The self-assessment report and its template were not read or modified.

## 2026-11-09 — Fix main-flow, responsive and design defects
Tool: Codex assistant.
Prompt (English translation): “Fix the issues in Three screens and main flow, Responsive and Design.”
Kept: Three routes/order, initial campaign dates, application identities/statuses, the five initial schedule rows and 2/2/1 totals, local React/Tailwind assets, and the rubric PDF.
Changed: Unified generation/edit/confirmation validation; persisted selected and draft settings; invalidated stale drafts; enforced a shared duration; added applicant/interviewer/room availability and stable position IDs; migrated old browser state; validated all campaign position fields and receiving dates. Increased body/control/status text to 16 px and touch targets to 44 px, improved dark warning contrast, made dialogs scroll within phone height, and refreshed documentation/screenshots.
Caught by checks: The initial browser colour scan found low-contrast required-field markers and the Unassigned total in dark mode; those colours were corrected before the final run. Visual inspection also caught damaged Vietnamese strings introduced by a PowerShell-to-Python encoding conversion; UTF-8 text was restored before the final snapshots and HTML validation.
Rejected: Trusting cached Proposed/conflict labels, permitting per-interview duration changes, claiming applicant availability without data, or reusing old screenshots/validation claims for the new implementation. Removed a static test that checked the obsolete tiny-font CSS override; actual rendered font/target sizes are measured in the browser evidence.
Checks: `npm.cmd test` passed 25 tests and `npm.cmd run build` passed. Chrome checked 18 light/dark viewport combinations plus workflow regressions; measured text was at least 16 px and independent targets at least 44×44 px, with no page overflow. Local Nu HTML Checker returned zero errors/warnings on 11 rendered states. Raw results are in `checks/rubric-fixes/`; no HTML was uploaded.
By hand: No manual team verification or final score is claimed. The self-assessment report and its template were not read or modified. No commit or push was performed for this fix pass.

## 2026-11-09 — Post-merge rubric reassessment
Tool: Codex assistant.
Asked for: Compare the merged codebase with the rubric without reading the self-assessment report.
Kept: The seven rubric weights and the explicit ClubFlow permission for React. Estimated 82/100 for source snapshot `450339d`; see `checks/rubric-audit-current.md`.
Changed: Reassessed visible labels, native navigation, improved contrast, translated prompt evidence and scoped history. Ran 17 tests and the production build, measured 18 light/dark screen-width combinations, captured 18 screenshots, and validated six rendered HTML snapshots locally with Nu HTML Checker 26.11.9: zero errors, four section-heading warnings. No HTML was uploaded to an external validator.
Rejected: Reusing the pre-merge 68/100 estimate for the updated interface or treating the passing static/unit tests as proof that all scheduling constraints hold. Browser checks still reproduced the five campaign/scheduling validation defects documented in the current audit.
By hand: No manual team verification is claimed. Neither the self-assessment report nor its PDF template was read. The score is provisional and excludes honesty, late-submission and packaging adjustments.

## 2026-11-09 — Merge the updated remote version and preserve the rubric
Tool: Codex assistant.
Asked for: Merge the new files over the old local version while keeping the rubric PDF.
Kept: The source and documentation from `origin/main` at `99b6c8e`, both Git histories, and the original `PA2-rubric-responsive-prototype.pdf` bytes.
Changed: Merged the independent histories with the incoming tracked file versions, rebuilt `dist/`, and added the rubric PDF to version control. Created `backup/before-new-files-20261109` at the previous local HEAD before merging.
Rejected: Dropping the rubric, deleting existing untracked audit evidence, or claiming that the earlier rubric assessment describes the updated interface.
Checks: `npm.cmd test` passed all 17 tests; `npm.cmd run build` passed with Vite 7.3.7. The rubric SHA-256 remained `D6002EAAA4D1D50F187E7D37A21349EDE7D04F20BB18BB8447083E50C7486BFC`. No fresh browser or W3C validation was performed for this merge.
By hand: No manual team verification is claimed. The earlier rubric audit applies to the pre-merge snapshot and has not been rescored.

This log records assistant contributions during this prototype session. The team owns the
implementation and should review every entry and be prepared to explain the resulting code.

## 2026-11-09 — University UI Kit-inspired theme
Tool: OpenCode, GPT-6 Luna.
Prompt (English translation): “Switch to the existing Figma theme: University UI Kit by Magika.” Reference: [Figma Community file 1193461935826510859](https://www.figma.com/community/file/1193461935826510859/university-ui-kit-by-magika).
Kept: Existing routes, fixtures, business rules, local-only asset policy, and React/Tailwind setup.
Changed: Added a local academic navy/blue palette with restrained gold accents and restyled the shared shell, campaign, review, and schedule presentations.
Reference limitation: The public Figma page exposed its title but not inspectable palette/component details; this is an informed interpretation, not a verified exact reproduction.
Checks at the time: the existing `npm test` suite passed (8/8) and `npm run build` passed. Follow-up accessibility fixes expanded the suite to 12 passing tests. Headless Firefox screenshot attempts timed out, so viewport/browser/W3C checks and refreshed screenshots remain incomplete; see `checks/university-theme-validation.md`.
By hand: Team members should compare the result against the actual Figma file and complete the three-width browser, screenshot, and HTML validation checks before submission.

## 2026-11-09 — Accessibility and submission evidence fixes
Tool: OpenCode, GPT-6 Luna.
Prompt (English translation): “Fix the issues shown in the evaluation screenshot.”
Changed: Replaced screen-changing buttons with hash-route links in `src/components/CampaignPage.jsx`, `src/components/ApplicationsPage.jsx`, and `src/components/SchedulePage.jsx`; added visible search/filter labels; darkened `slate-400` and increased tiny 9–11px text utility sizes in `assets/css/styles.css`; documented translated prompt inputs in `brief.md` and cross-linked implementation evidence here.
Tests-first evidence: Added `tests/accessibility-review.test.mjs`; observed all four new checks fail before the fixes, then pass after implementation. Checks cover anchor navigation, visible filter labels, 4.5:1 slate text contrast against white and the page surface, and the minimum small-text sizes.
Checks: Final `npm test` and `npm run build` results are recorded after implementation; viewport and W3C checks remain unverified in this environment. See `checks/accessibility-review.md`.
Implementation commit: `6d089fa` (`feat: apply academic theme and improve accessibility`). Documentation and specification evidence are recorded separately after this code commit.

## 2026-11-09 — Split project history into scoped commits
Prompt: “Split the commit into multiple parts instead of one large chunk.”
Changed: Replaced the published 9,105-line root commit `980f2bb` with the scoped history below, replayed the later team-ID documentation change as `328cdf2`, and updated `origin/main` using `--force-with-lease` after confirming its expected old SHA. The original history remains available locally at `backup/main-before-split-20261109`.

| Commit | Scope |
|---|---|
| `a048242` | React/Vite project scaffold |
| `ac148f3` | Project rules and Spec Kit workflow |
| `c99eeef` | Product brief and submission scope |
| `3bc14a0` | Executive recruitment feature specification |
| `3ca0beb` | Campaign setup and shared shell |
| `2f11bb5` | Application review screen |
| `7c2baa4` | Interview scheduling workflow |
| `bd39ab5` | Recruitment and scheduling rule tests |
| `74beb69` | Validation records, screenshots, and production build |
| `328cdf2` | Replay of the second team member ID update |
| `6d089fa` | University theme and accessibility fixes |

Check: The rewritten `main` tree matched the pre-rewrite `main` tree exactly before the latest theme/accessibility commit was created. `npm test` passed (12/12) and `npm run build` passed after the rewrite. The backup branch is retained for rollback; coordinate this rewritten history with collaborators.

## 2026-11-09 — Add dark theme
Tool: OpenCode, GPT-6 Luna.
Prompt: “Add a dark theme to the website.”
Changed: Added a header light/dark toggle, persisted preference with a light-mode fallback, startup theme-color synchronization, and dark palette/surface/status styles in `src/theme.js`, `src/App.jsx`, `src/components/Shell.jsx`, `assets/css/styles.css`, and `index.html`. Documented the preference in `PROTOTYPE.md`.
Tests-first evidence: `tests/theme.test.mjs` first failed because `src/theme.js` did not exist; after implementation, five theme checks passed for defaults, persistence/failure handling, toggling, accessible control wiring, dark surfaces, and text contrast.
Validation: Full test/build results and the browser-preview limitation are recorded in `checks/dark-theme.md`.

## 2026-11-09 — Project rules and feature specification
Tool: OpenCode, GPT-6 Luna.
Asked for: Derive the project constitution and three-screen feature specification from `REQUIREMENT.md` and the ClubFlow final project brief.
Kept: The brief-derived scope, user journeys, acceptance scenarios, Fix these constraints, and quality checklist.
Changed: The original static-first plan was later replaced with React and Tailwind after the team's direction.
Rejected: Initially treating the rubric as missing after the team clarified that the final-project PDF was the rubric source.
By hand: Team members must verify the requirements against their course materials and accept or amend the specification.

## 2026-11-09 — Plan and task breakdown
Tool: OpenCode, GPT-6 Luna.
Asked for: Plan the prototype and generate executable tasks grouped by user story.
Kept: The single-campaign scope, three-screen flow, data invariants, and independent review/scheduling behavior.
Changed: The plan and task paths were revised from static HTML to React/Vite/Tailwind after the team asked to use React and Tailwind where feasible. Team context was updated to two members.
Rejected: The first parallel-work example with three contributors; it did not match the two-person team.
By hand: Huynh Thanh Phuc supplied MSSV 24121705. The team initially left Nguyen Diep Than's MSSV blank and later supplied 24127120.

## 2026-11-09 — React prototype implementation and checks
Tool: OpenCode, GPT-6 Luna.
Asked for: Implement the three screens, keep the sample flow consistent, test it against the brief, and commit completed work incrementally.
Kept: React/Vite build, local Tailwind output, reusable page shell, domain helpers, fixture data, and browser workflows.
Changed: Used local bundled assets rather than remote fonts/CDNs; replaced false initial schedule counts with two conflict rows for both sides of the real applicant overlap; made confirmed records read-only and added a closable review detail panel.
Rejected: Static HTML as the final approach after the team requested React; rejected an early edit that still created an actual resource overlap, keeping confirmation blocked until the assignment was moved to a valid slot.
By hand: The team should inspect and explain the components, interactions, sample data, tests, screenshots, and all claims in the self-assessment before submission.

The assistant ran `npm test`, `npm run build`, browser checks at 360/768/1280 px, the schedule confirmation workflow, and W3C validation. Results are recorded in `checks/`; this statement does not replace the team's own review.
