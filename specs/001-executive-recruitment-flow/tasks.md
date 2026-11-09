# Tasks: Executive Recruitment Flow Prototype

**Input**: Design documents from `specs/001-executive-recruitment-flow/`

**Prerequisites**: `plan.md`, `spec.md`; supporting context in `research.md`, `data-model.md`,
`contracts/screen-interactions.md`, and `quickstart.md`.

**Tests**: Domain rules are covered with Node's built-in test runner. Browser verification, W3C
validation, and submission evidence are also required by the spec and included as tasks.

**Organization**: Tasks are grouped by user story so campaign setup, review, and scheduling can
be implemented and checked as increments.

## Format: `- [ ] [ID] [P?] [Story?] Description with file path`

- **[P]**: Can be performed in parallel with other tasks in the phase (separate files/no
  dependency).
- **[Story]**: User story label for story-phase tasks: `[US1]`, `[US2]`, or `[US3]`.
- Every task names the file or directory it changes.

## Phase 1: Setup

**Purpose**: Create the planned static-site and verification structure.

- [X] T001 [P] Create React/Vite project configuration in `package.json` and `vite.config.js` with build, preview, and test scripts
- [X] T002 [P] Create React entry document in `index.html` and bootstrap module in `src/main.jsx`
- [X] T003 [P] Install React, React DOM, Vite, Tailwind CSS, and the Tailwind Vite plugin; record locked versions in `package-lock.json`
- [X] T004 [P] Create `screenshots/` and `checks/` directories for required submission evidence

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared presentation and interaction rules before implementing screens.

- [X] T005 [P] Create Tailwind entry styles, shared color/type tokens, focus states, and responsive layout utilities in `assets/css/styles.css`
- [X] T006 [P] Implement campaign validation, independent application decisions, time overlap checks, schedule confirmation gates, and summary helpers in `src/domain.js`
- [X] T007 [P] Define shared campaign, application, interviewer, room, and initial schedule fixtures in `src/data.js` using `checks/shared-fixtures.md`
- [X] T008 Document shared campaign identity, coherent sample timeline, and screen navigation destinations in `checks/shared-fixtures.md`

**Checkpoint**: Shared visual, accessibility, navigation, and sample-data conventions are ready.

---

## Phase 3: User Story 1 - Configure and publish a campaign (Priority: P1) 🎯 MVP

**Goal**: Executive can configure campaign details, save a draft, preview it, and publish only
valid information.

**Independent Test**: Open `index.html`; save/reopen a draft, preview without publishing, test
missing fields and invalid dates, then publish valid details and follow the Applications link.
The next page must use the same campaign and must not gain applications merely because of
navigation.

### Implementation for User Story 1

- [X] T009 [US1] Build the semantic Create Recruitment Campaign screen in `src/components/CampaignPage.jsx` with campaign name, host club, description, dates, and instructions
- [X] T010 [US1] Add editable department/position controls with quotas, job descriptions, and requirements in `src/components/CampaignPage.jsx`
- [X] T011 [US1] Implement draft, preview, and publish interactions with required-field/date validation and retained valid input in `src/components/CampaignPage.jsx` and `src/App.jsx`
- [X] T012 [US1] Add campaign title, shared campaign/date summary, and hash navigation toward Application Review in `src/components/Shell.jsx`
- [X] T013 [US1] Verify draft/preview/publish behavior, validation errors, and navigation in the React build; record results in `checks/campaign-flow.md`

**Checkpoint**: Campaign setup is independently demonstrable and invalid campaigns cannot publish.

---

## Phase 4: User Story 2 - Review each submitted application independently (Priority: P2)

**Goal**: Executive can find, inspect, annotate, and decide individual position applications;
only shortlisted applications proceed.

**Independent Test**: Open `applications.html` directly with fixture records. Search/filter,
inspect and close a record, then shortlist/reject separate applications for one applicant and
verify decisions/filters are independent. Confirm the list and detail remain readable at 360,
768, and 1280 px.

