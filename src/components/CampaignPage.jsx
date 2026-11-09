import React, { useState } from 'react';
import { validateCampaign } from '../domain.js';
import { Button, ButtonLink, Card, Field, inputClass, Notice, PageHeading, StatusMessage, formatDate } from './Shared.jsx';

function updateDepartment(departments, departmentId, update) {
  return departments.map((department) => department.id === departmentId ? { ...department, ...update } : department);
}

export default function CampaignPage({ campaign, applications, setCampaign, confirmed = false }) {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const patch = (field, value) => setCampaign((current) => ({ ...current, [field]: value, state: 'Draft' }));

  function saveDraft() {
    if (confirmed) return;
    setCampaign((current) => ({ ...current, state: 'Draft' }));
    setMessage('Đã lưu bản nháp trên trình duyệt này.');
  }

  function publish(event) {
    event.preventDefault();
    if (confirmed) return;
    const result = validateCampaign(campaign, applications);
    setErrors(result.errors);
    if (!result.valid) {
      setMessage('Chưa thể đăng chiến dịch. Hãy kiểm tra các mục được đánh dấu.');
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setCampaign((current) => ({ ...current, state: 'Published' }));
    setMessage('Chiến dịch đã được đăng. Hồ sơ mẫu chỉ đại diện cho đơn ứng tuyển đã nhận.');
  }

  function addDepartment() {
    const id = `department-${Date.now()}`;
    patch('departments', [...(campaign.departments || []), { id, name: 'Bộ phận mới', positions: [{ id: `${id}-position`, title: 'Vị trí mới', quota: 1, description: '', requirements: '' }] }]);
  }

  function addPosition(department) {
    const updated = (campaign.departments || []).map((item) => item.id === department.id ? {
      ...item,
      positions: [...item.positions, { id: `position-${Date.now()}`, title: 'Vị trí mới', quota: 1, description: '', requirements: '' }],
    } : item);
    patch('departments', updated);
  }

  return <>
    <PageHeading eyebrow="Bước 01 · Thiết lập" title="Tạo chiến dịch tuyển thành viên" description="Cấu hình thông tin tuyển dụng, bộ phận và vị trí. Xem trước trước khi đăng để sinh viên nhận được hướng dẫn rõ ràng." action={<Button type="button" variant="secondary" onClick={() => setPreviewOpen(true)}>Xem trước chiến dịch <span aria-hidden="true">↗</span></Button>} />
    <Notice>Prototype đang minh họa một câu lạc bộ và một chiến dịch. Chuyển sang màn hình duyệt hồ sơ không tự tạo thêm ứng viên hay thay đổi kết quả sàng lọc.</Notice>
    <form onSubmit={publish} noValidate>
      <fieldset disabled={confirmed} className="contents">
      <Card className="university-card" title="Thông tin cơ bản" subtitle="Thông tin hiển thị trên trang tuyển thành viên.">
        <div className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2 sm:p-6">
          <Field id="campaign-name" label="Tên chiến dịch" required error={errors.name} className="sm:col-span-2">
            <input className={inputClass} id="campaign-name" value={campaign.name} onChange={(event) => patch('name', event.target.value)} aria-invalid={Boolean(errors.name)} />
          </Field>
          <Field id="campaign-club" label="Câu lạc bộ chủ trì" required error={errors.club}>
            <input className={inputClass} id="campaign-club" value={campaign.club} onChange={(event) => patch('club', event.target.value)} aria-invalid={Boolean(errors.club)} />
          </Field>
          <Field id="campaign-description" label="Mô tả chiến dịch" required error={errors.description}>
            <textarea className={`${inputClass} min-h-20 resize-y py-2.5`} id="campaign-description" value={campaign.description} onChange={(event) => patch('description', event.target.value)} aria-invalid={Boolean(errors.description)} />
          </Field>
          <Field id="campaign-opens" label="Ngày bắt đầu nhận hồ sơ" required error={errors.opensAt}>
            <input className={inputClass} type="date" id="campaign-opens" value={campaign.opensAt} onChange={(event) => patch('opensAt', event.target.value)} aria-invalid={Boolean(errors.opensAt)} />
          </Field>
          <Field id="campaign-closes" label="Hạn cuối nhận hồ sơ" required error={errors.closesAt || errors.dates}>
            <input className={inputClass} type="date" id="campaign-closes" value={campaign.closesAt} onChange={(event) => patch('closesAt', event.target.value)} aria-invalid={Boolean(errors.closesAt || errors.dates)} />
          </Field>
          <Field id="campaign-instructions" label="Hướng dẫn ứng tuyển" required error={errors.instructions} className="sm:col-span-2">
            <textarea className={`${inputClass} min-h-20 resize-y py-2.5`} id="campaign-instructions" value={campaign.instructions} onChange={(event) => patch('instructions', event.target.value)} aria-invalid={Boolean(errors.instructions)} />
          </Field>
        </div>
      </Card>

      <Card className="university-card mt-5" title="Bộ phận & vị trí tuyển dụng" subtitle="Mỗi hồ sơ ứng tuyển gắn với một vị trí cụ thể." action={<Button type="button" variant="secondary" onClick={addDepartment}>＋ Thêm bộ phận</Button>}>
        {errors.departments && <p className="px-5 pt-4 text-red-700" role="alert">{errors.departments}</p>}
        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-2">
          {(campaign.departments || []).map((department) => <section key={department.id} aria-labelledby={`department-title-${department.id}`} className="rounded-xl border border-l-2 border-l-amber-400 border-slate-200 bg-slate-50/60 p-4">
            <h3 id={`department-title-${department.id}`} className="mb-4 font-bold">{department.name || 'Bộ phận chưa có tên'}</h3>
            <Field id={`department-${department.id}`} label="Tên bộ phận" required error={errors[`department-${department.id}`]}>
              <input className={inputClass} id={`department-${department.id}`} value={department.name} onChange={(event) => patch('departments', updateDepartment(campaign.departments, department.id, { name: event.target.value }))} />
            </Field>
            <div className="mt-4 space-y-4">
              {department.positions.map((position) => <div key={position.id} className="space-y-3 border-t border-dashed border-slate-200 pt-3 first:border-0 first:pt-0">
                <div className="grid grid-cols-[minmax(0,1fr)_82px] gap-3">
                  <Field id={`position-${position.id}`} label="Tên vị trí" required error={errors[`position-${position.id}`]}><input className={inputClass} id={`position-${position.id}`} value={position.title} onChange={(event) => {
                    const positions = department.positions.map((item) => item.id === position.id ? { ...item, title: event.target.value } : item);
                    patch('departments', updateDepartment(campaign.departments, department.id, { positions }));
                  }} /></Field>
                  <Field id={`quota-${position.id}`} label="Chỉ tiêu" required error={errors[`quota-${position.id}`]}><input className={inputClass} id={`quota-${position.id}`} type="number" min="1" step="1" value={position.quota} onChange={(event) => {
                    const positions = department.positions.map((item) => item.id === position.id ? { ...item, quota: Number(event.target.value) } : item);
                    patch('departments', updateDepartment(campaign.departments, department.id, { positions }));
                  }} /></Field>
                </div>
                <Field id={`description-${position.id}`} label="Mô tả công việc" required error={errors[`description-${position.id}`]}><textarea className={`${inputClass} min-h-16 py-2`} id={`description-${position.id}`} value={position.description} onChange={(event) => {
                  const positions = department.positions.map((item) => item.id === position.id ? { ...item, description: event.target.value } : item);
                  patch('departments', updateDepartment(campaign.departments, department.id, { positions }));
                }} /></Field>
                <Field id={`requirements-${position.id}`} label="Yêu cầu" required error={errors[`requirements-${position.id}`]}><textarea className={`${inputClass} min-h-16 py-2`} id={`requirements-${position.id}`} value={position.requirements} onChange={(event) => {
                  const positions = department.positions.map((item) => item.id === position.id ? { ...item, requirements: event.target.value } : item);
                  patch('departments', updateDepartment(campaign.departments, department.id, { positions }));
                }} /></Field>
              </div>)}
            </div>
            <Button className="mt-4 w-full" variant="quiet" type="button" onClick={() => addPosition(department)}>＋ Thêm vị trí</Button>
          </section>)}
        </div>
      </Card>

      <div className="university-card mt-5 flex flex-col gap-3 rounded-2xl border border-l-4 border-l-amber-400 border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div><p className="text-base font-bold text-slate-700">{confirmed ? 'Lịch đã xác nhận' : 'Sẵn sàng tiếp tục?'}</p><p className="mt-1 text-base text-slate-500">{confirmed ? 'Cấu hình chiến dịch đã chuyển sang chỉ đọc.' : 'Kiểm tra ngày và thông tin trước khi đăng chiến dịch.'}</p><StatusMessage>{message}</StatusMessage></div>
        <div className="flex flex-wrap gap-2"><Button type="button" variant="secondary" onClick={saveDraft}>Lưu bản nháp</Button><Button type="button" variant="secondary" onClick={() => setPreviewOpen(true)}>Xem trước</Button><Button type="submit">Đăng chiến dịch <span aria-hidden="true">→</span></Button></div>
      </div>
      </fieldset>
      <div className="mt-4 flex justify-end"><ButtonLink variant="quiet" href="#/applications">Đến duyệt hồ sơ mẫu <span aria-hidden="true">→</span></ButtonLink></div>
    </form>

    {previewOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false); }}>
      <section className="dialog-panel w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="preview-title">
        <div className="flex items-start justify-between gap-4"><div><p className="text-base font-extrabold uppercase tracking-widest text-teal-700">Bản xem trước · Sinh viên</p><h2 id="preview-title" className="mt-2 font-display text-xl font-extrabold">{campaign.name || 'Tên chiến dịch'}</h2><p className="mt-1 text-base text-slate-500">{campaign.club} · {formatDate(campaign.opensAt)} — {formatDate(campaign.closesAt)}</p></div><button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" type="button" aria-label="Đóng xem trước" onClick={() => setPreviewOpen(false)}>✕</button></div>
        <p className="mt-5 text-base leading-6 text-slate-700">{campaign.description || 'Chưa có mô tả chiến dịch.'}</p><div className="mt-4 rounded-xl bg-teal-50 p-4"><p className="text-base font-bold text-teal-900">Hướng dẫn ứng tuyển</p><p className="mt-1 text-base leading-6 text-teal-900">{campaign.instructions || 'Chưa có hướng dẫn.'}</p></div>
        <div className="mt-4 space-y-4">{(campaign.departments || []).map((department) => <div key={department.id}><h3 className="font-bold">{department.name || 'Tên bộ phận'}</h3>{department.positions.map((position) => <div key={position.id} className="mt-2 rounded-lg border border-slate-200 p-3"><p className="font-bold">{position.title || 'Tên vị trí'} · Chỉ tiêu: {position.quota}</p><p className="mt-2">{position.description || 'Chưa có mô tả công việc.'}</p><p className="mt-2">Yêu cầu: {position.requirements || 'Chưa có yêu cầu.'}</p></div>)}</div>)}</div>
        <div className="mt-6 flex justify-end"><Button type="button" onClick={() => setPreviewOpen(false)}>Đóng</Button></div>
      </section>
    </div>}
  </>;
}
