# Feature Specification: Executive Recruitment Flow Prototype

**Feature Branch**: `001-executive-recruitment-flow`

**Created**: 2026-11-09

**Status**: Draft

**Input**: User description: "Build the ClubFlow milestone prototype from REQUIREMENT.md and the final project brief: three connected Executive screens for creating a recruitment campaign, reviewing applications, and scheduling interviews, meeting rubric and Fix these constraints."

## User Scenarios & Testing

### User Story 1 - Configure and publish a campaign (Priority: P1)

As a club Executive, I configure the campaign, its application period and instructions, and
departments and positions with quotas and requirements; I can save a draft, preview what
students will see, and publish only valid campaign information.

**Why this priority**: The campaign is the entry point and supplies the shared context and
timeline for the rest of the prototype.

**Independent Test**: On the entry page, fill campaign and position details, save and reopen
the draft, preview it, and attempt publishing with both valid and invalid dates/required fields.

**Acceptance Scenarios**:

1. **Given** a signed-in Executive configuring a campaign, **When** they save as draft,
   **Then** the campaign configuration remains available for later editing and is not published.
2. **Given** a completed campaign form with a valid opening/closing period and positions,
   **When** the Executive previews it, **Then** the student-facing campaign details are shown
   without publishing or creating applications.
3. **Given** required information is missing or dates are invalid, **When** the Executive
   attempts to publish, **Then** specific errors are shown, publication is blocked, and valid
   entered information remains available for correction.
4. **Given** a valid campaign, **When** the Executive publishes and opens Applications,
   **Then** Application Review is shown for that same campaign; navigation does not fabricate
   submissions or approve applications.

---

### User Story 2 - Review each submitted application independently (Priority: P2)

As a club Executive, I inspect submitted applications and their CVs and statements, find
applications through search and filters, record private notes, and shortlist or reject each
position-specific application.

**Why this priority**: Screening determines which applications are eligible for the next stage
and prevents unreviewed or rejected applications from being scheduled.

**Independent Test**: Use representative sample applications to search/filter the list, open
and close an application detail drawer, and make a decision while checking that other
applications and active filters are unchanged.

**Acceptance Scenarios**:

1. **Given** submitted applications for a campaign, **When** the Executive searches, filters,
   sorts, paginates, or exports the list, **Then** the displayed application and applicant
   statistics and list data remain consistent with the selected scope.
2. **Given** an application in the list, **When** the Executive selects Review, **Then** its
   applicant, position, submission time, CV, statement, and internal note are available beside
   the list without obscuring either content area at supported widths.
3. **Given** a reviewed application, **When** the Executive shortlists or rejects it,
   **Then** only that application changes state; another application from the same student for a
   different position remains unchanged.
4. **Given** the detail drawer is open with list filters applied, **When** the Executive closes
   it, **Then** the list returns with those filters retained.
5. **Given** no application has been shortlisted, **When** the Executive views the next-stage
   action, **Then** scheduling cannot proceed; once at least one is shortlisted, only shortlisted
   applications are passed to Interview Scheduling.

---

### User Story 3 - Prepare and confirm a conflict-free interview schedule (Priority: P3)

As a club Executive, I generate a draft for shortlisted applications, review proposals and
unassigned/conflicting cases, adjust assignments, and confirm only a complete valid schedule.

**Why this priority**: This completes the required three-screen flow and protects applicants,
interviewers, and rooms from invalid overlapping assignments.

**Independent Test**: Provide shortlisted applications, position-qualified interviewers with
availability, a date, a time window, a permitted duration, and rooms; generate a draft, exercise
unassigned and conflict cases, resolve them, then attempt confirmation before and after all
gates are met.

**Acceptance Scenarios**:

1. **Given** shortlisted applications and scheduling inputs, **When** the Executive generates
   a draft, **Then** the system proposes the first available combination of time slot, qualified
   interviewer, and room; unschedulable applications are Unassigned with a reason.