### Implementation for User Story 2

- [X] T014 [US2] Build the Application Review screen with submitted-application table, applicant/position/time/status columns, and sample records in `src/components/ApplicationsPage.jsx`
- [X] T015 [US2] Add search, status/position filters, sorting, pagination, statistics, and CSV export in `src/components/ApplicationsPage.jsx`
- [X] T016 [US2] Add selected-application detail drawer with CV/statement preview, executive-only note, and shortlist/reject controls in `src/components/ApplicationsPage.jsx`
- [X] T017 [US2] Implement independent application state, retained list filters, responsive list/detail layout, and shortlisted-only continuation in `src/App.jsx` and `src/components/ApplicationsPage.jsx`
- [X] T018 [US2] Add hash navigation to Interview Scheduling; show only shortlisted applications in its handoff state in `src/components/ApplicationsPage.jsx`
- [X] T019 [US2] Verify independent decisions, note visibility, filter retention, CSV output, navigation, and 360/768/1280 px layout; record results and screenshots in `checks/application-review.md` and `screenshots/`

**Checkpoint**: Applications remain independent, internal notes stay private, and only eligible
shortlisted records can continue.

---

## Phase 5: User Story 3 - Prepare and confirm a conflict-free interview schedule (Priority: P3)

**Goal**: Executive can generate, review, adjust, and confirm a complete conflict-free schedule
for shortlisted applications.

**Independent Test**: Open `schedule.html` with shortlisted fixture applications. Generate a
draft using one allowed duration and available people/rooms; check totals against rows; exercise
an actual overlap and an unassigned case; verify confirmation is blocked until all gates pass,
then confirm and check read-only behavior.

### Implementation for User Story 3

- [X] T020 [US3] Build the Interview Scheduling screen with campaign/date/time/duration inputs and schedule table in `src/components/SchedulePage.jsx`
- [X] T021 [US3] Implement sequential first-available slot/interviewer/room assignment and reasoned Unassigned state using `src/data.js` and `src/domain.js`
- [X] T022 [US3] Implement Edit, Resolve, and + Assign Slot actions with revalidation of qualification, availability, applicant/interviewer/room overlaps in `src/components/SchedulePage.jsx`
- [X] T023 [US3] Implement save-draft and guarded confirmation; require closed applications, all reviewed, all shortlisted assigned, and no conflicts; lock state after confirmation in `src/App.jsx` and `src/components/SchedulePage.jsx`
- [X] T024 [US3] Ensure status totals equal rows, every conflict is a real overlap, sample identities remain distinct, and add schedule CSV export in `src/components/SchedulePage.jsx`
- [X] T025 [US3] Verify unassigned/conflict/confirmation cases, read-only confirmed state, coherent dates, and 360/768/1280 px layout; record results and screenshots in `checks/interview-scheduling.md` and `screenshots/`

**Checkpoint**: Draft adjustments are rechecked and confirmation is blocked unless all schedule
requirements are satisfied.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete prototype and prepare truthful submission evidence.

- [X] T026 [P] Audit all three React screens against every Fix these item; record outcomes and any remediation in `checks/fix-these-audit.md`
- [X] T027 [P] Run W3C validation on the built `dist/index.html` and document zero errors in `checks/html-validation.md`
- [X] T028 [P] Verify all hash-route paths, no horizontal overflow at 360/768/1280 px, and offline loading of built CSS/JS; record actual results in `checks/cross-screen-validation.md`
- [X] T029 Capture final campaign, review, schedule, and responsive screenshots from `dist/` in `screenshots/`
- [X] T030 Write `PROTOTYPE.md` with `dist/index.html#/campaign`, `dist/index.html#/applications`, and `dist/index.html#/schedule`
- [ ] T031 Prepare English `brief.md`, `AI-LOG.md`, and `SELF_ASSESSMENT_REPORT.md` using `REQUIREMENT.md` and `AI-LOG-Template.md`; identify Huynh Thanh Phuc (24121705) and Nguyen Diep Than (24127120), attach evidence per rubric criterion, and finalize scores after team review
- [ ] T032 Review final package contents, committed `dist/`, and `.git` presence against `REQUIREMENT.md`; document the packaging checklist in `checks/submission-package.md` and create the final zip after team ID/score are known

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates folders for later tasks.
- **Foundational (Phase 2)**: Depends on Setup; blocks all story implementation because all
  screens share style, behavior conventions, and sample data.
