# AI-LOG.md — CSC13008 ClubFlow

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
