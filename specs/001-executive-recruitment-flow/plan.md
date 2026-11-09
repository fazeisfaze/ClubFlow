# Implementation Plan: Executive Recruitment Flow Prototype

**Branch**: `001-executive-recruitment-flow` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-executive-recruitment-flow/spec.md`

## Summary

Deliver the three required Executive screens as a connected React application styled with
Tailwind CSS and built to a committed `dist/` folder. Use client-side paths that can be recorded
in `PROTOTYPE.md`, keep all required assets local, and maintain coherent fixture and screening
states across the campaign, review, and schedule screens. Do not imply unsupported production
services or server-side persistence. Validate the built output, browser behavior, responsive
layouts, HTML, and submission evidence against the final project brief and spec.

## Technical Context

**Language/Version**: JavaScript ES modules, JSX, React 19, and Tailwind CSS 4.

**Primary Dependencies**: React, React DOM, Vite, Tailwind CSS, and the Tailwind Vite plugin.
Bundle dependencies and styles locally in the production build; no runtime CDN dependency.

**Storage**: No server/database. Browser local storage may retain prototype campaign and
schedule edits on the same browser; no server-side persistence is claimed.

**Testing**: Manual browser interaction and responsive checks at 360, 768, and 1280 px; W3C
HTML validation; JavaScript-disabled check; link/navigation check; screenshots and check results
recorded in submission evidence.

**Target Platform**: Modern desktop/mobile browsers; built `dist/` served locally with
JavaScript enabled and outside network blocked.

**Project Type**: React single-page web application with three hash-addressable screens.

**Performance Goals**: All pages and local assets load reliably from the submitted folder, with
no dependency on the outside network.

**Constraints**: Three screens for the main Executive flow; `index.html` is build entry;
`PROTOTYPE.md` lists each screen path; no sideways scrolling at required widths; semantic valid
HTML. The React build must work locally without outside network access. Avoid every Fix these
defect.

**Scale/Scope**: One club, one campaign, one interview date, sample application data, three
connected screens. No production backend, auth implementation, or out-of-scope features.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Three-screen flow**: PASS — plan maps one campaign through the required three screens,
  beginning at `index.html`; page navigation itself does not imply business state changes.
- **Recruitment/scheduling integrity**: PASS — design captures per-application outcomes,
  shortlisted-only scheduling, resource/availability validation, consistent counts, and a
  read-only confirmed state.
- **Ownership and clarity**: PASS — internal notes remain executive-only; sample applicants
  and interviewers are distinct; positions retain separate application decisions.
- **Responsive/valid/accessibility**: PASS — required viewport checks, semantic markup, W3C
  validation, relative links, and JavaScript-off review are explicit gates.
- **Honest scope/evidence**: PASS — static prototype is not represented as a production service;
  test evidence and final package contents are included in validation.
- **Violations**: None. No complexity justification required.

## Project Structure

### Documentation (this feature)

```text
specs/001-executive-recruitment-flow/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── screen-interactions.md
└── tasks.md
```

### Source Code (repository root)

```text
index.html                   # Vite entry document
src/
├── main.jsx                 # React bootstrap
├── App.jsx                  # Hash-based screen navigation and shared state
├── data.js                  # Coherent campaign and sample fixtures
├── domain.js                # Pure rules, covered by Node tests
└── components/
    ├── Shell.jsx
    ├── CampaignPage.jsx
    ├── ApplicationsPage.jsx
    └── SchedulePage.jsx
assets/css/styles.css        # Tailwind entry and small project-specific styles
vite.config.js
package.json
package-lock.json
dist/                        # Required committed production build
screenshots/                 # Required browser evidence
checks/                      # Validation and responsive-check evidence
```

**Structure Decision**: One React/Vite app with three hash routes (`#/campaign`,
`#/applications`, `#/schedule`) and shared local Tailwind output. The built `dist/index.html`
supports all listed screen URLs and has no dependency on a remote service.

## Team Context

- Huynh Thanh Phuc — Student ID: `24121705`
- Nguyen Diep Than — Student ID: `24127120`

The project team has two members. Split page ownership and verification work between them;
coordinate edits to shared styles, JavaScript, sample fixtures, and submission evidence.

## Complexity Tracking

No constitution violations.
