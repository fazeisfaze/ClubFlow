import React, { useMemo, useState } from 'react';
import { decideApplication } from '../domain.js';
import { Button, Card, Field, inputClass, Notice, PageHeading, Status, StatusMessage, downloadCsv } from './Shared.jsx';

const pageSize = 5;

export default function ApplicationsPage({ state, setState, onNavigate, confirmed = false }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [page, setPage] = useState(1);
  const [ascending, setAscending] = useState(true);
  const [detailOpen, setDetailOpen] = useState(true);
  const [message, setMessage] = useState('');
  const selected = state.applications.find((application) => application.id === state.selectedApplicationId) || state.applications[0];
  const positions = [...new Set(state.applications.map((application) => application.position))];
  const filtered = useMemo(() => state.applications.filter((application) => {
    const needle = query.trim().toLocaleLowerCase('vi');
    const matchesQuery = !needle || `${application.id} ${application.applicant} ${application.position}`.toLocaleLowerCase('vi').includes(needle);
    return matchesQuery && (!statusFilter || application.status === statusFilter) && (!positionFilter || application.position === positionFilter);
  }).sort((a, b) => ascending ? a.submittedAt.localeCompare(b.submittedAt) : b.submittedAt.localeCompare(a.submittedAt)), [state.applications, query, statusFilter, positionFilter, ascending]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const shortlistedCount = state.applications.filter((application) => application.status === 'Shortlisted').length;
  const uniqueApplicants = new Set(state.applications.map((application) => application.applicantId)).size;

  function updateApplication(applicationId, update) {
    setState((current) => ({ ...current, applications: current.applications.map((application) => application.id === applicationId ? { ...application, ...update } : application) }));
  }
  function decide(status) {
    setState((current) => ({ ...current, applications: decideApplication(current.applications, selected.id, status) }));
    setMessage(status === 'Shortlisted' ? 'Đã đưa hồ sơ này vào danh sách qua vòng CV.' : 'Đã từ chối riêng hồ sơ này; hồ sơ vị trí khác của ứng viên không bị thay đổi.');
  }
  function exportApplications() {
    downloadCsv('clubflow-applications.csv', [
      ['ID hồ sơ', 'Ứng viên', 'Vị trí', 'Thời gian nộp', 'Trạng thái'],
      ...filtered.map((application) => [application.id, application.applicant, application.position, application.submittedAt, application.status]),
    ]);
  }

  return <>
    <PageHeading eyebrow="Bước 02 · Sàng lọc CV" title="Duyệt hồ sơ ứng tuyển" description="Tìm kiếm, xem CV và đánh giá từng hồ sơ theo vị trí. Mỗi quyết định chỉ ảnh hưởng đến hồ sơ đang được chọn." action={<Button type="button" variant="secondary" onClick={exportApplications}><span aria-hidden="true">↓</span> Xuất CSV</Button>} />
    <div className="mb-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      {[
        ['Tổng hồ sơ', state.applications.length, 'Trong chiến dịch'],
        ['Ứng viên', uniqueApplicants, 'Sinh viên riêng biệt'],
        ['Qua vòng CV', shortlistedCount, 'Sẵn sàng xếp lịch'],
        ['Từ chối', state.applications.filter((application) => application.status === 'Rejected').length, 'Hồ sơ đã đánh giá'],
      ].map(([label, value, sub]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4"><span className="text-[11px] font-semibold text-slate-500">{label}</span><strong className="mt-2 block font-display text-2xl font-extrabold leading-none text-slate-900">{value}</strong><span className="mt-1.5 block text-[10px] text-slate-400">{sub}</span></div>)}
    </div>
    <Notice>Đang xem <strong>{state.campaign.name}</strong>. Ghi chú nội bộ chỉ dành cho Executive và không được chia sẻ với ứng viên hoặc người phỏng vấn.</Notice>

    <div className={`mt-5 grid items-start gap-4 ${detailOpen ? 'lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.85fr)]' : 'lg:grid-cols-1'}`}>
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="applications-list-title">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5"><div><h2 id="applications-list-title" className="font-display text-sm font-extrabold">Danh sách hồ sơ</h2><p className="mt-1 text-[11px] text-slate-500">{filtered.length} hồ sơ phù hợp bộ lọc</p></div><Button type="button" variant="secondary" className="min-h-8 px-3" onClick={exportApplications}>Xuất danh sách</Button></div>
        <div className="grid gap-2 border-b border-slate-100 p-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-[minmax(130px,1fr)_140px_155px]">
          <label className="sm:col-span-2 lg:col-span-1 xl:col-span-1"><span className="sr-only">Tìm theo tên, mã hồ sơ hoặc vị trí</span><input className={inputClass} type="search" placeholder="Tìm tên, mã hồ sơ, vị trí…" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></label>
          <label><span className="sr-only">Lọc theo trạng thái</span><select className={inputClass} value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}><option value="">Mọi trạng thái</option><option value="Submitted">Mới nộp</option><option value="Shortlisted">Shortlisted</option><option value="Rejected">Rejected</option></select></label>
          <label><span className="sr-only">Lọc theo vị trí</span><select className={inputClass} value={positionFilter} onChange={(event) => { setPositionFilter(event.target.value); setPage(1); }}><option value="">Mọi vị trí</option>{positions.map((position) => <option key={position}>{position}</option>)}</select></label>
        </div>
        <div className="page-scroll max-w-full overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-[11px]">
            <thead className="bg-slate-50 text-[9px] uppercase tracking-wider text-slate-500"><tr><th className="px-3 py-3 font-bold">Mã hồ sơ</th><th className="px-3 py-3 font-bold">Ứng viên</th><th className="px-3 py-3 font-bold">Vị trí</th><th className="px-3 py-3 font-bold"><button className="font-bold hover:text-teal-800" type="button" onClick={() => setAscending((value) => !value)}>Ngày nộp {ascending ? '↑' : '↓'}</button></th><th className="px-3 py-3 font-bold">Trạng thái</th><th className="px-3 py-3 font-bold">Thao tác</th></tr></thead>
            <tbody>{visible.length ? visible.map((application) => <tr key={application.id} className={`border-t border-slate-100 ${selected?.id === application.id ? 'bg-teal-50/70' : 'hover:bg-slate-50/70'}`}>
              <th scope="row" className="px-3 py-3 font-bold text-teal-800"><button type="button" className="font-bold hover:underline" onClick={() => { setState((current) => ({ ...current, selectedApplicationId: application.id })); setDetailOpen(true); }}>{application.id}</button></th>
              <td className="px-3 py-3 font-semibold text-slate-800">{application.applicant}</td><td className="px-3 py-3 text-slate-600">{application.position}</td><td className="px-3 py-3 text-slate-500">{application.submittedAt}</td><td className="px-3 py-3"><Status value={application.status} /></td>
              <td className="px-3 py-3"><Button type="button" variant="secondary" className="min-h-8 px-3" onClick={() => { setState((current) => ({ ...current, selectedApplicationId: application.id })); setDetailOpen(true); }}>Xem</Button></td>
            </tr>) : <tr><td colSpan="6" className="px-4 py-9 text-center text-xs text-slate-500">Không tìm thấy hồ sơ phù hợp.</td></tr>}</tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-3 py-3 text-[10px] text-slate-500 sm:px-4"><span>Trang {page} / {pages} · {filtered.length} hồ sơ</span><div className="flex gap-2"><Button type="button" variant="secondary" className="min-h-8 px-3" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>Trước</Button><Button type="button" variant="secondary" className="min-h-8 px-3" disabled={page >= pages} onClick={() => setPage((current) => current + 1)}>Sau</Button></div></div>
      </section>

      {detailOpen && <aside className="mobile-order-detail min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby="application-detail-title">
        {selected ? <>
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5"><div><p className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700">Chi tiết hồ sơ · {selected.id}</p><h2 id="application-detail-title" className="mt-1 font-display text-lg font-extrabold text-slate-900">{selected.applicant}</h2><p className="mt-1 text-[11px] text-slate-500">{selected.position} · {selected.department}</p></div><div className="flex flex-col items-end gap-2"><Status value={selected.status} /><Button type="button" variant="quiet" className="min-h-7 px-2 text-[10px]" onClick={() => setDetailOpen(false)}>Đóng chi tiết</Button></div></div>
          <div className="space-y-4 p-4 sm:p-5">
            <dl className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3"><div><dt className="text-[10px] text-slate-500">Thời gian nộp</dt><dd className="mt-1 text-[11px] font-bold text-slate-800">{selected.submittedAt}</dd></div><div><dt className="text-[10px] text-slate-500">Hồ sơ</dt><dd className="mt-1 text-[11px] font-bold text-slate-800">{selected.id}</dd></div></dl>
            <div><h3 className="mb-2 text-[11px] font-extrabold text-slate-700">CV ứng viên</h3><div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"><span className="grid h-10 w-9 shrink-0 place-items-center rounded-lg bg-red-50 text-[9px] font-extrabold text-red-700">PDF</span><div className="min-w-0"><p className="truncate text-[11px] font-bold text-slate-800">{selected.cv}</p><p className="mt-1 text-[10px] text-slate-500">Tệp CV mẫu · PDF</p></div></div><details className="mt-2 rounded-lg border border-slate-200 px-3 py-2"><summary className="cursor-pointer text-[10px] font-bold text-teal-800">Mở nội dung CV mẫu</summary><dl className="mt-3 space-y-2 text-[10px]"><div><dt className="font-bold text-slate-500">Học vấn</dt><dd className="mt-0.5 text-slate-700">{selected.cvEducation}</dd></div><div><dt className="font-bold text-slate-500">Kinh nghiệm</dt><dd className="mt-0.5 leading-4 text-slate-700">{selected.cvExperience}</dd></div><div><dt className="font-bold text-slate-500">Kỹ năng</dt><dd className="mt-0.5 text-slate-700">{selected.cvSkills}</dd></div></dl></details><p className="mt-2 text-[10px] leading-4 text-slate-500">Nội dung CV được tạo làm dữ liệu mẫu cho prototype; không có hồ sơ thật tải lên máy chủ.</p></div>
            <div><h3 className="mb-1.5 text-[11px] font-extrabold text-slate-700">Thư ứng tuyển</h3><p className="text-xs leading-5 text-slate-600">{selected.statement}</p></div>
            <Field id="internal-note" label="Ghi chú nội bộ · chỉ Executive xem"><textarea id="internal-note" className={`${inputClass} min-h-20 resize-y py-2.5`} value={selected.note || ''} onChange={(event) => updateApplication(selected.id, { note: event.target.value })} placeholder="Ghi chú riêng về hồ sơ…" disabled={confirmed} /></Field>
            <Button type="button" variant="secondary" className="w-full" disabled={confirmed} onClick={() => setMessage('Ghi chú nội bộ đã lưu trên trình duyệt này.')}>Lưu ghi chú</Button>
            <div className="border-t border-slate-100 pt-3"><p className="mb-2 text-[10px] text-slate-500">Shortlisted nghĩa là qua vòng sàng lọc CV, chưa phải kết quả tuyển cuối cùng.</p><div className="flex flex-wrap gap-2"><Button type="button" disabled={confirmed || selected.status === 'Shortlisted'} onClick={() => decide('Shortlisted')}>Shortlist</Button><Button type="button" variant="danger" disabled={confirmed || selected.status === 'Rejected'} onClick={() => decide('Rejected')}>Reject</Button></div><div className="mt-2"><StatusMessage>{confirmed ? 'Chiến dịch đã xác nhận; hồ sơ ở chế độ chỉ đọc.' : message}</StatusMessage></div></div>
          </div>
        </> : <div className="p-6 text-sm text-slate-500">Chọn hồ sơ để xem chi tiết.</div>}
      </aside>}
    </div>

    <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div><p className="text-xs font-bold text-slate-800">Tiếp tục xếp lịch phỏng vấn</p><p className="mt-1 text-[11px] text-slate-500">Chỉ {shortlistedCount} hồ sơ Shortlisted được chuyển sang bước tiếp theo.</p></div><Button type="button" disabled={!shortlistedCount} onClick={() => onNavigate('schedule')}>Đến xếp lịch <span aria-hidden="true">→</span></Button></div>
  </>;
}