- **User Stories**: Begin after Foundational. US1 is the MVP. US2 and US3 use the same campaign
  and sample records; their page content can be built in parallel, but end-to-end flow validation
  depends on the preceding screen's link/state contract.
- **Polish (Phase 6)**: Depends on all three desired screens being implemented.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; independently testable. Provides the shared campaign and
  next-screen route.
- **US2 (P2)**: Starts after Phase 2; its page can be implemented independently with fixtures,
  but navigation and eligible records integrate with US1 and feed US3.
- **US3 (P3)**: Starts after Phase 2; can be implemented independently with fixtures, but
  end-to-end eligibility and confirmation preconditions depend on US2 review outcomes.

### Parallel Opportunities

- T003 and T004 can run in parallel after T001; T005 depends on T002 only if writing checks
  directory evidence there (directory tasks are independently quick).
- In US1, T006 and T007 touch the same `index.html` and should be done sequentially or as one
  coordinated edit; T010 follows implementation.
- In US2, T011 and T012 both edit `applications.html`, so coordinate/sequentialize them. T016
  follows all story tasks.
- In US3, T017 and T018 both edit `schedule.html`, so coordinate/sequentialize them. Logic work
  in JS and markup work can be parallel only when edit ownership is separated; T023 follows all.
- After Phase 2, different story screens can be built in parallel using `assets/js/prototype.js`
  and fixtures with coordinated ownership. Polish checks T024-T026 can run in parallel after
  implementation; package documentation T028-T030 follows the chosen delivery and evidence.

## Parallel Example: Separate Screen Work

```text
After Phase 2 and agreement on shared sample fixtures:
Huynh Thanh Phuc: own index.html (US1) and campaign-flow verification
Nguyen Diep Than: own applications.html (US2) and review verification
Together: implement/integrate schedule.html (US3), shared JS/CSS, and final cross-screen checks

Coordinate shared edits to assets/js/prototype.js and assets/css/styles.css.
Run each story's independent browser check before end-to-end integration.
```

## Two-Person Team Strategy

1. Both members complete Setup + Foundational together and agree on shared fixtures.
2. After Foundation, split US1 and US2 page ownership for parallel progress.
3. Pair on US3 scheduling and final integration, since it depends on reviewed application states.
4. Share the final responsive, W3C, JavaScript-off, and submission-evidence checks.

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundational phases.
2. Complete US1 campaign page and behavior.
3. Independently verify draft, preview, publication validation, relative navigation, and
   JavaScript-off content.
4. Continue to US2 and US3 for the full required milestone; US1 alone is a demonstrable slice,
   not a complete submission.

### Incremental Delivery

1. Establish shared layout and consistent fixtures.
2. Implement and verify campaign setup (US1).
3. Implement and verify application review (US2), preserving independent application outcomes.
4. Implement and verify interview scheduling (US3), including conflicts and confirmation gates.
5. Run cross-screen audits, W3C validation, responsive/no-JavaScript checks, and package evidence.

## Notes

- `[P]` indicates a separate-file task with no dependency on unfinished work.
- Each user-story task includes its story label and a concrete file path.
- The sample record data and dates must follow `checks/shared-fixtures.md` and avoid all brief
  Fix these defects.
- Browser checks are required deliverables, not claims of automated test coverage.
