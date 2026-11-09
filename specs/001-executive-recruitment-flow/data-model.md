# Data Model: Executive Recruitment Flow Prototype

This model describes the information and state relationships the screens represent. It does
not require a production database or claim durable server-side persistence.

## Entities

### Campaign

- **Fields**: campaign name, host club, description, application opening date/time, closing
  date/time, instructions, lifecycle state (`Draft`, `Published`, `Confirmed`), one interview
  date, interview time window, common slot duration.
- **Validation**: required details present before publication; opening precedes closing;
  interview date and all screen dates agree; only one active campaign is represented.
- **Relationships**: contains Departments and Positions; receives Applications; owns Interview
  Assignments.
- **State transitions**: Draft → Published → Confirmed (confirmation locks configuration).

### Department

- **Fields**: name, description (optional).
- **Relationships**: belongs to one Campaign; groups Positions.

### Position

- **Fields**: title, quota, job description, requirements.
- **Validation**: quota is a positive whole number.
- **Relationships**: belongs to one Department; one or more qualified Interviewers may be
  assigned to it; Applications reference exactly one Position.

### Applicant

- **Fields**: sample name, student identifier/contact as needed for display.
- **Relationships**: may own multiple Applications; sample identity is distinct from every
  Interviewer identity.

### Application

- **Fields**: application identifier, Applicant, Position, submission timestamp, CV reference,
  motivation statement, screening status (`Submitted`, `Shortlisted`, `Rejected`), internal
  Executive note.
- **Validation**: one application per applicant-position-campaign; CV is PDF up to 5 MB and
  statement up to 300 words in the product scope; screening status and note are per application.
- **Visibility**: internal note visible only to Executive; Interviewer can access CV only for
  assigned applications; Applicant sees only their own application information.
- **State transitions**: Submitted → Shortlisted or Rejected. Only Shortlisted can receive an
  Interview Assignment. Shortlisted does not mean accepted or schedule-confirmed.

### Interviewer

- **Fields**: sample name, qualified Positions, available time slots.
- **Relationships**: may be assigned to one or more Positions and Interview Assignments.
- **Validation**: assigned interviewer must be qualified for the assignment's Position and
  available for its full interval.

### Room

- **Fields**: existing room identifier/name, availability.
- **Validation**: room must be selected from existing rooms and cannot host overlapping
  assignments.

### Interview Assignment

- **Fields**: Application, date, start/end time, Interviewer, Room, state (`Proposed`, `Conflict`,
  `Unassigned`, `Confirmed`), unassigned/conflict reason where applicable.
- **Validation**: belongs only to a Shortlisted Application; duration is 15, 20, or 30 minutes
  and common to the campaign; applicant, interviewer, room, and qualification/availability
  constraints are checked together.
- **State transitions**: Proposed ↔ Conflict as assignments are checked; Unassigned → Proposed
  after a valid assignment; valid Proposed → Confirmed on campaign confirmation. Confirmed is
  read-only.

## Invariants

1. An Application is uniquely identified by campaign + applicant + position.
2. One applicant may have independent applications for multiple positions.
3. Every Interview Assignment has one shortlisted Application, one qualified available
   Interviewer, one available Room, and one valid time interval.
4. No two assignments overlap for the same applicant, interviewer, or room.
5. Schedule summary totals equal the corresponding visible row counts by state.
6. Confirmation is allowed only after the application close, full review, complete assignments,
   and zero unresolved conflicts; afterward, campaign, applications, and schedule are read-only.
