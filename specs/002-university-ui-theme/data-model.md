# Data Model: Apply University UI Kit Theme

This feature introduces no new persisted or domain data. The visual theme is presentation-only.

## Existing entities affected only in presentation

- **Recruitment screen**: `campaign`, `applications`, or `schedule`; route and role remain unchanged.
- **Theme**: Shared visual tokens and presentation for page surfaces, typography, spacing, navigation, controls, and status treatments. It does not alter domain state.
- **Campaign data**: Existing campaign, application, and schedule information. All values and state transitions remain unchanged.

## Invariants

- Preserve routes `#/campaign`, `#/applications`, and `#/schedule` and their order.
- Preserve all values in `checks/shared-fixtures.md`.
- Keep each application decision independent; only shortlisted applications are eligible for scheduling.
- Keep qualification, availability, and applicant/interviewer/room conflict validation intact.
- Confirmed campaign and schedule states remain read-only.
