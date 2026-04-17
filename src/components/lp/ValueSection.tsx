export default function ValueSection() {
  const cards = [
    {
      title: "観察を整理に変える",
      body: "断片的な言葉や出来事を、状況として捉え直す。",
    },
    {
      title: "整理を関係理解に変える",
      body: "何が起きているかだけでなく、なぜそう見えるのかを扱う。",
    },
    {
      title: "理解を次の行動につなげる",
      body: "関係の状態に応じた、次の一手を考えられるようにする。",
    },
  ];

  return (
    <section className="bg-[#f7f5f2] px-6 py-28 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            Value
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-stone-900 md:text-4xl">
            このアプローチがもたらすこと
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="border border-stone-200 bg-white p-7 shadow-[0_8px_20px_rgba(15,23,42,0.04)]"
            >
              <p className="text-[20px] font-semibold leading-8 tracking-[-0.01em] text-stone-900">
                {card.title}
              </p>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
