export function parseMinute(time) {
  const [hours, minutes] = String(time).split(':').map(Number);
  return hours * 60 + minutes;
}

export function validateCampaign(campaign) {
  const errors = {};
  ['name', 'club', 'description', 'opensAt', 'closesAt', 'instructions'].forEach((field) => {
    if (!String(campaign[field] || '').trim()) errors[field] = 'This field is required.';
  });
  if (campaign.opensAt && campaign.closesAt && campaign.opensAt >= campaign.closesAt) {
    errors.dates = 'The closing date must be after the opening date.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function decideApplication(applications, applicationId, status) {
  if (!['Shortlisted', 'Rejected'].includes(status)) {
    throw new Error('A screening decision must be Shortlisted or Rejected.');
  }
  return applications.map((application) => (
    application.id === applicationId ? { ...application, status } : { ...application }
  ));
}

export function findConflicts(candidate, assignments) {
  const start = parseMinute(candidate.start);
  const end = parseMinute(candidate.end);
  const conflicts = new Set();
  assignments.forEach((assignment) => {
    if (assignment.id === candidate.id || !['Proposed', 'Conflict', 'Confirmed'].includes(assignment.status)) return;
    const overlaps = start < parseMinute(assignment.end) && parseMinute(assignment.start) < end;
    if (!overlaps) return;
    if (candidate.applicantId === assignment.applicantId) conflicts.add('applicant');
    if (candidate.interviewerId === assignment.interviewerId) conflicts.add('interviewer');
    if (candidate.roomId === assignment.roomId) conflicts.add('room');
  });
  return [...conflicts];
}

export function canConfirmSchedule({ applicationsClosed, allReviewed, shortlistedApplications, assignments }) {
  const assigned = new Map(assignments.map((assignment) => [assignment.applicationId, assignment]));
  const incomplete = shortlistedApplications.some((application) => {
    const assignment = assigned.get(application.id);
    return !assignment || assignment.status !== 'Proposed' || (assignment.conflicts || []).length > 0;
  });
  const reasons = [];
  if (!applicationsClosed) reasons.push('Applications must be closed.');
  if (!allReviewed) reasons.push('Every application must be reviewed.');
  if (incomplete) reasons.push('Every shortlisted application needs a valid, conflict-free assignment.');
  return { allowed: reasons.length === 0, reasons };
}

export function scheduleSummary(assignments) {
  const summary = { Proposed: 0, Conflict: 0, Unassigned: 0, Confirmed: 0, total: assignments.length };
  assignments.forEach((assignment) => {
    if (Object.hasOwn(summary, assignment.status)) summary[assignment.status] += 1;
  });
  return summary;
}

export function hasDuplicateApplication(applications, applicantId, positionId) {
  return applications.some((application) => application.applicantId === applicantId && application.positionId === positionId);
}

export function generateSchedule({ applications, interviewers, rooms, date, duration, windowStart, windowEnd }) {
  if (![15, 20, 30].includes(Number(duration))) throw new Error('Interview duration must be 15, 20, or 30 minutes.');
  const eligible = applications.filter((application) => application.status === 'Shortlisted');
  const startMinute = parseMinute(windowStart);
  const endMinute = parseMinute(windowEnd);
  const assignments = [];

  eligible.forEach((application, index) => {
    let match = null;
    for (let minute = startMinute; minute + Number(duration) <= endMinute; minute += Number(duration)) {
      const start = `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
      const finish = minute + Number(duration);
      const end = `${String(Math.floor(finish / 60)).padStart(2, '0')}:${String(finish % 60).padStart(2, '0')}`;
      for (const interviewer of interviewers) {
        if (!interviewer.positions.includes(application.position) || start < interviewer.availableFrom || end > interviewer.availableTo) continue;
        for (const room of rooms) {
          const candidate = {
            id: `I${String(index + 1).padStart(2, '0')}`,
            applicationId: application.id,
            applicantId: application.applicantId,
            applicant: application.applicant,
            position: application.position,
            interviewerId: interviewer.id,
            interviewer: interviewer.name,
            roomId: room.id,
            room: room.name,
            date,
            start,
            end,
            status: 'Proposed',
            conflicts: [],
          };
          if (!findConflicts(candidate, assignments).length) { match = candidate; break; }
        }
        if (match) break;
      }
      if (match) break;
    }
    assignments.push(match || {
      id: `I${String(index + 1).padStart(2, '0')}`,
      applicationId: application.id,
      applicantId: application.applicantId,
      applicant: application.applicant,
      position: application.position,
      interviewerId: '',
      interviewer: '',
      roomId: '',
      room: '',
      date,
      start: '',
      end: '',
      status: 'Unassigned',
      reason: 'No qualified interviewer, shared available slot, and room combination is available.',
      conflicts: [],
    });
  });
  return assignments;
}
