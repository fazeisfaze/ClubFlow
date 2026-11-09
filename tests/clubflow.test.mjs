import test from 'node:test';
import assert from 'node:assert/strict';
import * as ClubFlow from '../src/domain.js';

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
    name: 'ClubFlow 2026', club: 'ClubFlow', description: 'Recruitment',
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
  const complete = {
    applicationsClosed: true,
    allReviewed: true,
    shortlistedApplications: [{ id: 'A01' }],
    assignments: [{ applicationId: 'A01', status: 'Proposed', conflicts: [] }],
  };

  assert.equal(ClubFlow.canConfirmSchedule(complete).allowed, true);
  assert.equal(ClubFlow.canConfirmSchedule({ ...complete, applicationsClosed: false }).allowed, false);
  assert.equal(ClubFlow.canConfirmSchedule({
    ...complete,
    assignments: [{ applicationId: 'A01', status: 'Conflict', conflicts: ['room'] }],
  }).allowed, false);
  assert.equal(ClubFlow.canConfirmSchedule({ ...complete, allReviewed: false }).allowed, false);
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
    applications: [
      { id: 'A01', applicantId: 'student-a', applicant: 'An', position: 'Content', status: 'Shortlisted' },
      { id: 'A02', applicantId: 'student-a', applicant: 'An', position: 'Comms', status: 'Shortlisted' },
    ],
    interviewers: [
      { id: 'i1', name: 'Mai', positions: ['Content'], availableFrom: '09:00', availableTo: '10:00' },
      { id: 'i2', name: 'Bao', positions: ['Comms'], availableFrom: '09:00', availableTo: '10:00' },
    ],
    rooms: [{ id: 'r1', name: 'C101' }],
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
