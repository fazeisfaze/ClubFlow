# AI-LOG.md — CSC13008 ClubFlow

This log records assistant contributions during this prototype session. The team owns the
implementation and should review every entry and be prepared to explain the resulting code.

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
By hand: Huynh Thanh Phuc supplied MSSV 24121705; the team explicitly left Nguyen Diep Than's MSSV blank.

## 2026-11-09 — React prototype implementation and checks
Tool: OpenCode, GPT-6 Luna.
Asked for: Implement the three screens, keep the sample flow consistent, test it against the brief, and commit completed work incrementally.
Kept: React/Vite build, local Tailwind output, reusable page shell, domain helpers, fixture data, and browser workflows.
Changed: Used local bundled assets rather than remote fonts/CDNs; replaced false initial schedule counts with two conflict rows for both sides of the real applicant overlap; made confirmed records read-only and added a closable review detail panel.
Rejected: Static HTML as the final approach after the team requested React; rejected an early edit that still created an actual resource overlap, keeping confirmation blocked until the assignment was moved to a valid slot.
By hand: The team should inspect and explain the components, interactions, sample data, tests, screenshots, and all claims in the self-assessment before submission.

The assistant ran `npm test`, `npm run build`, browser checks at 360/768/1280 px, the schedule confirmation workflow, and W3C validation. Results are recorded in `checks/`; this statement does not replace the team's own review.
