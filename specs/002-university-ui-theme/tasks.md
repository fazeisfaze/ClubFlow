# Tasks: Apply University UI Kit Theme

**Input**: Design documents from `specs/002-university-ui-theme/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: No new automated tests are specified by the feature. Existing tests, build, viewport, HTML, and fixture checks are included as validation tasks.

**Organization**: Tasks are grouped by user story to support incremental delivery. Since both stories touch the same screens, US2 follows US1 to avoid concurrent edits to the same files.

## Phase 1: Setup

**Purpose**: Verify the existing project and reference inputs before changing presentation.

- [X] T001 Review the accessible University UI Kit reference and current local assets/styles; record only verifiable visual choices and any access limits in `specs/002-university-ui-theme/research.md`
- [X] T002 Run `npm test` and `npm run build` to establish the baseline; record actual results in `checks/` without changing shared fixtures

---

## Phase 2: Foundational

**Purpose**: Establish the shared visual foundation that all screens will use.

- [X] T003 Define the locally bundled theme colors, typography fallback, surfaces, spacing, focus, and status treatments in `assets/css/styles.css`; do not add remote assets or runtime dependencies

**Checkpoint**: Shared theme primitives are available before screen-specific styling.

---

## Phase 3: User Story 1 - View recruitment screens in the new theme (Priority: P1) 🎯 MVP

**Goal**: Apply a consistent University UI Kit-inspired visual system across the three existing screens without changing their navigation or content.

**Independent Test**: Visit `#/campaign`, `#/applications`, and `#/schedule`; verify shared theme styling, readable content, intact navigation, and no horizontal scrolling at 360, 768, or 1280 CSS pixels.

### Implementation for User Story 1

- [X] T004 [US1] Apply the shared theme to the brand header, campaign summary, navigation, and page shell in `src/components/Shell.jsx`, preserving the three hash routes and order
- [X] T005 [P] [US1] Restyle the campaign page layout and controls in `src/components/CampaignPage.jsx` using the shared theme without changing campaign fields, dates, or actions
- [X] T006 [P] [US1] Restyle the application review layout and controls in `src/components/ApplicationsPage.jsx` using the shared theme without changing fixtures, statuses, or decision actions
- [X] T007 [P] [US1] Restyle the interview scheduling layout and controls in `src/components/SchedulePage.jsx` using the shared theme without changing rows, totals, or scheduling actions
- [ ] T008 [US1] Capture and review all nine screen/viewport combinations; update actual theme evidence in `screenshots/` and responsive results in `checks/`

**Checkpoint**: All three views use one visual language and remain usable at the required widths.

---

## Phase 4: User Story 2 - Continue existing recruitment tasks (Priority: P2)

**Goal**: Preserve the clarity and outcomes of application decisions, scheduling validation, and confirmed read-only states.

**Independent Test**: Exercise per-application decisions, shortlist eligibility, conflict handling, and confirmed-state read-only behavior; verify that each outcome matches the pre-theme behavior and shared fixtures.

### Implementation for User Story 2

- [X] T009 [US2] Ensure status and conflict treatments in `src/components/Shared.jsx` and `assets/css/styles.css` remain distinguishable by text or shape as well as color, with visible keyboard focus and readable contrast
- [X] T010 [US2] Review campaign editing/confirmation, individual application decisions, and scheduling gates/conflicts in `src/components/CampaignPage.jsx`, `src/components/ApplicationsPage.jsx`, and `src/components/SchedulePage.jsx`; run existing regression tests and document actual outcomes/limitations in `checks/`

**Checkpoint**: Existing workflows remain intact and the critical states are understandable without color alone.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Validate delivery requirements and retain the production build and honest evidence.

- [X] T011 Run `npm test` and `npm run build`; confirm all three built hash routes remain available from `dist/index.html` and theme browser chrome in `index.html` matches
- [ ] T012 Validate rendered HTML and inspect all three built screens at 360, 768, and 1280 CSS pixels; record actual results and limitations in `checks/`, `screenshots/`, and `AI-LOG.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; establishes baseline and records reference availability.
- **Foundational (Phase 2)**: Depends on setup; shared theme primitives block screen styling.
- **User Story 1 (Phase 3)**: Depends on the shared theme primitives. Its individual screen tasks T005, T006, and T007 can proceed in parallel after T003; shared shell task T004 should be done before final integrated viewport review T008.
- **User Story 2 (Phase 4)**: Runs after US1 because the stories touch overlapping screen/style files; verifies behavior and state accessibility.
- **Polish (Phase 5)**: Depends on both user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after setup and foundation; independently delivers the visual redesign.
- **US2 (P2)**: Starts after US1 to verify that the styled workflows and state communication remain unchanged.

### Parallel Opportunities

- T005, T006, and T007 modify separate screen components and can be performed in parallel once T003 is complete.
- T011 and the rendered HTML/viewport inspection in T012 cover different validation activities but should both use the final same build; run after implementation and in a coordinated final pass.

### Parallel Example: User Story 1

After T003 and T004 are complete, these screen-specific changes can be assigned independently:

```text
T005 — src/components/CampaignPage.jsx
T006 — src/components/ApplicationsPage.jsx
T007 — src/components/SchedulePage.jsx
```

### Parallel Example: User Story 2

No parallel implementation tasks are identified: its accessibility/status update and workflow review touch overlapping shared styles and screen components, so perform T009 before T010.

## Implementation Strategy

### MVP First (User Story 1)

1. Complete setup and define local shared theme primitives.
2. Apply the theme to the shell and three screen components.
3. Validate the 3 × 3 screen/viewport combinations and update responsive evidence.
4. Continue with US2 to verify preserved workflow integrity and accessible state cues before delivery.

### Incremental Delivery

Deliver the complete visual theme as the P1 increment, then verify P2 behavior/state clarity, then run the production and HTML validation pass. Do not mark any validation complete until observed and documented.
