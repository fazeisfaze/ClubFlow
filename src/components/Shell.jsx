import React from 'react';
import { routes, Status } from './Shared.jsx';

export default function Shell({ screen, campaign, confirmed, canSchedule, theme = 'light', onToggleTheme, children }) {
  return <div className="university-page min-h-screen text-slate-800">
    <header className="university-header border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-3 sm:px-7 lg:px-10">
        <div className="flex min-h-11 items-center justify-between gap-4">
          <a href="#/campaign" className="flex items-center gap-2.5 text-slate-900 no-underline" aria-label="ClubFlow — về trang tạo chiến dịch">
            <span className="university-brand-mark grid h-9 w-9 place-items-center rounded-xl bg-teal-800 font-display text-lg font-extrabold text-white">C</span>
            <span className="font-display text-xl font-extrabold tracking-tight">ClubFlow</span>
          </a>
          <div className="flex items-center gap-2.5 text-base text-slate-500">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-slate-50 font-bold text-teal-800">EX</span>
            <span className="hidden sm:inline">Ban điều hành · Executive</span>
            <button type="button" className="theme-toggle inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-base font-bold text-slate-700 transition hover:bg-slate-50" aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'} aria-pressed={theme === 'dark'} onClick={onToggleTheme}>
              <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
              <span className="hidden sm:inline">{theme === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}</span>
              <span className="sm:hidden">{theme === 'dark' ? 'Sáng' : 'Tối'}</span>
            </button>
          </div>
        </div>
        <div className="my-3 flex flex-wrap items-center justify-between gap-3 border-l-[3px] border-amber-400 bg-slate-50/80 px-3 py-3 sm:px-4">
          <div className="min-w-0"><p className="text-base font-extrabold uppercase tracking-[.13em] text-slate-400">Chiến dịch hiện tại · {campaign.club}</p><p className="mt-1 break-words font-display text-base font-extrabold text-slate-800 sm:text-base">{campaign.name}</p><p className="mt-0.5 text-base text-slate-500">Nhận hồ sơ: {campaign.opensAt} — {campaign.closesAt}</p></div>
          <Status value={confirmed ? 'Confirmed' : campaign.state || 'Draft'} />
        </div>
        <nav className="-mx-4 grid grid-cols-3 border-t border-slate-100 px-2 sm:-mx-7 sm:px-5 lg:-mx-10 lg:px-8" aria-label="Luồng tuyển thành viên">
          {routes.map((route) => {
            const enabled = route.key !== 'schedule' || canSchedule;
            const className = `university-step relative flex min-h-12 items-center justify-center gap-2 border-b-2 px-1 text-center text-base font-bold no-underline transition sm:justify-start sm:px-2 sm:text-base ${screen === route.key ? 'border-teal-700 text-teal-800' : enabled ? 'border-transparent text-slate-500 hover:text-slate-800' : 'cursor-not-allowed border-transparent text-slate-400'}`;
            const content = <><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-base ${screen === route.key ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-200 bg-white text-slate-500'}`}>{route.number}</span><span>{route.label}</span></>;
            return enabled ? <a key={route.key} href={route.href} aria-current={screen === route.key ? 'step' : undefined} className={className}>{content}</a> : <span key={route.key} aria-disabled="true" className={className}>{content}</span>;
          })}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">{children}</main>
    <footer className="mx-auto max-w-[1440px] px-4 pb-6 text-base text-slate-400 sm:px-7 lg:px-10">ClubFlow · Bản prototype điều phối tuyển thành viên</footer>
  </div>;
}
