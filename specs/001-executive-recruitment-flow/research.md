# Research: Executive Recruitment Flow Prototype

## Decisions

### 1. Use React with Vite and commit the production build

- **Decision**: Build one React application with Vite, using hash routes for the three screens;
  submit the generated `dist/` folder and document each route in `PROTOTYPE.md`.
- **Rationale**: React is explicitly allowed, and the user asked to use it. Hash routes work when
  the built files are served locally without server-side route fallback configuration.
- **Alternatives considered**: Static HTML pages. They require no build but do not match the
  user's requested React implementation.

### 2. Use Tailwind CSS and ship its compiled stylesheet locally

- **Decision**: Use Tailwind CSS through its Vite plugin and compile the utilities into `dist/`.
- **Rationale**: The framework must not depend on a remote CDN because marking blocks outside
  network access. A compiled local stylesheet remains available during local serving.
- **Alternatives considered**: Remote Tailwind CDN or custom-only CSS. CDN is not reliable
  offline; user requested Tailwind where feasible, and npm registry access is available.

### 3. Model sample records around application identity, not student identity

- **Decision**: Keep screening decision and interview assignment on each student-position
  application; link an applicant record to multiple independent applications.
- **Rationale**: The brief explicitly says one student may apply for multiple positions and one
  decision must not affect the other application.
- **Alternatives considered**: One screening state per student. Rejected because it merges
  distinct position applications and can pass ineligible records to scheduling.

### 4. Treat the screens as user-facing contracts

- **Decision**: Document the screen flow and state/action contracts in
  `contracts/screen-interactions.md`; no API contract is needed for a static prototype.
- **Rationale**: The main exposed interface is the three-screen user experience, and consistent
  outcomes and labels are the highest risk captured by the brief's Fix these list.
- **Alternatives considered**: REST/API contract. Not applicable without a backend or external
  service.

## Resolved Context

No unresolved technology choices block planning. The brief permits React, the user selected it,
and the Tailwind dependency can be installed and compiled. Exact visual design and sample copy
remain team choices and must satisfy the measurable constraints in the spec.
