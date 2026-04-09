type HeaderProps = {
  onOpenTop?: () => void;
  onOpenDemo?: () => void;
  onOpenSlides?: () => void;
};

export default function Header({
  onOpenTop,
  onOpenDemo,
  onOpenSlides,
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
          <a
            href="#problem"
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            Problem
          </a>
          <a
            href="#redefinition"
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            Redefinition
          </a>
          <a
            href="#method"
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            Method
          </a>
          <a
            href="#demo"
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            Demo
          </a>
          <a
            href="#next-step"
            className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-900"
          >
            Next Step
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSlides}
            className="hidden border border-stone-300 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-stone-700 transition hover:bg-white md:inline-flex"
          >
            Slides
          </button>

          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex bg-stone-900 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition hover:opacity-90"
          >
            Demo
          </button>
        </div>
      </div>
    </header>
  );
}