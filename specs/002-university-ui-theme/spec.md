# Feature Specification: Apply University UI Kit Theme

**Feature Branch**: `002-university-ui-theme`

**Created**: 2026-11-09

**Status**: Draft

**Input**: User description: "Switch to the existing Figma theme: University UI Kit by Magika (Figma Community file 1193461935826510859)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View recruitment screens in the new theme (Priority: P1)

As a club recruiter, I want the campaign, application review, and interview scheduling screens to use a cohesive university UI kit visual theme so the recruitment prototype feels familiar, polished, and consistent.

**Why this priority**: The requested change is a visual redesign across the complete main flow; all three screens must share the theme to deliver its value.

**Independent Test**: Open each of the three screens and verify the shared visual language is recognizable and consistent without changing the screen's existing content or behavior.

**Acceptance Scenarios**:

1. **Given** the campaign screen, **When** a recruiter opens it, **Then** its typography, colors, surfaces, controls, and spacing reflect the selected university UI kit.
2. **Given** any of the three recruitment screens, **When** a recruiter navigates between them, **Then** the theme remains consistent and the existing recruitment flow is preserved.
3. **Given** a narrow or wide viewport, **When** a recruiter views any screen, **Then** the themed content remains readable and usable without horizontal scrolling.

---

### User Story 2 - Continue existing recruitment tasks (Priority: P2)

As a club recruiter, I want existing campaign creation, application decisions, and scheduling actions to remain understandable and usable after the visual change.

**Why this priority**: The theme must not compromise the purpose or integrity of the prototype's existing workflows.

**Independent Test**: Exercise the existing navigation and representative campaign, review, and scheduling interactions after the visual update and confirm their outcomes are unchanged.

**Acceptance Scenarios**:

1. **Given** an application list, **When** a recruiter reviews or changes an individual decision, **Then** the existing per-application decision behavior remains intact and clearly legible.
2. **Given** a shortlisted application, **When** a recruiter assigns an interview, **Then** existing qualification and availability conflict checks remain visible and effective.
3. **Given** confirmed campaign or schedule data, **When** a recruiter views it, **Then** the existing read-only behavior remains intact.

## Edge Cases

- The Figma community reference may not expose every component or asset; the theme must remain coherent using the reference's available visual guidance and existing project content.
- At 360px wide, denser tables, navigation, and form controls must remain readable and usable without sideways scrolling.
- Existing status and conflict distinctions must remain understandable when expressed through the new palette, including without relying on color alone.
- Longer names, labels, and Vietnamese text must not become clipped or overlap themed components.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All three existing screens MUST adopt a cohesive visual theme based on the University UI Kit by Magika referenced by the user.
- **FR-002**: The theme MUST apply consistently to page structure, typography, color, surfaces, spacing, navigation, and interactive controls where those elements appear.
- **FR-003**: The redesign MUST preserve the existing screen order and hash routes: `#/campaign`, `#/applications`, and `#/schedule`.
- **FR-004**: The redesign MUST preserve current campaign dates, application fixtures, identities, statuses, schedule rows, and totals.
- **FR-005**: The redesign MUST preserve individual application decisions and allow only shortlisted applications to be scheduled.
- **FR-006**: Scheduling MUST continue to recheck applicant, interviewer, room, qualification, and availability conflicts before confirmation; confirmed campaign data and schedule MUST remain read-only.
- **FR-007**: Each screen MUST remain usable at 360, 768, and 1280 CSS pixels without horizontal scrolling.
- **FR-008**: Text, status, actions, and errors MUST remain legible and distinguishable in the new theme, including when users cannot distinguish colors.
- **FR-009**: The theme MUST be implemented using locally available project assets and MUST NOT require remote fonts, runtime CDNs, or outside-network dependencies.
- **FR-010**: The redesign MUST NOT introduce university-account verification, prohibited template footer text, or claims of persistence or checks not actually provided.

### Key Entities *(include if data involved)*

- **Recruitment screen**: One of the three connected campaign, application review, or interview scheduling views; each retains its existing route and purpose.
- **Theme**: The shared visual rules and component appearance drawn from the referenced university UI kit.
- **Campaign data**: The existing campaign dates, application identities and decisions, schedule assignments, statuses, and totals that must remain consistent.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 3 recruitment screens present the same recognizable theme and preserve their existing navigation destinations.
- **SC-002**: At each of the 3 required viewport widths (360, 768, and 1280 CSS pixels), all 3 screens can be used without horizontal scrolling: 9 screen-and-viewport combinations pass.
- **SC-003**: All shared campaign and schedule fixture values remain consistent across the screens after the redesign, with no changed identities, dates, statuses, rows, or totals.
- **SC-004**: Recruiters can complete the existing representative campaign, application decision, and scheduling flows with the same outcomes as before the redesign.
- **SC-005**: Statuses and conflict information remain understandable without color being the sole distinguishing cue on all 3 screens.

## Assumptions

- The user intends to apply the visual language of the named Figma Community university UI kit to the existing ClubFlow prototype, not to replace its product flows or content.
- Existing app behavior, fixtures, and three-screen scope remain authoritative; this feature is a theme change rather than a workflow expansion.
- Where the referenced kit does not provide an exact matching component, the closest consistent visual treatment may be used without changing its meaning or interaction.
- All theme resources needed at runtime will be available locally in the submitted project.
