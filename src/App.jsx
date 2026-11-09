import React, { useEffect, useState } from 'react';
import Shell from './components/Shell.jsx';
import CampaignPage from './components/CampaignPage.jsx';
import ApplicationsPage from './components/ApplicationsPage.jsx';
import SchedulePage from './components/SchedulePage.jsx';
import { createInitialState, hydrateState } from './data.js';
import { readThemePreference, saveThemePreference, toggleTheme } from './theme.js';

const STORAGE_KEY = 'clubflow-react-prototype-v1';

function loadInitialState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.campaign && Array.isArray(saved.applications) && Array.isArray(saved.assignments)) return hydrateState(saved);
  } catch { /* Fall back to deterministic fixtures. */ }
  return createInitialState();
}

function readRoute() {
  const route = window.location.hash.replace(/^#\/?/, '');
  return ['campaign', 'applications', 'schedule'].includes(route) ? route : 'campaign';
}

export default function App() {
  const [state, setState] = useState(loadInitialState);
  const [screen, setScreen] = useState(readRoute);
  const [theme, setTheme] = useState(() => readThemePreference());

  useEffect(() => {
    const onHashChange = () => setScreen(readRoute());
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '/campaign';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const titles = { campaign: 'Create Recruitment Campaign', applications: 'Application Review', schedule: 'Interview Scheduling' };
    document.title = `${titles[screen]} · ClubFlow`;
  }, [screen]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* UI remains functional without storage. */ }
  }, [state]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#101a28' : '#142b47';
    saveThemePreference(theme);
  }, [theme]);

  function setCampaign(update) {
    setState((current) => {
      if (current.confirmed) return current;
      const campaign = typeof update === 'function' ? update(current.campaign) : update;
      const applications = current.applications.map((application) => {
        const department = campaign.departments.find((item) => item.positions.some((position) => position.id === application.positionId));
        const position = department?.positions.find((item) => item.id === application.positionId);
        return position ? { ...application, position: position.title, department: department.name } : application;
      });
      return { ...current, campaign, applications };
    });
  }

  const page = screen === 'applications'
    ? <ApplicationsPage state={state} setState={setState} confirmed={state.confirmed} />
    : screen === 'schedule'
      ? <SchedulePage state={state} setState={setState} />
      : <CampaignPage campaign={state.campaign} applications={state.applications} setCampaign={setCampaign} confirmed={state.confirmed} />;

  return <Shell screen={screen} campaign={state.campaign} confirmed={state.confirmed} canSchedule={state.applications.some((application) => application.status === 'Shortlisted')} theme={theme} onToggleTheme={() => setTheme((current) => toggleTheme(current))}>{page}</Shell>;
}
