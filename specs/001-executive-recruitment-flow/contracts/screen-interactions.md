# Screen Interaction Contract

## Shared contract

- Screen order: Create Recruitment Campaign (`index.html`) → Application Review → Interview
  Scheduling.
- All pages show the same campaign and a single coherent date timeline.
- Navigation alone never creates an application, changes a screening decision, or confirms a
  schedule.
- Labels, statuses, totals, sample identities, and dates agree across pages.
- Every screen is readable at 360, 768, and 1280 px with no horizontal page scrolling.

## Create Recruitment Campaign

- **Save as Draft**: retains entered campaign configuration as a draft; does not publish.
- **Preview Campaign**: presents campaign-facing information; does not publish or create
  applicants.
- **Publish Campaign**: succeeds only with required fields and valid ordered dates. On failure,
  show specific field/date errors, preserve valid input, and remain on this screen.
- **Applications**: opens Application Review for the same campaign only after publish/receipt
  context; sample applications are fixtures, not side effects of navigation.

## Application Review

- List displays submitted application, applicant, position, submission time, and state; list
  actions include search/filter/sort/page/export.
- **Review** opens the selected application's details alongside a still-readable list. Closing
  the details returns to the same list/filter state.
- **Shortlist** or **Reject** changes only the selected application. Internal note is not exposed
  to Applicant or Interviewer.
- **Continue to Interview Scheduling** is unavailable until at least one application is
  Shortlisted; only Shortlisted applications are passed forward.

## Interview Scheduling

- Generate uses shortlisted applications, position-qualified interviewer availability, a
  campaign date/time window, common allowed duration (15/20/30 minutes), and existing rooms.
- Unassignable rows remain Unassigned with a reason; no applicant is automatically rejected.
- Edit/Resolve/+ Assign Slot rechecks applicant, interviewer, room, qualification, and
  availability; a conflict is identified and prevents confirmation.
- **Save Changes** saves/retains a draft only.
- **Approve & Confirm Schedule** is available only after applications close, all applications
  are reviewed, all shortlisted applications have valid assignments, and no conflict or
  Unassigned row remains. Confirmation makes the campaign configuration, applications, and
  schedule read-only. It does not publish final recruitment outcomes.

## Explicit exclusions

No external API, authentication provider, real file upload service, university account
verification, multi-club operation, or production persistence is promised by this UI contract.
