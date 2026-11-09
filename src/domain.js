export function parseMinute(time) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(time))) return NaN;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '')
    && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

export function validateCampaign(campaign, applications = []) {
  const errors = {};
  ['name', 'club', 'description', 'opensAt', 'closesAt', 'instructions'].forEach((field) => {
    if (!String(campaign[field] || '').trim()) errors[field] = 'Vui lòng điền thông tin này.';
  });
  for (const field of ['opensAt', 'closesAt']) {
    if (campaign[field] && !validDate(campaign[field])) errors[field] = 'Ngày không hợp lệ.';
  }
  if (campaign.opensAt && campaign.closesAt && campaign.opensAt >= campaign.closesAt) {
    errors.dates = 'Hạn cuối phải sau ngày bắt đầu nhận hồ sơ.';
  }
  if (applications.some((application) => application.submittedAt?.slice(0, 10) < campaign.opensAt
    || application.submittedAt?.slice(0, 10) > campaign.closesAt)) {
    errors.dates = 'Khoảng nhận hồ sơ phải bao gồm ngày nộp của các hồ sơ đã nhận.';
  }
  if (!campaign.departments?.length) errors.departments = 'Cần ít nhất một bộ phận và vị trí tuyển dụng.';
  (campaign.departments || []).forEach((department) => {
    if (!String(department.name || '').trim()) errors[`department-${department.id}`] = 'Vui lòng nhập tên bộ phận.';
    if (!department.positions?.length) errors.departments = 'Mỗi bộ phận cần ít nhất một vị trí.';
    (department.positions || []).forEach((position) => {
      for (const [field, prefix] of [['title', 'position'], ['description', 'description'], ['requirements', 'requirements']]) {
        if (!String(position[field] || '').trim()) errors[`${prefix}-${position.id}`] = 'Vui lòng điền thông tin này.';
      }
      if (!Number.isInteger(Number(position.quota)) || Number(position.quota) < 1) {
        errors[`quota-${position.id}`] = 'Chỉ tiêu phải là số nguyên từ 1 trở lên.';
      }
    });
  });
  return { valid: Object.keys(errors).length === 0, errors };
}

export function decideApplication(applications, applicationId, status) {
  if (!['Shortlisted', 'Rejected'].includes(status)) throw new Error('A screening decision must be Shortlisted or Rejected.');
  return applications.map((application) => application.id === applicationId ? { ...application, status } : { ...application });
}

export function findConflicts(candidate, assignments) {
  const conflicts = new Set();
  assignments.forEach((assignment) => {
    if (assignment.id === candidate.id || !['Proposed', 'Conflict', 'Confirmed'].includes(assignment.status)) return;
    if (candidate.date !== assignment.date) return;
    const overlaps = parseMinute(candidate.start) < parseMinute(assignment.end)
      && parseMinute(assignment.start) < parseMinute(candidate.end);
    if (!overlaps) return;
    if (candidate.applicantId && candidate.applicantId === assignment.applicantId) conflicts.add('applicant');
    if (candidate.interviewerId && candidate.interviewerId === assignment.interviewerId) conflicts.add('interviewer');
    if (candidate.roomId && candidate.roomId === assignment.roomId) conflicts.add('room');
  });
  return [...conflicts];
}

export function validateScheduleSettings({ date, duration, windowStart, windowEnd }, closesAt) {
  const errors = {};
  if (!validDate(date)) errors.date = 'Hãy chọn ngày phỏng vấn hợp lệ.';
  else if (!validDate(closesAt) || date <= closesAt) errors.date = 'Ngày phỏng vấn phải sau hạn cuối nhận hồ sơ.';
  if (![15, 20, 30].includes(Number(duration))) errors.duration = 'Thời lượng phải là 15, 20 hoặc 30 phút.';
  const start = parseMinute(windowStart);
  const end = parseMinute(windowEnd);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) errors.window = 'Giờ kết thúc phải sau giờ bắt đầu.';
  else if (end - start < Number(duration)) errors.window = 'Khung giờ phải đủ cho ít nhất một lượt phỏng vấn.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function isAvailable(resource, date, start, end) {
  return (resource?.availability || []).some((slot) => slot.date === date
    && parseMinute(slot.start) <= parseMinute(start) && parseMinute(end) <= parseMinute(slot.end)
    && parseMinute(start) < parseMinute(end));
}

function isQualified(interviewer, application) {
  return interviewer?.positionIds && application.positionId
    ? interviewer.positionIds.includes(application.positionId)
    : Boolean(interviewer?.positions?.includes(application.position));
}

export function sameScheduleSettings(first, second) {
  return Boolean(first && second && ['date', 'duration', 'windowStart', 'windowEnd']
    .every((key) => String(first[key]) === String(second[key])));
}

