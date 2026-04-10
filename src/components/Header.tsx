
import type { Page } from "../types";

type NavItem = {
  label: string;
  page: Page;
};

type HeaderProps = {
  navItems: NavItem[];
  current: Page;
  onNavigate: (page: Page) => void;
};

export default function Header({
  navItems,
  current,
  onNavigate,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-6 px-4 py-4 sm:px-6">
        <button
          onClick={() => onNavigate("top")}
          className="text-left transition hover:opacity-80"
        >
          <div className="text-[10px] tracking-[0.28em] text-slate-400">
            RELATION DESIGN
          </div>
          <div className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
            黒江 仁
          </div>
          <div className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-[11px]">
            病院広報の限界を超える｜関係マネジメントとAIによる新しい設計（CORE）
          </div>
        </button>

        <nav className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => {
            const active = current === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={
                  active
                    ? "border border-black bg-black px-3 py-2 text-xs tracking-[0.18em] text-white"
                    : "border border-black/10 bg-white px-3 py-2 text-xs tracking-[0.18em] text-slate-600 transition hover:border-black/30 hover:text-black"
                }
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-black/5 px-4 py-3 sm:hidden">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const active = current === item.page;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={
                  active
                    ? "border border-black bg-black px-3 py-2 text-[11px] text-white"
                    : "border border-black/10 bg-white px-3 py-2 text-[11px] text-slate-600"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}