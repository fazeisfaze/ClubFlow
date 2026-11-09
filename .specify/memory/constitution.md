<!--
Sync Impact Report
- Version change: unratified scaffold → 1.0.0 (initial project constitution)
- Modified principles: none; established project-specific principles
- Added sections: Accessibility and Delivery Constraints; Quality and Review Workflow
- Removed sections: scaffold placeholders
- Follow-up TODOs: Confirm the original ratification date with the team.
-->

# ClubFlow Constitution

## Core Principles

### I. Deliver the Required Three-Screen Flow
The prototype MUST provide connected Create Recruitment Campaign, Application Review,
and Interview Scheduling pages, in that order, for the same club and campaign. `index.html`
MUST be the entry page. A transition between pages MUST NOT imply that applications were
created, reviewed, shortlisted, or scheduled unless the corresponding action occurs.

### II. Preserve Recruitment and Scheduling Integrity
Campaign dates MUST form one coherent timeline across all screens. Only shortlisted
applications may enter interview scheduling. An interview assignment MUST use an interviewer
qualified for its position, mutually available participants, and an available room. Applicant,
interviewer, and room overlaps MUST be detected and block confirmation. Schedule counts MUST
match the displayed rows and states. A confirmed schedule MUST be read-only.

### III. Make Decisions and Ownership Clear
Each application belongs to one applicant and one position; decisions for one position MUST
NOT alter that student's other applications. Review notes are internal and MUST NOT be shown
to applicants or interviewers. Any sample data, statuses, actions, errors, and scheduling
conflicts MUST agree with each other and communicate who can see or change them.

### IV. Build for Accessible, Responsive, Valid Pages
All three pages MUST remain usable at 360, 768, and 1280 CSS pixels without horizontal
scrolling. Content that appears side by side at wide widths MUST remain readable at narrow
widths. Pages MUST use semantic, valid HTML and produce zero errors in the W3C checker.
For static delivery, content MUST remain visible with JavaScript disabled, links MUST be
relative, and any CSS framework MUST load as a CSS file.

### V. Keep Scope Honest and Reviewable
The prototype MUST avoid all defects enumerated in the assignment's Fix these list. It MUST
not claim university-account verification, build items listed as Not Building, or include
template footer claims prohibited by the brief. Requirements, implementation, and self-assessment
MUST be supported by verifiable browser behavior and recorded checks; no unsupported claims
of testing or completion are permitted.

## Accessibility and Delivery Constraints

The assignment brief and `REQUIREMENT.md` are authoritative for scope and delivery. The
prototype covers three executive screens; applicant and interviewer follow-up views are outside
this milestone unless explicitly needed to explain role visibility. The solution may use static
HTML or React. If React is chosen, the built `dist/` directory and screen paths in `PROTOTYPE.md`
are required. The final repository package must retain `.git` and include the required submission
documents, screenshots, and checks described in `REQUIREMENT.md`.

## Quality and Review Workflow

Before implementation, derive acceptance checks from every functional requirement and every
Fix these item. Verify navigation and actions in a browser at all three required widths, check
JavaScript-off behavior where applicable, and run the W3C HTML checker. Capture evidence in
`screenshots/` and `checks/`; document actual results, not intended results. Recheck shared
dates, sample identities, row counts, and conflict examples across all three screens whenever
sample data changes.

## Governance

This constitution governs project decisions and takes precedence over implementation convenience.
Amendments require team agreement, a recorded rationale, and an update to the version and
amendment date. Use semantic versioning: MAJOR for incompatible principle changes, MINOR for
new or materially expanded principles, and PATCH for clarifications that do not change policy.
Every review MUST check the proposed work against these principles and the assignment brief.
If a conflict or ambiguity materially changes required scope, resolve it with the course product
owners or lecturer rather than silently weakening a requirement.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original team adoption date | **Last Amended**: 2026-11-09