2. **Given** a draft assignment, **When** the Executive edits, resolves, or manually assigns
   a slot, **Then** availability and applicant, interviewer, and room conflicts are rechecked;
   conflicts are identified and cannot be confirmed.
3. **Given** applications are still open, any application is unreviewed, an eligible application
   is Unassigned, or any conflict remains, **When** the Executive attempts confirmation,
   **Then** confirmation is blocked and affected items are identified.
4. **Given** applications are closed, every application reviewed, and every shortlisted
   application has a valid non-conflicting assignment, **When** the Executive confirms,
   **Then** the schedule becomes confirmed and read-only, and the screen clearly shows the
   confirmed state.
5. **Given** a saved draft, **When** the Executive leaves and returns before confirmation,
   **Then** draft changes remain distinct from a confirmed schedule.

---

### Edge Cases

- Closing date precedes opening date, a required campaign field is empty, or the campaign is
  closed: block the relevant action, give a specific explanation, and retain valid input.
- A student submits more than one application for the same position: identify/reopen the
  existing application; separate applications for other positions remain independent.
- No qualified interviewer, shared available time, or room exists: leave the application
  Unassigned with a reason; do not reject it automatically.
- A schedule edit causes an applicant, interviewer, or room overlap: identify affected
  assignments and block confirmation.
- A confirmed schedule is revisited: show it read-only and disable editing and regeneration.
- A detail drawer is opened at a narrow viewport: both list and detail remain readable and
  reachable without horizontal page scrolling.
- An application has been shortlisted for one position but rejected for another: preserve both
  distinct decisions and pass only the shortlisted application to scheduling.

## Requirements

### Functional Requirements

- **FR-001**: The prototype MUST provide three connected screens in this order: Create
  Recruitment Campaign, Application Review, and Interview Scheduling. The first page MUST
  be `index.html`.
- **FR-002**: The Executive MUST be able to configure campaign name, host club, description,
  opening and closing dates, application instructions, departments, positions, quotas, job
  descriptions, and requirements.
- **FR-003**: The Executive MUST be able to save a draft, preview campaign details, and publish
  only when required fields and dates are valid. Invalid publication attempts MUST identify
  errors and preserve valid entered information.
- **FR-004**: All screens MUST refer to the same club, campaign, and coherent timeline.
  Moving between screens MUST NOT itself create applications or change their review status.
- **FR-005**: Application Review MUST show submitted sample applications with applicant,
  position, submission time, and status, and support search, filtering, sorting, pagination,
  application/applicant statistics, and basic CSV export.
- **FR-006**: The Executive MUST be able to inspect application details, CV, and statement in
  a drawer or equivalent detail view; add internal notes; and shortlist or reject an application.
- **FR-007**: Decisions and notes MUST belong to the specific application. Notes MUST remain
  hidden from Applicants and Interviewers. Shortlisting MUST mean only that CV screening
  passed, not acceptance or confirmed interview status.
- **FR-008**: Only shortlisted applications MUST enter scheduling. Each application MUST
  represent one student applying for one position; decisions on one position MUST NOT mutate
  another application belonging to the same student.
- **FR-009**: Interview scheduling MUST allow the Executive to set one campaign interview
  date, a time window, and a common duration of 15, 20, or 30 minutes; configure interviewer
  position assignments and availability; and select from available rooms.
- **FR-010**: Draft generation MUST schedule eligible applications sequentially using the first
  available combination of slot, qualified interviewer, and room. Unassigned applications
  MUST show a reason and MUST NOT be rejected automatically.
- **FR-011**: The Executive MUST be able to edit, resolve, or manually assign draft slots and
  save draft changes. Each change MUST recheck applicant, interviewer, room, qualification,
  and availability constraints.
- **FR-012**: A room MUST host at most one interview at a time. Applicant, interviewer, and
  room overlaps MUST be identified; assignments with conflicts MUST block confirmation.
