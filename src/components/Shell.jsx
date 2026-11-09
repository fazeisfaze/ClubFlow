import React from 'react';
import { routes, Status } from './Shared.jsx';

export default function Shell({ screen, campaign, confirmed, canSchedule, children }) {
  return <div className="min-h-screen bg-[#f4f7f6] text-slate-800">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-3 sm:px-7 lg:px-10">
        <div className="flex min-h-10 items-center justify-between gap-4">
          <a href="#/campaign" className="flex items-center gap-2.5 text-slate-900 no-underline" aria-label="ClubFlow — về trang tạo chiến dịch">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-700 font-display text-lg font-extrabold text-white">C</span>
            <span className="font-display text-xl font-extrabold tracking-tight">ClubFlow</span>
          </a>
          <div className="flex items-center gap-2.5 text-xs text-slate-500"><span className="grid h-8 w-8 place-items-center rounded-full bg-teal-50 font-bold text-teal-800">EX</span><span className="hidden sm:inline">Ban điều hành · Executive</span></div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-slate-400">Chiến dịch hiện tại · {campaign.club}</p><p className="mt-1 truncate font-display text-sm font-extrabold text-slate-800 sm:text-base">{campaign.name}</p><p className="mt-0.5 text-[11px] text-slate-500">Nhận hồ sơ: {campaign.opensAt} — {campaign.closesAt}</p></div>
          <Status value={confirmed ? 'Confirmed' : campaign.state || 'Draft'} />
        </div>
        <nav className="-mx-4 grid grid-cols-3 border-t border-slate-100 px-2 sm:-mx-7 sm:px-5 lg:-mx-10 lg:px-8" aria-label="Luồng tuyển thành viên">
          {routes.map((route) => {
            const enabled = route.key !== 'schedule' || canSchedule;
            const className = `relative flex min-h-12 items-center justify-center gap-2 border-b-2 px-1 text-center text-[10px] font-bold no-underline transition sm:justify-start sm:px-2 sm:text-xs ${screen === route.key ? 'border-teal-700 text-teal-800' : enabled ? 'border-transparent text-slate-400 hover:text-slate-700' : 'cursor-not-allowed border-transparent text-slate-300'}`;
            const content = <><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[9px] ${screen === route.key ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-200 bg-white text-slate-500'}`}>{route.number}</span><span>{route.label}</span></>;
            return enabled ? <a key={route.key} href={route.href} aria-current={screen === route.key ? 'step' : undefined} className={className}>{content}</a> : <span key={route.key} aria-disabled="true" className={className}>{content}</span>;
          })}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">{children}</main>
    <footer className="mx-auto max-w-[1440px] px-4 pb-6 text-[10px] text-slate-400 sm:px-7 lg:px-10">ClubFlow · Bản prototype điều phối tuyển thành viên</footer>
  </div>;
}
