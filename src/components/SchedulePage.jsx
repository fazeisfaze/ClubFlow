import React, { useMemo, useState } from 'react';
import { reviewSchedule, generateSchedule, parseMinute } from '../domain.js';
import { Button, ButtonLink, Card, Field, inputClass, Notice, PageHeading, Status, StatusMessage, downloadCsv, formatDate } from './Shared.jsx';
import { interviewerDefaults, roomDefaults } from '../data.js';

function addMinutes(time, duration) {
  const total = parseMinute(time) + Number(duration);
  if (!Number.isFinite(total) || total >= 24 * 60) return '';
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function inspectState(current) {
  return reviewSchedule({ applications: current.applications, assignments: current.assignments,
    settings: current.scheduleSettings, draftSettings: current.draftSettings,
    campaign: current.campaign, closesAt: current.campaign.closesAt, applicationsClosed: current.applicationsClosed,
    interviewers: interviewerDefaults, rooms: roomDefaults, confirmed: current.confirmed });
}

export default function SchedulePage({ state, setState }) {
  const { date, duration, windowStart, windowEnd } = state.scheduleSettings;
  const [activeId, setActiveId] = useState(null);
  const [editTime, setEditTime] = useState('09:00');
  const [editInterviewer, setEditInterviewer] = useState('');
  const [editRoom, setEditRoom] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState('');
  const shortlisted = state.applications.filter((application) => application.status === 'Shortlisted');
  const gate = useMemo(() => inspectState(state), [state]);
  const { assignments, summary } = gate;
  const allReviewed = state.applications.every((application) => ['Shortlisted', 'Rejected'].includes(application.status));
  const positionTitles = Object.fromEntries(state.campaign.departments.flatMap((department) => department.positions.map((position) => [position.id, position.title])));
  const activeAssignment = assignments.find((assignment) => assignment.id === activeId);

  function updateState(update) { setState((current) => current.confirmed ? current : ({ ...current, ...update })); }
  function updateSettings(field, value) {
    if (state.confirmed) return;
    updateState({ scheduleSettings: { ...state.scheduleSettings, [field]: value } });
    setConfirmOpen(false);
    setActiveId(null);
    setMessage('Cấu hình đã thay đổi. Hãy tạo lại lịch nháp để kiểm tra toàn bộ hồ sơ.');
  }
  function updateAssignment() {
    if (!activeAssignment || state.confirmed || gate.stale) return;
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
    const checked = inspectState({ ...state, assignments: assignments.map((item) => item.id === activeId ? next : item) });
    const result = checked.assignments.find((item) => item.id === activeId);
    updateState({ assignments: checked.assignments });
    setMessage(result.status === 'Conflict' ? 'Phát hiện xung đột. Hãy sửa các dòng được đánh dấu trước khi xác nhận.' : result.reason || 'Đã kiểm tra lại ứng viên, người phỏng vấn, phòng và thời lượng chung.');
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
        closesAt: state.campaign.closesAt,
      });
      updateState({ assignments: generated, draftSettings: { ...state.scheduleSettings }, campaign: { ...state.campaign, interviewDate: date } });
      setMessage('Đã tạo lịch nháp theo tổ hợp thời gian, người phỏng vấn và phòng khả dụng đầu tiên.');
    } catch (error) { setMessage(error.message); }
  }

  function startEdit(assignment) {
    if (state.confirmed || gate.stale) return;
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
    const fresh = inspectState(state);
    if (!fresh.allowed || state.confirmed) { setConfirmOpen(false); setMessage(fresh.reasons.join(' ')); return; }
    setState((current) => {
      const checked = inspectState(current);
      if (current.confirmed || !checked.allowed) return current;
      return { ...current, confirmed: true, campaign: { ...current.campaign, interviewDate: current.scheduleSettings.date },
        assignments: checked.assignments.map((assignment) => ({ ...assignment, status: 'Confirmed', conflicts: [] })) };
    });
    setConfirmOpen(false);
    setMessage('Lịch đã xác nhận. Cấu hình, hồ sơ và lịch hiện ở chế độ chỉ đọc.');
  }

  return <>
    <PageHeading eyebrow="Bước 03 · Điều phối phỏng vấn" title="Xếp lịch phỏng vấn" description="Tạo lịch nháp cho các hồ sơ đã qua vòng CV. Kiểm tra khả năng của ứng viên, người phỏng vấn và phòng trước khi xác nhận." action={<Button type="button" variant="secondary" onClick={exportSchedule}>↓ Xuất lịch CSV</Button>} />
    <Notice>Chiến dịch: <strong>{state.campaign.name}</strong> · Ngày phỏng vấn dự kiến: <strong>{formatDate(date)}</strong>. Shortlisted chỉ có nghĩa là qua vòng CV, chưa phải kết quả tuyển cuối cùng.</Notice>
    {gate.stale && <div className="mt-4"><Notice tone="amber">Cấu hình đã thay đổi. Bản nháp chưa được xác nhận; hãy tạo lại lịch để dùng ngày, khung giờ và thời lượng mới.</Notice></div>}
    <div className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="university-card" title="Bản nháp lịch phỏng vấn" subtitle="Mỗi phòng chỉ tổ chức một buổi tại một thời điểm." action={<Status value={state.confirmed ? 'Confirmed' : 'Proposed'} />}>
        <div className="grid gap-3 border-b border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          <Field id="interview-date" label="Ngày phỏng vấn" error={gate.errors.date}><input className={inputClass} type="date" id="interview-date" aria-invalid={Boolean(gate.errors.date)} value={date} disabled={state.confirmed} onChange={(event) => updateSettings('date', event.target.value)} /></Field>
          <Field id="window-start" label="Bắt đầu khung giờ"><input className={inputClass} type="time" id="window-start" value={windowStart} disabled={state.confirmed} onChange={(event) => updateSettings('windowStart', event.target.value)} /></Field>
          <Field id="window-end" label="Kết thúc khung giờ" error={gate.errors.window}><input className={inputClass} type="time" id="window-end" aria-invalid={Boolean(gate.errors.window)} value={windowEnd} disabled={state.confirmed} onChange={(event) => updateSettings('windowEnd', event.target.value)} /></Field>
          <Field id="duration" label="Thời lượng mỗi lượt"><select className={inputClass} id="duration" value={duration} disabled={state.confirmed} onChange={(event) => updateSettings('duration', Number(event.target.value))}><option value={15}>15 phút</option><option value={20}>20 phút</option><option value={30}>30 phút</option></select></Field>
          <Button type="button" disabled={state.confirmed || shortlisted.length === 0} onClick={generateDraft}>Tạo lịch nháp <span aria-hidden="true">✦</span></Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-100 px-4 py-3 text-base text-slate-500 sm:px-5"><span className="font-bold text-slate-700">{summary.total} hồ sơ đủ điều kiện</span>{state.confirmed ? <span>Confirmed <strong className="text-teal-800">{summary.Confirmed}</strong></span> : <><span>Proposed <strong className="text-blue-700">{summary.Proposed}</strong></span><span>Conflict <strong className="text-red-700">{summary.Conflict}</strong></span><span>Unassigned <strong className="text-amber-700">{summary.Unassigned}</strong></span></>}</div>
        <div className="page-scroll max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="Bảng lịch phỏng vấn, cuộn ngang để xem đủ cột">
          <table className="w-full min-w-[1180px] border-collapse text-left text-base">
            <thead className="bg-white text-base uppercase tracking-wider text-slate-500"><tr><th className="px-3 py-3 font-bold">Hồ sơ</th><th className="px-3 py-3 font-bold">Ứng viên</th><th className="px-3 py-3 font-bold">Vị trí</th><th className="px-3 py-3 font-bold">Ngày / giờ</th><th className="px-3 py-3 font-bold">Người phỏng vấn</th><th className="px-3 py-3 font-bold">Phòng</th><th className="px-3 py-3 font-bold">Trạng thái / lý do</th><th className="px-3 py-3 font-bold">Thao tác</th></tr></thead>
            <tbody>{assignments.length ? assignments.map((assignment) => <tr key={assignment.id} className="border-t border-slate-100 align-middle hover:bg-slate-50/70"><th scope="row" className="px-3 py-3 font-bold text-teal-800">{assignment.applicationId}</th><td className="px-3 py-3 font-semibold text-slate-800">{assignment.applicant}</td><td className="px-3 py-3 text-slate-600">{assignment.position}</td><td className="px-3 py-3 tabular-nums text-slate-700"><span className="block whitespace-nowrap">{assignment.date || '—'}</span><span className="block whitespace-nowrap">{assignment.start ? `${assignment.start}–${assignment.end}` : '—'}</span></td><td className="px-3 py-3 text-slate-600">{assignment.interviewer || '—'}</td><td className="px-3 py-3 text-slate-600">{assignment.room || '—'}</td><td className="max-w-[190px] px-3 py-3"><Status value={assignment.status} />{assignment.reason && <p className="mt-1.5 text-base leading-6 text-amber-800">{assignment.reason}</p>}{assignment.conflicts?.length > 0 && <p className="mt-1.5 text-base leading-6 text-red-700">Xung đột: {assignment.conflicts.join(', ')}</p>}</td><td className="px-3 py-3"><Button type="button" variant="secondary" className="min-h-11 px-2.5" disabled={state.confirmed || gate.stale} onClick={() => startEdit(assignment)}>{assignment.status === 'Unassigned' ? '+ Gán giờ' : assignment.status === 'Conflict' ? 'Giải quyết' : 'Sửa'}</Button></td></tr>) : <tr><td colSpan="8" className="px-4 py-8 text-center text-base text-slate-500">Chưa có hồ sơ Shortlisted để xếp lịch.</td></tr>}</tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="max-w-2xl text-base leading-6 text-slate-500">Hệ thống kiểm tra giao nhau của ứng viên, người phỏng vấn và phòng. Xung đột hoặc hồ sơ chưa xếp lịch sẽ chặn xác nhận.</p><div className="flex shrink-0 flex-wrap gap-2"><Button type="button" variant="secondary" disabled={state.confirmed} onClick={() => { updateState({ assignments }); setMessage('Đã lưu thay đổi dưới dạng lịch nháp.'); }}>Lưu thay đổi</Button><Button type="button" disabled={state.confirmed || !gate.allowed} onClick={confirmSchedule}>Duyệt & xác nhận lịch</Button></div></div>
      </Card>

      <aside className="grid content-start gap-4 md:grid-cols-2 2xl:grid-cols-1">
        <Card className="university-card" title="Điều kiện xác nhận" subtitle="Tất cả điều kiện phải đạt trước khi khóa lịch.">
          <div className="space-y-3 p-4 text-base"><label className="flex cursor-pointer items-start gap-2.5"><input className="mt-0.5 accent-teal-700" type="checkbox" checked={Boolean(state.applicationsClosed)} disabled={state.confirmed} onChange={(event) => updateState({ applicationsClosed: event.target.checked })} /><span><strong className="block text-slate-800">Đã đóng nhận hồ sơ</strong><span className="mt-0.5 block text-base text-slate-500">Hạn nhận: {state.campaign.closesAt}</span></span></label><div className="flex items-start gap-2.5"><span className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full text-base ${allReviewed ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>{allReviewed ? '✓' : '!'}</span><span><strong className="block text-slate-800">Đã đánh giá mọi hồ sơ</strong><span className="mt-0.5 block text-base text-slate-500">{state.applications.filter((item) => item.status === 'Submitted').length} hồ sơ chưa đánh giá</span></span></div><div className="flex items-start gap-2.5"><span className={`mt-0.5 grid h-4 w-4 place-items-center rounded-full text-base ${summary.Unassigned === 0 ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>{summary.Unassigned === 0 ? '✓' : '!'}</span><span><strong className="block text-slate-800">Đã xếp đủ hồ sơ Shortlisted</strong><span className="mt-0.5 block text-base text-slate-500">{summary.Unassigned} chưa xếp · {summary.Conflict} xung đột</span></span></div></div>
        </Card>
        <Notice tone="amber"><strong>Quy tắc phân lịch</strong><br />Cả chiến dịch dùng chung 15, 20 hoặc 30 phút mỗi lượt. Dữ liệu mẫu: ứng viên, người phỏng vấn và phòng khả dụng ngày 07/11/2026, từ 09:00 đến 11:00. Chọn ngày khác có thể để lại hồ sơ chưa xếp lịch.</Notice>
        <div className="university-card rounded-2xl border border-slate-200 bg-white p-4"><p className="text-base font-extrabold uppercase tracking-widest text-slate-500">Trạng thái xác nhận</p><div className="mt-2"><Status value={state.confirmed ? 'Confirmed' : 'Proposed'} /></div><p className="mt-2 text-base leading-6 text-slate-500">{state.confirmed ? 'Lịch đã khóa. Mọi chỉnh sửa và tạo lịch mới đều bị vô hiệu hóa.' : 'Lịch hiện tại vẫn là bản nháp cho đến khi được xác nhận.'}</p><StatusMessage>{message}</StatusMessage>{!state.confirmed && !gate.allowed && <ul className="mt-3 list-disc space-y-2 pl-5">{gate.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>}</div>
      </aside>
    </div>

    {activeAssignment && <div className="fixed inset-0 z-40 grid place-items-center bg-slate-950/45 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveId(null); }}><section className="dialog-panel w-full max-w-lg rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="edit-assignment-title"><div className="border-b border-slate-100 px-5 py-4"><h2 id="edit-assignment-title" className="font-display text-lg font-extrabold">Điều chỉnh lịch · {activeAssignment.applicationId}</h2><p className="mt-1 text-base text-slate-500">{activeAssignment.applicant} · {activeAssignment.position}</p></div><div className="grid gap-4 p-5 sm:grid-cols-2"><Field id="edit-start" label="Giờ bắt đầu"><input className={inputClass} id="edit-start" type="time" value={editTime} onChange={(event) => setEditTime(event.target.value)} /></Field><Field id="edit-end" label="Thời lượng chung"><input className={inputClass} id="edit-end" value={`${duration} phút`} readOnly /></Field><Field id="edit-interviewer" label="Người phỏng vấn"><select className={inputClass} id="edit-interviewer" value={editInterviewer} onChange={(event) => setEditInterviewer(event.target.value)}><option value="">Chọn người phỏng vấn</option>{interviewerDefaults.map((interviewer) => <option key={interviewer.id} value={interviewer.id}>{interviewer.name} · {interviewer.positionIds.map((id) => positionTitles[id] || 'Vị trí chưa có tên').join(', ')}</option>)}</select></Field><Field id="edit-room" label="Phòng"><select className={inputClass} id="edit-room" value={editRoom} onChange={(event) => setEditRoom(event.target.value)}><option value="">Chọn phòng</option>{roomDefaults.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}</select></Field><p className="text-base leading-6 text-slate-500 sm:col-span-2">Thay đổi được kiểm tra lại với thời gian khả dụng và xung đột về ứng viên, người phỏng vấn, phòng.</p></div><div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4"><Button type="button" variant="secondary" onClick={() => setActiveId(null)}>Hủy</Button><Button type="button" onClick={updateAssignment}>Lưu & kiểm tra</Button></div></section></div>}

    {confirmOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" role="presentation"><section className="dialog-panel w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><p className="text-base font-extrabold uppercase tracking-widest text-teal-700">Bước cuối</p><h2 id="confirm-title" className="mt-2 font-display text-xl font-extrabold">Xác nhận lịch phỏng vấn?</h2><p className="mt-2 text-base leading-6 text-slate-600">Sau khi xác nhận, chiến dịch, hồ sơ và lịch sẽ chuyển sang chỉ đọc. Thao tác này không công bố kết quả tuyển dụng cuối cùng.</p><div className="mt-4 rounded-xl bg-slate-50 p-4 text-base text-slate-700"><p>{assignments.length} hồ sơ · {formatDate(date)}</p><p className="mt-1">{summary.Proposed} lịch hợp lệ · 0 xung đột · 0 chưa xếp</p></div><div className="mt-5 flex justify-end gap-2"><Button type="button" variant="secondary" onClick={() => setConfirmOpen(false)}>Quay lại</Button><Button type="button" disabled={!gate.allowed} onClick={confirmFinal}>Xác nhận lịch</Button></div></section></div>}

    <div className="mt-5 flex flex-wrap justify-between gap-3"><ButtonLink variant="quiet" href="#/applications"><span aria-hidden="true">←</span> Quay lại duyệt hồ sơ</ButtonLink><span className="self-center text-base text-slate-600">Ngày phỏng vấn: {formatDate(date)}</span></div>
  </>;
}
