import React from "react";

type SectionProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  eyebrow,
  children,
}: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 border-t border-black/10 pt-8">
        {eyebrow ? (
          <p className="text-xs tracking-[0.3em] text-slate-400">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}