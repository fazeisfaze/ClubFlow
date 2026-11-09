import test from 'node:test';
import assert from 'node:assert/strict';
import * as ClubFlow from '../src/domain.js';
import { campaignDefaults, createInitialState, hydrateState, interviewerDefaults, roomDefaults } from '../src/data.js';

function readySchedule() {
  const state = createInitialState();
  const options = { campaign: state.campaign, applications: state.applications, interviewers: interviewerDefaults, rooms: roomDefaults, settings: state.scheduleSettings, draftSettings: state.draftSettings, closesAt: state.campaign.closesAt, applicationsClosed: true };
  return { ...options, assignments: ClubFlow.generateSchedule({ ...options, ...options.settings }) };
}

test('campaign validation rejects missing fields and inverted dates', () => {
  const result = ClubFlow.validateCampaign({
    name: '',
    club: 'ClubFlow',
    description: 'Recruiting',
    opensAt: '2026-10-30',
    closesAt: '2026-10-01',
    instructions: 'Apply online',
  });

  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.dates);
});

test('a campaign with a completed period may still be configured for a closed-out prototype', () => {
  const result = ClubFlow.validateCampaign({
    ...structuredClone(campaignDefaults), name: 'ClubFlow 2026', club: 'ClubFlow', description: 'Recruitment',
    opensAt: '2026-10-01', closesAt: '2026-10-30', instructions: 'Apply online',
  });

  assert.equal(result.valid, true);
});

test('screening decisions update only the selected application', () => {
  const applications = [
    { id: 'A01', applicantId: 'student-a', status: 'Submitted' },
    { id: 'A02', applicantId: 'student-a', status: 'Submitted' },
  ];

  const updated = ClubFlow.decideApplication(applications, 'A01', 'Shortlisted');

  assert.equal(updated.find((application) => application.id === 'A01').status, 'Shortlisted');
  assert.equal(updated.find((application) => application.id === 'A02').status, 'Submitted');
  assert.equal(applications[0].status, 'Submitted');
});

test('schedule conflicts identify overlapping applicant, interviewer, and room use', () => {
  const assignments = [
    {
      id: 'I01', applicantId: 'student-a', interviewerId: 'interviewer-a', roomId: 'R1',
      start: '09:00', end: '09:20', status: 'Proposed',
    },
  ];
  const candidate = {
    id: 'I02', applicantId: 'student-a', interviewerId: 'interviewer-b', roomId: 'R2',
    start: '09:10', end: '09:30', status: 'Proposed',
  };

  assert.deepEqual(ClubFlow.findConflicts(candidate, assignments), ['applicant']);
  assert.deepEqual(ClubFlow.findConflicts(
    { ...candidate, applicantId: 'student-b', interviewerId: 'interviewer-a' }, assignments,
  ), ['interviewer']);
  assert.deepEqual(ClubFlow.findConflicts(
    { ...candidate, applicantId: 'student-b', interviewerId: 'interviewer-b', roomId: 'R1' }, assignments,
  ), ['room']);
});

test('schedule can only be confirmed after every gate passes', () => {
  const complete = readySchedule();
  assert.equal(ClubFlow.canConfirmSchedule(complete).allowed, true);
  assert.equal(ClubFlow.canConfirmSchedule({ ...complete, applicationsClosed: false }).allowed, false);
  const unreviewed = structuredClone(complete);
  unreviewed.applications[5].status = 'Submitted';
  assert.equal(ClubFlow.canConfirmSchedule(unreviewed).allowed, false);
  const overlap = structuredClone(complete);
  overlap.assignments[1].start = overlap.assignments[0].start;
  overlap.assignments[1].end = overlap.assignments[0].end;
  const checked = ClubFlow.canConfirmSchedule(overlap);
  assert.equal(checked.allowed, false);
  assert.equal(checked.assignments.filter((item) => item.status === 'Conflict').length, 2);
});

test('schedule summary counts exactly match each row state', () => {
  const summary = ClubFlow.scheduleSummary([
    { status: 'Proposed' },
    { status: 'Conflict' },
    { status: 'Unassigned' },
  ]);

  assert.deepEqual(summary, { Proposed: 1, Conflict: 1, Unassigned: 1, Confirmed: 0, total: 3 });
});

