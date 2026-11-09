# ClubFlow Prototype

Serve the committed `dist/` directory with a local static server. The production build is a
React application and needs JavaScript enabled. Its CSS and JavaScript are bundled locally; no
outside network access is required.

| Screen | Path |
|---|---|
| Create Recruitment Campaign | `dist/index.html#/campaign` |
| Application Review | `dist/index.html#/applications` |
| Interview Scheduling | `dist/index.html#/schedule` |

Build command: `npm run build`.

Appearance: Use the header control to switch between light and dark themes. The preference is stored
in this browser when local storage is available; otherwise the page starts in light mode.