export function reviewSchedule({ applications, assignments, settings, draftSettings, campaign, closesAt, applicationsClosed, interviewers, rooms, confirmed = false }) {
  const configuration = validateScheduleSettings(settings, closesAt);
  const shortlisted = applications.filter((application) => application.status === 'Shortlisted');
  const stale = !sameScheduleSettings(settings, draftSettings);
  const checked = shortlisted.map((application, index) => {
    const matches = assignments.filter((item) => item.applicationId === application.id);
    const assignment = matches[0] || { id: `I-${application.id}-${index}`, applicationId: application.id };
    const interviewer = interviewers.find((item) => item.id === assignment.interviewerId);
    const room = rooms.find((item) => item.id === assignment.roomId);
    const start = parseMinute(assignment.start);
    const end = parseMinute(assignment.end);
    const reasons = [];
    if (matches.length > 1) reasons.push('Hồ sơ đang có nhiều hơn một lượt phỏng vấn.');
    if (!assignment.start || !assignment.end || !interviewer || !room) reasons.push('Chưa gán đủ giờ, người phỏng vấn và phòng.');
    else {
      if (assignment.applicantId !== application.applicantId) reasons.push('Ứng viên không khớp với hồ sơ.');
      if (assignment.date !== settings.date) reasons.push('Ngày của lượt phỏng vấn không khớp với ngày đã chọn.');
      if (!Number.isFinite(start) || !Number.isFinite(end) || end - start !== Number(settings.duration)) reasons.push('Thời lượng không khớp với thời lượng chung của chiến dịch.');
      if (start < parseMinute(settings.windowStart) || end > parseMinute(settings.windowEnd)) reasons.push('Lượt phỏng vấn nằm ngoài khung giờ đã chọn.');
      if (!isQualified(interviewer, application)) reasons.push('Người phỏng vấn không phụ trách vị trí này.');
      if (!isAvailable(application, assignment.date, assignment.start, assignment.end)) reasons.push('Ứng viên không rảnh trong khung giờ này.');
      if (!isAvailable(interviewer, assignment.date, assignment.start, assignment.end)) reasons.push('Người phỏng vấn không rảnh trong khung giờ này.');
      if (!isAvailable(room, assignment.date, assignment.start, assignment.end)) reasons.push('Phòng không khả dụng trong khung giờ này.');
    }
    return { ...assignment, applicantId: application.applicantId, applicant: application.applicant, position: application.position,
      status: reasons.length ? 'Unassigned' : 'Proposed', reason: reasons.join(' '), conflicts: [] };
  });
  const evaluated = checked.map((assignment) => {
    if (assignment.status === 'Unassigned') return assignment;
    const conflicts = findConflicts(assignment, checked);
    return { ...assignment, conflicts, status: conflicts.length ? 'Conflict' : confirmed ? 'Confirmed' : 'Proposed' };
  });
  const reasons = Object.values(configuration.errors);
  if (!campaign || campaign.state !== 'Published' || !validateCampaign(campaign, applications).valid) reasons.push('Cần đăng chiến dịch với thông tin hợp lệ trước khi xác nhận lịch.');
  if (!applicationsClosed) reasons.push('Cần đóng nhận hồ sơ trước khi xác nhận.');
  if (!applications.every((application) => ['Shortlisted', 'Rejected'].includes(application.status))) reasons.push('Cần đánh giá mọi hồ sơ trước khi xác nhận.');
  if (!shortlisted.length) reasons.push('Cần ít nhất một hồ sơ Shortlisted.');
  if (stale) reasons.push('Cấu hình đã thay đổi. Hãy tạo lại lịch nháp trước khi chỉnh sửa hoặc xác nhận.');
  if (evaluated.some((assignment) => ['Unassigned', 'Conflict'].includes(assignment.status))) reasons.push('Mỗi hồ sơ Shortlisted cần một lịch hợp lệ, không xung đột.');
  return { allowed: reasons.length === 0, reasons, assignments: evaluated, errors: configuration.errors, stale, summary: scheduleSummary(evaluated) };
}

export function canConfirmSchedule(options) {
  return reviewSchedule(options);
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

export function generateSchedule({ applications, interviewers, rooms, date, duration, windowStart, windowEnd, closesAt }) {
  const configuration = validateScheduleSettings({ date, duration, windowStart, windowEnd }, closesAt);
  if (!configuration.valid) throw new Error(Object.values(configuration.errors).join(' '));
  const assignments = [];
  applications.filter((application) => application.status === 'Shortlisted').forEach((application, index) => {
    let match = null;
    for (let minute = parseMinute(windowStart); minute + Number(duration) <= parseMinute(windowEnd); minute += Number(duration)) {
      const asTime = (value) => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
      const start = asTime(minute);
      const end = asTime(minute + Number(duration));
      if (!isAvailable(application, date, start, end)) continue;
      for (const interviewer of interviewers) {
        if (!isQualified(interviewer, application) || !isAvailable(interviewer, date, start, end)) continue;
        for (const room of rooms) {
          if (!isAvailable(room, date, start, end)) continue;
          const candidate = { id: `I${String(index + 1).padStart(2, '0')}`, applicationId: application.id,
            applicantId: application.applicantId, applicant: application.applicant, position: application.position,
            interviewerId: interviewer.id, interviewer: interviewer.name, roomId: room.id, room: room.name,
            date, start, end, status: 'Proposed', conflicts: [] };
          if (!findConflicts(candidate, assignments).length) { match = candidate; break; }
        }
        if (match) break;
      }
      if (match) break;
    }
    assignments.push(match || { id: `I${String(index + 1).padStart(2, '0')}`, applicationId: application.id,
      applicantId: application.applicantId, applicant: application.applicant, position: application.position,
      interviewerId: '', interviewer: '', roomId: '', room: '', date, start: '', end: '', status: 'Unassigned',
      reason: 'Không có tổ hợp giờ rảnh chung, người phỏng vấn phù hợp và phòng khả dụng.', conflicts: [] });
  });
  return assignments;
}