test('confirmed schedules count confirmed rows separately from draft states', () => {
  assert.deepEqual(ClubFlow.scheduleSummary([{ status: 'Confirmed' }, { status: 'Confirmed' }]), {
    Proposed: 0, Conflict: 0, Unassigned: 0, Confirmed: 2, total: 2,
  });
});

test('schedule generation picks the first conflict-free qualified slot per shortlisted application', () => {
  const schedule = ClubFlow.generateSchedule({
    closesAt: '2026-10-30',
    applications: [
      { id: 'A01', applicantId: 'student-a', applicant: 'An', position: 'Content', status: 'Shortlisted', availability: [{ date: '2026-11-07', start: '09:00', end: '10:00' }] },
      { id: 'A02', applicantId: 'student-a', applicant: 'An', position: 'Comms', status: 'Shortlisted', availability: [{ date: '2026-11-07', start: '09:00', end: '10:00' }] },
    ],
    interviewers: [
      { id: 'i1', name: 'Mai', positions: ['Content'], availableFrom: '09:00', availableTo: '10:00', availability: [{ date: '2026-11-07', start: '09:00', end: '10:00' }] },
      { id: 'i2', name: 'Bao', positions: ['Comms'], availableFrom: '09:00', availableTo: '10:00', availability: [{ date: '2026-11-07', start: '09:00', end: '10:00' }] },
    ],
    rooms: [{ id: 'r1', name: 'C101', availability: [{ date: '2026-11-07', start: '09:00', end: '10:00' }] }],
    date: '2026-11-07',
    duration: 20,
    windowStart: '09:00',
    windowEnd: '10:00',
  });

  assert.deepEqual(schedule.map(({ applicationId, start, end, status }) => ({ applicationId, start, end, status })), [
    { applicationId: 'A01', start: '09:00', end: '09:20', status: 'Proposed' },
    { applicationId: 'A02', start: '09:20', end: '09:40', status: 'Proposed' },
  ]);
});


test('publishing validates every department and position, including integer quotas', () => {
  const campaign = structuredClone(campaignDefaults);
  campaign.departments[0].name = '';
  Object.assign(campaign.departments[0].positions[0], { title: '', quota: 0, description: '', requirements: '' });
  const result = ClubFlow.validateCampaign(campaign);
  for (const key of ['department-content', 'position-content-creator', 'quota-content-creator', 'description-content-creator', 'requirements-content-creator']) assert.ok(result.errors[key], key);
  campaign.departments[0].positions[0].quota = 1.5;
  assert.ok(ClubFlow.validateCampaign(campaign).errors['quota-content-creator']);
  assert.equal(ClubFlow.validateCampaign({ ...campaignDefaults, opensAt: '2026-02-30' }).valid, false);
  assert.equal(ClubFlow.validateCampaign({ ...campaignDefaults, departments: [] }).valid, false);
});

test('generation rejects invalid dates and windows before producing a draft', () => {
  const context = readySchedule();
  for (const change of [{ date: '2026-10-01' }, { date: '' }, { date: '2026-02-30' }, { windowStart: '' }, { windowEnd: '08:00' }, { windowEnd: '09:05' }, { duration: 0 }]) {
    assert.throws(() => ClubFlow.generateSchedule({ ...context, ...context.settings, ...change }));
  }
});

test('changing any scheduling setting invalidates an existing draft', () => {
  for (const change of [{ date: '2026-12-01' }, { windowEnd: '09:05' }, { windowStart: '09:20' }, { duration: 15 }]) {
    const context = readySchedule();
    context.settings = { ...context.settings, ...change };
    const checked = ClubFlow.reviewSchedule(context);
    assert.equal(checked.allowed, false);
    assert.equal(checked.stale, true);
  }
});