- **FR-013**: Confirmation MUST be blocked until applications are closed, all applications are
  reviewed, all shortlisted applications have valid assignments, and no conflict or Unassigned
  application remains. Confirmation MUST make campaign configuration, applications, and
  schedule read-only and show a Confirmed state.
- **FR-014**: Screen counts, labels, summaries, and table rows MUST agree. Conflict examples
  MUST demonstrate an actual overlapping interval/resource, not a false conflict.
- **FR-015**: Sample applicants and interviewers MUST be distinct people; sample identities,
  statuses, dates, assignments, and conflicts MUST remain internally consistent.
- **FR-016**: The prototype MUST avoid university verification claims and the prohibited template
  footer text (“© 2025 ClubFlow”, “Privacy Policy”, “Terms of Service”, “Support Center”).
- **FR-017**: At widths of 360, 768, and 1280 pixels, every screen and detail view MUST be
  usable without horizontal page scrolling; the application list and detail MUST both remain
  readable.
- **FR-018**: Pages MUST use semantic, valid HTML and yield zero W3C checker errors.
- **FR-019**: If delivered as static pages, relative navigation links MUST work and all content
  MUST remain visible with JavaScript disabled. Any CSS framework MUST load as a CSS file.
- **FR-020**: If delivered as React, the submission MUST include the built `dist/` folder and
  `PROTOTYPE.md` MUST list each screen's path.
- **FR-021**: The team MUST provide browser evidence and checks, and submission documents
  MUST reflect actual implementation and verification results rather than unsupported claims.

### Key Entities

- **Campaign**: One club's recruitment event with description, instructions, application period,
  departments, positions, and lifecycle state.
- **Position**: A campaign role within a department, with quota, description, and requirements.
- **Application**: One applicant's submission for one position, including CV, statement,
  submission time, screening state, internal note, and (if shortlisted) interview assignment.
- **Applicant**: A student who can have separate applications for multiple positions.
- **Interviewer**: A club member assigned to positions, with availability and access only to
  assigned applications and schedules.
- **Room**: An existing selectable location that can host at most one interview at a time.
- **Interview Assignment**: A proposed or confirmed date/time, interviewer, room, and state
  associated with one shortlisted application.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A reviewer can follow all three screens in the required order for one campaign,
  with each navigation action reaching the intended next screen.
- **SC-002**: At 360, 768, and 1280 pixel viewport widths, all three screens are usable and
  produce zero horizontal page overflow.
- **SC-003**: A W3C HTML validation run reports zero errors for each delivered screen.
- **SC-004**: With JavaScript disabled, all static-page content remains visible and navigation
  links remain usable; for React delivery, all listed screen paths load from the submitted build
  under the assignment's local-server conditions.
- **SC-005**: Every demonstrated invalid campaign or schedule state blocks the prohibited
  action and identifies the item needing correction.
- **SC-006**: All displayed schedule totals equal the number and state of corresponding rows;
  every displayed conflict is supported by overlapping use of an applicant, interviewer, or room.
- **SC-007**: The application list and its detail view remain readable together at every required
  width, and opening/closing the detail view preserves active list filters.
- **SC-008**: The submitted checks and screenshots provide traceable evidence for the required
  viewport, validity, navigation, and JavaScript-off or build-path checks.

## Assumptions

- The audience is an Executive signed in to the single club and campaign used by the prototype.
- Sample applications represent submissions received after campaign publication; the three
  screens do not need to implement the full applicant submission or interviewer assessment
  flows unless needed to make role and status behavior clear.
- Existing accounts, rooms, and role access are provided; self-service registration, university
  account verification, multi-club support, and features listed under Not Building are excluded.
- The team may choose static pages or React, layout, colors, page content, and filenames other
  than the required `index.html` entry page.
- The milestone deadline and package contents are those in `REQUIREMENT.md`; the assignment's
  rubric awards marks for browser behavior, the instructions given to the assistant, and checks
  performed on generated work.
- Campaign date values and sample data will be chosen by the team but must agree across all
  screens and must not reproduce any Fix these defect.
