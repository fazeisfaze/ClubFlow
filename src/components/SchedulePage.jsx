import React, { useMemo, useState } from 'react';
import { canConfirmSchedule, findConflicts, generateSchedule, parseMinute, scheduleSummary } from '../domain.js';
import { Button, ButtonLink, Card, Field, inputClass, Notice, PageHeading, Status, StatusMessage, downloadCsv, formatDate } from './Shared.jsx';
import { interviewerDefaults, roomDefaults } from '../data.js';

function addMinutes(time, duration) {
  const total = parseMinute(time) + Number(duration);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function checkedAssignments(assignments) {
  return assignments.map((assignment) => {
    if (!assignment.start || !assignment.end || !assignment.interviewerId || !assignment.roomId) return assignment;
    const conflicts = findConflicts(assignment, assignments);
    return { ...assignment, status: conflicts.length ? 'Conflict' : assignment.status === 'Conflict' ? 'Proposed' : assignment.status, conflicts };
  });
}

export default function SchedulePage({ state, setState }) {
  const [date, setDate] = useState(state.campaign.interviewDate || '2026-11-07');
  const [duration, setDuration] = useState(20);
  const [windowStart, setWindowStart] = useState('09:00');
  const [windowEnd, setWindowEnd] = useState('11:00');
  const [activeId, setActiveId] = useState(null);
  const [editTime, setEditTime] = useState('09:00');
  const [editInterviewer, setEditInterviewer] = useState('');
  const [editRoom, setEditRoom] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState('');
  const shortlisted = state.applications.filter((application) => application.status === 'Shortlisted');
  const assignments = useMemo(() => checkedAssignments(state.assignments.filter((assignment) => shortlisted.some((application) => application.id === assignment.applicationId))), [state.assignments, state.applications]);
  const summary = scheduleSummary(assignments);
  const allReviewed = state.applications.every((application) => application.status !== 'Submitted');
  const gate = canConfirmSchedule({ applicationsClosed: Boolean(state.applicationsClosed), allReviewed, shortlistedApplications: shortlisted, assignments });
  const activeAssignment = assignments.find((assignment) => assignment.id === activeId);

  function updateState(update) { setState((current) => ({ ...current, ...update })); }
  function updateAssignment() {
    if (!activeAssignment) return;
    const application = state.applications.find((item) => item.id === activeAssignment.applicationId);
    const interviewer = interviewerDefaults.find((item) => item.id === editInterviewer);
    const room = roomDefaults.find((item) => item.id === editRoom);
    const end = addMinutes(editTime, duration);
    const next = {
      ...activeAssignment,
      date,
      start: editTime,
      end,
      interviewerId: interviewer?.id || '',
      interviewer: interviewer?.name || '',
      roomId: room?.id || '',
      room: room?.name || '',
      applicantId: application.applicantId,
      applicant: application.applicant,
      position: application.position,
      status: 'Proposed',
      conflicts: [],
      reason: '',
    };
    if (!interviewer || !interviewer.positions.includes(application.position)) {
      next.status = 'Unassigned'; next.reason = 'Người phỏng vấn chưa được phân công cho vị trí này.';
    } else if (editTime < interviewer.availableFrom || end > interviewer.availableTo || editTime < windowStart || end > windowEnd) {
      next.status = 'Unassigned'; next.reason = 'Khung giờ nằm ngoài thời gian có mặt hoặc ngoài khung phỏng vấn.';
    } else if (!room) {
      next.status = 'Unassigned'; next.reason = 'Hãy chọn một phòng hiện có.';
    } else {
      next.conflicts = findConflicts(next, assignments);
      if (next.conflicts.length) next.status = 'Conflict';
    }
    const updated = checkedAssignments(assignments.map((item) => item.id === activeId ? next : item));
    updateState({ assignments: updated });
    setMessage(next.status === 'Conflict' ? `Phát hiện xung đột: ${next.conflicts.join(', ')}. Không thể xác nhận.` : next.status === 'Unassigned' ? next.reason : 'Đã cập nhật lịch và kiểm tra lại người, thời gian, phòng.');
    setActiveId(null);
  }

  function generateDraft() {
    if (state.confirmed) return;
    try {
      const generated = generateSchedule({
        applications: state.applications,
        interviewers: interviewerDefaults,
        rooms: roomDefaults,
        date,
        duration: Number(duration),
        windowStart,
        windowEnd,
      });
      updateState({ assignments: generated, campaign: { ...state.campaign, interviewDate: date } });
      setMessage('Đã tạo lịch nháp theo tổ hợp thời gian, người phỏng vấn và phòng khả dụng đầu tiên.');
    } catch (error) { setMessage(error.message); }
  }

  function startEdit(assignment) {
    if (state.confirmed) return;
    setActiveId(assignment.id);
    setEditTime(assignment.start || windowStart);
    setEditInterviewer(assignment.interviewerId || '');
    setEditRoom(assignment.roomId || '');
  }

  function exportSchedule() {
    downloadCsv('clubflow-interview-schedule.csv', [
      ['Mã hồ sơ', 'Ứng viên', 'Vị trí', 'Ngày', 'Bắt đầu', 'Kết thúc', 'Người phỏng vấn', 'Phòng', 'Trạng thái'],
      ...assignments.map((item) => [item.applicationId, item.applicant, item.position, item.date, item.start, item.end, item.interviewer, item.room, item.status]),
    ]);
  }

  function confirmSchedule() {
    if (!gate.allowed) { setMessage(gate.reasons.join(' ')); return; }
    setConfirmOpen(true);
  }

  function confirmFinal() {
    updateState({ confirmed: true, assignments: assignments.map((assignment) => ({ ...assignment, status: 'Confirmed', conflicts: [] })) });
    setConfirmOpen(false);
    setMessage('Lịch đã xác nhận. Cấu hình, hồ sơ và lịch hiện ở chế độ chỉ đọc.');
  }

  return <>
    <PageHeading eyebrow="Bước 03 · Điều phối phỏng vấn" title="Xếp lịch phỏng vấn" description="Tạo lịch nháp cho các hồ sơ đã qua vòng CV. Kiểm tra khả năng của ứng viên, người phỏng vấn và phòng trước khi xác nhận." action={<Button type="button" variant="secondary" onClick={exportSchedule}>↓ Xuất lịch CSV</Button>} />
    <Notice>Chiến dịch: <strong>{state.campaign.name}</strong> · Ngày phỏng vấn dự kiến: <strong>{formatDate(date)}</strong>. Shortlisted chỉ có nghĩa là qua vòng CV, chưa phải kết quả tuyển cuối cùng.</Notice>
    <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
      <Card className="university-card" title="Bản nháp lịch phỏng vấn" subtitle="Mỗi phòng chỉ tổ chức một buổi tại một thời điểm." action={<Status value={state.confirmed ? 'Confirmed' : 'Proposed'} />}>
        <div className="grid gap-3 border-b border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          <Field id="interview-date" label="Ngày phỏng vấn"><input className={inputClass} type="date" id="interview-date" value={date} disabled={state.confirmed} onChange={(event) => setDate(event.target.value)} /></Field>
          <Field id="window-start" label="Bắt đầu khung giờ"><input className={inputClass} type="time" id="window-start" value={windowStart} disabled={state.confirmed} onChange={(event) => setWindowStart(event.target.value)} /></Field>
          <Field id="window-end" label="Kết thúc khung giờ"><input className={inputClass} type="time" id="window-end" value={windowEnd} disabled={state.confirmed} onChange={(event) => setWindowEnd(event.target.value)} /></Field>
          <Field id="duration" label="Thời lượng mỗi lượt"><select className={inputClass} id="duration" value={duration} disabled={state.confirmed} onChange={(event) => setDuration(Number(event.target.value))}><option value={15}>15 phút</option><option value={20}>20 phút</option><option value={30}>30 phút</option></select></Field>
          <Button type="button" disabled={state.confirmed || shortlisted.length === 0} onClick={generateDraft}>Tạo lịch nháp <span aria-hidden="true">✦</span></Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-100 px-4 py-3 text-[11px] text-slate-500 sm:px-5"><span className="font-bold text-slate-700">{summary.total} hồ sơ đủ điều kiện</span>{state.confirmed ? <span>Confirmed <strong className="text-teal-800">{summary.Confirmed}</strong></span> : <><span>Proposed <strong className="text-blue-700">{summary.Proposed}</strong></span><span>Conflict <strong className="text-red-700">{summary.Conflict}</strong></span><span>Unassigned <strong className="text-amber-700">{summary.Unassigned}</strong></span></>}</div>
        <div className="page-scroll max-w-full overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-[11px]">
            <thead className="bg-white text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-3 py-3 font-bold">Hồ sơ</th><th className="px-3 py-3 font-bold">Ứng viên</th><th className="px-3 py-3 font-bold">Vị trí</th><th className="px-3 py-3 font-bold">Giờ</th><th className="px-3 py-3 font-bold">Người phỏng vấn</th><th className="px-3 py-3 font-bold">Phòng</th><th className="px-3 py-3 font-bold">Trạng thái / lý do</th><th className="px-3 py-3 font-bold">Thao tác</th></tr></thead>
            <tbody>{assignments.length ? assignments.map((assignment) => <tr key={assignment.id} className="border-t border-slate-100 align-middle hover:bg-slate-50/70"><th scope="row" className="px-3 py-3 font-bold text-teal-800">{assignment.applicationId}</th><td className="px-3 py-3 font-semibold text-slate-800">{assignment.applicant}</td><td className="px-3 py-3 text-slate-600">{assignment.position}</td><td className="px-3 py-3 tabular-nums text-slate-700">{assignment.start ? `${assignment.start}–${assignment.end}` : '—'}</td><td className="px-3 py-3 text-slate-600">{assignment.interviewer || '—'}</td><td className="px-3 py-3 text-slate-600">{assignment.room || '—'}</td><td className="max-w-[190px] px-3 py-3"><Status value={state.confirmed ? 'Confirmed' : assignment.status} />{assignment.reason && <p className="mt-1.5 text-[10px] leading-4 text-amber-800">{assignment.reason}</p>}{assignment.conflicts?.length > 0 && <p className="mt-1.5 text-[10px] leading-4 text-red-700">Xung đột: {assignment.conflicts.join(', ')}</p>}</td><td className="px-3 py-3"><Button type="button" variant="secondary" className="min-h-8 px-2.5" disabled={state.confirmed} onClick={() => startEdit(assignment)}>{assignment.status === 'Unassigned' ? '+ Gán giờ' : assignment.status === 'Conflict' ? 'Giải quyết' : 'Sửa'}</Button></td></tr>) : <tr><td colSpan="8" className="px-4 py-8 text-center text-xs text-slate-500">Chưa có hồ sơ Shortlisted để xếp lịch.</td></tr>}</tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="max-w-2xl text-[10px] leading-5 text-slate-500">Hệ thống kiểm tra giao nhau của ứng viên, người phỏng vấn và phòng. Xung đột hoặc hồ sơ chưa xếp lịch sẽ chặn xác nhận.</p><div className="flex shrink-0 flex-wrap gap-2"><Button type="button" variant="secondary" disabled={state.confirmed} onClick={() => { updateState({ assignments }); setMessage('Đã lưu thay đổi dưới dạng lịch nháp.'); }}>Lưu thay đổi</Button><Button type="button" disabled={state.confirmed || !gate.allowed} onClick={confirmSchedule}>Duyệt & xác nhận lịch</Button></div></div>
      </Card>

      <aside className="space-y-4">
        <Card className="university-card" title="Điều kiện xác nhận" subtitle="Tất cả điều kiện phải đạt trước khi khóa lịch.">
          <div className="space-y-3 p-4 text-xs"><label className="flex cursor-pointer items-start gap-2.5"><input className="mt-0.5 accent-teal-700" type="checkbox" checked={Boolean(state.applicationsClosed)} disabled={state.confirmed} onChange={(event) => updateState({ applicationsClosed: event.target.checked })} /><span><strong className="block text-slate-800">Đã đóng nhận hồ sơ</strong><span className="mt-0.5 block text-[10px] text-slate-500">Hạn nhận: {state.campaign.closesAt}</span></span></label><div className="flex items-start gap-2.5"><span className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full text-[9px] ${allReviewed ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>{allReviewed ? '✓' : '!'}</span><span><strong className="block text-slate-800">Đã đánh giá mọi hồ sơ</strong><span className="mt-0.5 block text-[10px] text-slate-500">{state.applications.filter((item) => item.status === 'Submitted').length} hồ sơ chưa đánh giá</span></span></div><div className="flex items-start gap-2.5"><span className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full text-[9px] ${summary.Unassigned === 0 ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>{summary.Unassigned === 0 ? '✓' : '!'}</span><span><strong className="block text-slate-800">Đã xếp đủ hồ sơ Shortlisted</strong><span className="mt-0.5 block text-[10px] text-slate-500">{summary.Unassigned} chưa xếp · {summary.Conflict} xung đột</span></span></div></div>
        </Card>
        <Notice tone="amber"><strong>Quy tắc phân lịch</strong><br />15, 20 hoặc 30 phút mỗi lượt. Chỉ người phỏng vấn phù hợp vị trí và phòng hiện có được sử dụng.</Notice>
        <div className="university-card rounded-2xl border border-slate-200 bg-white p-4"><p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Trạng thái xác nhận</p><div className="mt-2"><Status value={state.confirmed ? 'Confirmed' : 'Proposed'} /></div><p className="mt-2 text-[10px] leading-4 text-slate-500">{state.confirmed ? 'Lịch đã khóa. Mọi chỉnh sửa và tạo lịch mới đều bị vô hiệu hóa.' : 'Lịch hiện tại vẫn là bản nháp cho đến khi được xác nhận.'}</p><StatusMessage>{message || (!gate.allowed ? gate.reasons.join(' ') : 'Tất cả điều kiện đã đạt.')}</StatusMessage></div>
      </aside>
    </div>

    {activeAssignment && <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/45 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveId(null); }}><section className="w-full max-w-lg rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-assignment-title"><div className="border-b border-slate-100 px-5 py-4"><h2 id="edit-assignment-title" className="font-display text-lg font-extrabold">Điều chỉnh lịch · {activeAssignment.applicationId}</h2><p className="mt-1 text-xs text-slate-500">{activeAssignment.applicant} · {activeAssignment.position}</p></div><div className="grid gap-4 p-5 sm:grid-cols-2"><Field id="edit-start" label="Giờ bắt đầu"><input className={inputClass} id="edit-start" type="time" value={editTime} onChange={(event) => setEditTime(event.target.value)} /></Field><Field id="edit-end" label="Thời lượng"><select className={inputClass} id="edit-end" value={duration} onChange={(event) => setDuration(Number(event.target.value))}><option value={15}>15 phút</option><option value={20}>20 phút</option><option value={30}>30 phút</option></select></Field><Field id="edit-interviewer" label="Người phỏng vấn"><select className={inputClass} id="edit-interviewer" value={editInterviewer} onChange={(event) => setEditInterviewer(event.target.value)}><option value="">Chọn người phỏng vấn</option>{interviewerDefaults.map((interviewer) => <option key={interviewer.id} value={interviewer.id}>{interviewer.name} · {interviewer.positions.join(', ')}</option>)}</select></Field><Field id="edit-room" label="Phòng"><select className={inputClass} id="edit-room" value={editRoom} onChange={(event) => setEditRoom(event.target.value)}><option value="">Chọn phòng</option>{roomDefaults.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}</select></Field><p className="text-[10px] leading-4 text-slate-500 sm:col-span-2">Thay đổi được kiểm tra lại với thời gian khả dụng và xung đột về ứng viên, người phỏng vấn, phòng.</p></div><div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4"><Button type="button" variant="secondary" onClick={() => setActiveId(null)}>Hủy</Button><Button type="button" onClick={updateAssignment}>Lưu & kiểm tra</Button></div></section></div>}

    {confirmOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" role="presentation"><section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><p className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700">Bước cuối</p><h2 id="confirm-title" className="mt-2 font-display text-xl font-extrabold">Xác nhận lịch phỏng vấn?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Sau khi xác nhận, chiến dịch, hồ sơ và lịch sẽ chuyển sang chỉ đọc. Thao tác này không công bố kết quả tuyển dụng cuối cùng.</p><div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-700"><p>{assignments.length} hồ sơ · {formatDate(date)}</p><p className="mt-1">{summary.Proposed} lịch hợp lệ · 0 xung đột · 0 chưa xếp</p></div><div className="mt-5 flex justify-end gap-2"><Button type="button" variant="secondary" onClick={() => setConfirmOpen(false)}>Quay lại</Button><Button type="button" onClick={confirmFinal}>Xác nhận lịch</Button></div></section></div>}

    <div className="mt-5 flex justify-between gap-2"><ButtonLink variant="quiet" href="#/applications"><span aria-hidden="true">←</span> Quay lại duyệt hồ sơ</ButtonLink><span className="self-center text-xs text-slate-600">Ngày phỏng vấn: {formatDate(date)}</span></div>
  </>;
}
