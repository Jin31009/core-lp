type HeaderProps = {
  onOpenTop?: () => void;
  onOpenDemo?: () => void;
  onOpenContact?: () => void;
};

export default function Header({
  onOpenTop,
  onOpenDemo,
  onOpenContact,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f7f4ee]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <button
          type="button"
          onClick={onOpenTop}
          className="text-left transition opacity-90 hover:opacity-100"
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">
            Relational Architecture Sensing System
          </div>
          <div className="mt-1 text-[15px] font-semibold tracking-[0.04em] text-stone-900">
            RA-SS
          </div>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={onOpenTop}
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            TOP
          </button>
          <button
            type="button"
            onClick={onOpenDemo}
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            DEMO
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            CONTACT
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex bg-stone-900 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition hover:opacity-90"
          >
            DEMO
          </button>
        </div>
      </div>
    </header>
  );
}
