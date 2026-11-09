# Implementation Plan: Apply University UI Kit Theme

**Branch**: `002-university-ui-theme` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-university-ui-theme/spec.md`

## Summary

Apply the visual language of the Figma Community file “University UI Kit by Magika” across the existing campaign, applications, and schedule screens. Keep the established React/Tailwind application, local-only assets, routes, content, and workflow behavior; focus implementation on shared styling and existing screen components. The public Figma page confirms the named kit, but does not expose inspectable component/token details in the available page text, so implementation should use its accessible visual reference when available and avoid inventing unsupported specifics.

## Technical Context

**Language/Version**: JavaScript (ES modules), JSX; Node.js runtime for build and tests

**Primary Dependencies**: React 19, Vite 7, Tailwind CSS 4

**Storage**: Existing browser localStorage and deterministic in-memory fixtures; no storage changes in scope

**Testing**: `npm test` (Node test runner), `npm run build`, browser checks at 360/768/1280px, rendered HTML validation

**Target Platform**: Modern browsers, served locally from the committed production `dist/`

**Project Type**: React single-page web application with hash routes

**Performance Goals**: Preserve current interaction responsiveness; no new runtime dependencies or remote requests

**Constraints**: Local assets only; maintain existing screen order, hash routes, fixtures, decisions, conflict checks, and read-only confirmation behavior; no horizontal scrolling at 360/768/1280px

**Scale/Scope**: Three existing executive screens and their shared design system; no new product flows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Three-screen flow**: PASS — style the existing three routes without changing order or transitions.
- **Recruitment integrity**: PASS — preserve campaign data, application-level decisions, eligibility, conflicts, and confirmation behavior; regression-check them.
- **Decision ownership**: PASS — no data or decision model changes are planned.
- **Accessible responsive valid pages**: PASS — check all required viewport widths; retain semantic markup, non-color-only status cues, and local assets.
- **Scope and honest delivery**: PASS — no verification, unsupported persistence claims, prohibited footer copy, or outside-network dependencies are introduced; update evidence only with actual results during implementation.

## Project Structure

### Documentation (this feature)

```text
specs/002-university-ui-theme/
├── plan.md
├── research.md
├── data-model.md
└── quickstart.md
```

### Source Code (repository root)

```text
assets/
└── css/styles.css
src/
├── App.jsx
├── components/
├── data.js
└── domain.js
tests/
└── clubflow.test.mjs
```

**Structure Decision**: Existing single-project React application; shared styling is in `assets/css/styles.css`, screen composition is in `src/components/`, and behavior regressions are covered by `tests/clubflow.test.mjs`. No new application directories or public API contracts are required.

## Complexity Tracking

No constitution violations or additional architectural complexity are proposed.