test('confirmation rechecks assignment data instead of trusting cached Proposed status', () => {
  const cases = [
    ['missing start', (c) => { c.assignments[0].start = ''; }],
    ['invalid time', (c) => { c.assignments[0].start = '25:00'; }],
    ['outside window', (c) => { c.assignments[0].start = '08:40'; c.assignments[0].end = '09:00'; }],
    ['mixed duration', (c) => { c.assignments[0].end = '09:15'; }],
    ['wrong day', (c) => { c.assignments[0].date = '2026-12-01'; }],
    ['wrong applicant', (c) => { c.assignments[0].applicantId = 'another-applicant'; }],
    ['unknown room', (c) => { c.assignments[0].roomId = 'missing'; }],
    ['wrong qualification', (c) => { c.assignments[0].interviewerId = 'interviewer-bao'; }],
    ['applicant unavailable', (c) => { c.applications[0].availability = []; }],
    ['interviewer unavailable', (c) => { c.interviewers[0].availability = []; }],
    ['room unavailable', (c) => { c.rooms[0].availability = []; }],
    ['duplicate assignment', (c) => { c.assignments.push({ ...c.assignments[0], id: 'duplicate' }); }],
  ];
  for (const [label, corrupt] of cases) {
    const context = structuredClone(readySchedule());
    corrupt(context);
    const checked = ClubFlow.reviewSchedule(context);
    assert.equal(checked.allowed, false, label);
    assert.equal(checked.assignments[0].status, 'Unassigned', label);
    assert.ok(checked.assignments[0].reason, label);
  }
});

test('generation respects applicant, interviewer and room availability without rejecting applications', () => {
  for (const resource of ['applications', 'interviewers', 'rooms']) {
    const context = structuredClone(readySchedule());
    context[resource].forEach((item) => { item.availability = []; });
    const generated = ClubFlow.generateSchedule({ ...context, ...context.settings });
    assert.ok(generated.every((item) => item.status === 'Unassigned'), resource);
    assert.equal(context.applications[0].status, 'Shortlisted');
  }
});

test('initial totals remain coherent and newly shortlisted applications cannot disappear', () => {
  const state = createInitialState();
  const context = { ...readySchedule(), applications: state.applications, assignments: state.assignments };
  assert.deepEqual(ClubFlow.reviewSchedule(context).summary, { Proposed: 2, Conflict: 2, Unassigned: 1, Confirmed: 0, total: 5 });
  context.applications[5].status = 'Shortlisted';
  const checked = ClubFlow.reviewSchedule(context);
  assert.equal(checked.summary.total, 6);
  assert.equal(checked.allowed, false);
  assert.equal(checked.assignments.find((item) => item.applicationId === 'A06').status, 'Unassigned');
});

test('generation advances to a slot shared by the applicant, interviewer and room', () => {
  const context = structuredClone(readySchedule());
  context.applications = [context.applications[0]];
  context.applications[0].availability = [{ date: '2026-11-07', start: '09:20', end: '10:20' }];
  context.rooms.forEach((room) => { room.availability = [{ date: '2026-11-07', start: '09:40', end: '10:00' }]; });
  const generated = ClubFlow.generateSchedule({ ...context, ...context.settings });
  assert.equal(generated[0].start, '09:40');
  assert.equal(generated[0].end, '10:00');
  assert.equal(generated[0].status, 'Proposed');
});

test('legacy browser state gains fixture availability and persisted scheduling settings', () => {
  const legacy = createInitialState();
  delete legacy.scheduleSettings;
  delete legacy.draftSettings;
  legacy.applications.forEach((application) => { delete application.availability; });
  const restored = hydrateState(legacy);
  assert.equal(restored.scheduleSettings.duration, 20);
  assert.equal(restored.applications[0].availability[0].date, '2026-11-07');
  const saved = hydrateState({ ...restored, scheduleSettings: { ...restored.scheduleSettings, duration: 30 } });
  assert.equal(saved.scheduleSettings.duration, 30);
  assert.equal(saved.draftSettings.duration, 20);
});


test('draft campaigns and application dates outside the receiving period block confirmation', () => {
  const context = structuredClone(readySchedule());
  context.campaign.state = 'Draft';
  assert.equal(ClubFlow.reviewSchedule(context).allowed, false);
  context.campaign.state = 'Published';
  context.campaign.opensAt = '2026-10-15';
  assert.equal(ClubFlow.validateCampaign(context.campaign, context.applications).valid, false);
  assert.equal(ClubFlow.reviewSchedule(context).allowed, false);
});
