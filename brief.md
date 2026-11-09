# Project Brief

## Goal

ClubFlow is a prototype for the Executive's recruitment flow: campaign setup, CV screening,
and interview scheduling for one student club and one campaign.

## Delivered scope

- Create Recruitment Campaign: campaign details and dates, application instructions, departments,
  positions, quotas, descriptions, requirements, draft, preview, and publish validation.
- Application Review: sample applications, search and filters, sort, pagination, counts, CSV
  export, individual CV/statement preview, internal notes, and per-application decisions.
- Interview Scheduling: shortlisted-only assignments, first-available draft generation, proposed,
  conflict and unassigned states, manual edits, CSV export, guarded confirmation, and read-only
  confirmed state.

## Technical approach

React 19 and Vite build a single application; Tailwind CSS is compiled into local CSS assets.
Three hash-addressable screens are listed in `PROTOTYPE.md`. Prototype state is stored in browser
local storage; no production backend, real CV upload service, or server-side persistence is
claimed. Sample applicants and interviewers are separate people.

## Validation

Run `npm test` for domain-rule checks and `npm run build` for the production bundle. Browser,
W3C, viewport, interaction, and brief audit results are recorded in `checks/`. Screenshots are in
`screenshots/`.

## AI Prompt Inputs

The following are English translations of the user's actual requests; they are included as prompt
evidence, not as additional product requirements:

1. “Switch to the existing Figma theme: University UI Kit by Magika.” Reference: [Figma Community
   file 1193461935826510859](https://www.figma.com/community/file/1193461935826510859/university-ui-kit-by-magika).
2. “Fix the issues shown in the evaluation screenshot.” The reported issues concerned semantic
   navigation and visible labels, small low-contrast text, missing prompt/change evidence, and a
   history with one large implementation commit.

The corresponding implementation and validation records are in `AI-LOG.md` and
`checks/accessibility-review.md`.

## Team

- Huynh Thanh Phuc — Student ID 24121705
- Nguyen Diep Than — Student ID 24127120
