# Research: Apply University UI Kit Theme

## Decision 1: Treat the change as a visual-only redesign

- **Decision**: Update the shared visual system and screen presentation only; preserve existing routing, content, application and schedule logic, and fixtures.
- **Rationale**: The feature specification is explicitly a theme change, and ClubFlow's constitution requires the three-screen workflow and integrity rules to remain unchanged.
- **Alternatives considered**: Rebuild screens from the kit or alter content/workflows. Rejected because this would exceed scope and risk changing verified prototype behavior.

## Decision 2: Use the existing local React and Tailwind setup

- **Decision**: Keep React/Vite/Tailwind and the existing stylesheet/component structure; bundle any needed assets locally.
- **Rationale**: This is already the project architecture and satisfies the offline submission constraint without adding dependencies.
- **Alternatives considered**: Add a new design system dependency, load a remote font/CDN, or replace the application framework. Rejected due to scope, network restrictions, and unnecessary change.

## Decision 3: Follow accessible reference styling without fabricating unavailable details

- **Decision**: Use the named Figma Community kit as the source of visual direction. The publicly accessible page text returned only the title “University UI KIT by Magika”; exact colors, typography, and component tokens were not exposed in that text. No inspectable Figma component metadata or visual assets are present in the repository. As a clearly identified interpretation rather than a claimed exact match, use academic navy/blue with restrained gold accents, cool pale surfaces, and local system typography.
- **Rationale**: This distinguishes observed reference details from assumptions and avoids claiming an exact reproduction without evidence.
- **Alternatives considered**: Claim specific palette/fonts as kit-defined without inspecting the file. Rejected as unsupported.

## Decision 4: Validate visually at required viewport widths and regression-test behavior

- **Decision**: Check all three screens at 360, 768, and 1280 CSS pixels, run the project test/build commands, and verify shared fixtures and representative flows.
- **Rationale**: These are the project's delivery and constitutional requirements and cover responsive design as well as workflow integrity.
- **Alternatives considered**: Desktop-only review or visual snapshots alone. Rejected because they do not prove required mobile usability or preserved behavior.
