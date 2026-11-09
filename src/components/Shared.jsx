import React from 'react';

export const routes = [
  { key: 'campaign', label: 'Tạo chiến dịch', number: '01', href: '#/campaign' },
  { key: 'applications', label: 'Duyệt hồ sơ', number: '02', href: '#/applications' },
  { key: 'schedule', label: 'Xếp lịch phỏng vấn', number: '03', href: '#/schedule' },
];

export function Status({ value }) {
  const key = String(value).toLowerCase().replaceAll(' ', '-');
  return <span className={`status-pill status-${key}`}>{value}</span>;
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'border-transparent bg-teal-700 text-white hover:bg-teal-800',
    secondary: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
    quiet: 'border-transparent bg-transparent text-slate-600 hover:bg-slate-100',
    danger: 'border-red-200 bg-white text-red-700 hover:bg-red-50',
  };
  return <button className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

export function Field({ label, error, hint, className = '', id, children, required = false }) {
  return <div className={`min-w-0 space-y-1.5 ${className}`}>
    <label htmlFor={id} className="block text-xs font-bold text-slate-700">{label}{required && <span className="ml-1 text-red-600">*</span>}</label>
    {children}
    {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
    {error && <p className="text-[11px] text-red-700" role="alert">{error}</p>}
  </div>;
}

export const inputClass = 'min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100';

export function PageHeading({ eyebrow, title, description, action }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div><p className="mb-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-teal-700">{eyebrow}</p><h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[34px]">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p></div>
    {action && <div className="flex shrink-0 gap-2">{action}</div>}
  </div>;
}

export function Card({ title, subtitle, action, children, className = '' }) {
  return <section className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {(title || subtitle || action) && <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6"><div>{title && <h2 className="font-display text-sm font-extrabold text-slate-800">{title}</h2>}{subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}</div>{action}</div>}
    {children}
  </section>;
}

export function Notice({ children, tone = 'teal' }) {
  const styles = tone === 'amber' ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-teal-100 bg-teal-50 text-teal-900';
  return <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-xs leading-5 ${styles}`} role="status"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/70 font-extrabold">i</span><div>{children}</div></div>;
}

export function StatusMessage({ children, role = 'status' }) {
  return <p className="min-h-5 text-xs font-medium text-teal-800" aria-live="polite" role={role}>{children}</p>;
}

export function formatDate(value) {
  if (!value) return 'Chưa xác định';
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

export function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
