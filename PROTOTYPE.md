# ClubFlow Prototype

## Team

- Huynh Thanh Phuc — 24121705
- Nguyen Diep Than — 24127120

## Opening the prototype

Serve the committed `dist/` directory with a local static server. The production build is a
React application and needs JavaScript enabled. Its CSS and JavaScript are bundled locally; no
outside network access is required.

| Screen | Path | User actions | Main-flow links |
|---|---|---|---|
| Create Recruitment Campaign | `dist/index.html#/campaign` | Edit campaign details, departments, positions and quotas; save a draft; preview; validate and publish. | Applications opens `#/applications`. |
| Application Review | `dist/index.html#/applications` | Search/filter/sort/page through samples, read a sample CV and availability, save private notes, decide each application and export CSV. | Continue opens `#/schedule` only when a Shortlisted application exists. |
| Interview Scheduling | `dist/index.html#/schedule` | Select one date/window/duration, generate or edit a draft, resolve conflicts, export and confirm a valid schedule. | Back opens `#/applications`. |

The persistent step navigation opens these same three hash routes. Navigation does not
create applications or screening decisions. Schedule confirmation freezes the campaign,
application decisions/notes and schedule; theme switching and viewing/exporting remain available.

Build command: `npm run build`.

Appearance: Use the header control to switch between light and dark themes. The preference is stored
in this browser when local storage is available; otherwise the page starts in light mode.

## Layout and differences from the supplied screens

The ClubFlow assignment permits a different layout from the supplied reference screens.
This prototype uses an academic blue/gold palette, light/dark appearances, one coherent
October 1–30 application period and a November 7 interview date. Application details stack
on smaller screens and sit beside the list on sufficiently wide displays. Tables scroll in
their own wrappers when necessary, so the page itself does not scroll sideways. Actual
applicant conflicts and calculated totals replace the inconsistent reference examples.

The latest pass increases body/control/status text to at least 16 px and independent touch
targets to at least 44 px. Schedule settings persist across navigation/reloads. Changing
date/window/duration invalidates the old draft until regeneration; individual interviews
cannot have a different duration from the campaign. Both parties' availability, qualification,
rooms and overlaps are checked again before confirmation.

## Prototype limits and controls outside this milestone

There are no placeholder search, settings or logout links. The three Executive screens use
sample applications and existing interviewers/rooms. Applicant submission/results, interviewer
assessment, authentication and production persistence are outside this prototype. CV contents
are sample text, not uploaded PDF files. Browser local storage is a convenience, not a backend.

Sample applicants, interviewers and rooms have configured availability on November 7, 2026,
09:00–11:00. Other dates can leave applications Unassigned; the UI explains this sample limit.
Changing a department/position name keeps the linked application labels synchronized through
stable position IDs.

## CSS and responsive rules

React/Vite bundles one Tailwind CSS stylesheet locally. No runtime CDN, remote fonts or other
outside network assets are required. Spacing follows Tailwind's 4 px scale, including its
standard half steps. Body text is 16 px with a 1.5 line height. Controls use a 44 px minimum
touch target; focus rings and both palettes use locally defined colours.

Layouts start with one column. Tailwind breakpoints are 640 px (`sm`), 768 px (`md`),
1024 px (`lg`), 1280 px (`xl`) and 1536 px (`2xl`). Campaign fields gain columns at `sm`,
departments at `lg`, and roomy list/detail or schedule/sidebar layouts at `2xl`. Nine
light screenshots and nine dark screenshots cover 360, 768 and 1280 px.

Current verification: `checks/rubric-fixes.md`, raw browser measurements and local Nu HTML
Checker results in `checks/rubric-fixes/`, and the refreshed `screenshots/` captures.
