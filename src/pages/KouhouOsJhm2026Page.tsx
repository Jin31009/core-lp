const evidenceItems = [
  {
    value: "対象",
    label: "自由記述302件",
    text: "患者さん・ご家族から寄せられた自由記述302件を対象に、感謝・不満・要望・不安・説明への疑問などがどのように含まれているかを整理しました。",
  },
  {
    value: "CASE",
    label: "具体的な記述を読み解く",
    text: "表面上の「苦情」「感謝」だけでなく、その背景にある出来事、受け止め方、見通し不足、関係のズレを読み取ります。",
  },
  {
    value: "集計",
    label: "傾向として共有する",
    text: "個別の声を匿名化・分類し、単純な良否分類では捉えきれない傾向を、委員会や現場で共有できる改善データとして整理します。",
  },
];

const feedbackItems = ["CASEを具体的に知りたい", "集計結果はどうなっているのか"];

const simpleAggregationItems = [
  { axis: "Delta", view: "ズレ強度の全体像" },
  { axis: "Trigger", view: "不安・不満・感謝などが生じた入口" },
  { axis: "Empathy", view: "安心・説明・配慮・見通しなどの不足要素" },
  { axis: "R", view: "関係回復や再利用可能な対応の兆し" },
  { axis: "Phase", view: "外来・入院・検査・会計・退院などの体験場面" },
];

const crossAggregationItems = [
  { axis: "Phase × Delta", point: "どの場面で強いズレが生じやすいか" },
  { axis: "Trigger × Delta", point: "何をきっかけにズレが深刻化しやすいか" },
  { axis: "Empathy × Delta", point: "何の不足がズレの強さと関係するか" },
  { axis: "R × Delta", point: "深刻でも回復可能なケースがあるか" },
  { axis: "Phase × Empathy", point: "場面ごとの不足パターン" },
];

const links = [
  { label: "WEBスライドを見る", href: "/slides", primary: true },
  { label: "RA-SS DEMOを試す", href: "/demo-intro" },
  { label: "病院広報工房トップへ", href: "/kouhou-os-dev" },
];

export default function KouhouOsJhm2026Page() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-950">
      <section className="border-b border-slate-200 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">Conference Supplement</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
            第28回日本医療マネジメント学会 発表補足
          </h1>
          <p className="mt-4 text-xl font-bold leading-8 text-cyan-700 md:text-2xl">
            自由記述302件を、改善に使える知見へ
          </p>
          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-700">
            本ページは、第28回日本医療マネジメント学会での発表補足として、自由記述302件の整理・解析の考え方、具体的なCASE、集計結果の見方をまとめたものです。口演では時間の関係で要点のみを報告しますが、ここでは現場で共有・検討できる改善データとしての可能性を補足します。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((item) => (
              <a
                key={item.href}
                className={
                  item.primary
                    ? "rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                    : "rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                }
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3">
          {evidenceItems.map((item) => (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-6">
              <p className="text-3xl font-black text-slate-950">{item.value}</p>
              <h2 className="mt-4 font-bold">{item.label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-6xl px-5">
          <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-5">
            <p className="text-sm font-bold text-cyan-900">CS委員会で出た反応</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {feedbackItems.map((item) => (
                <span key={item} className="rounded-md border border-cyan-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
                  「{item}」
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">302件集計アウトライン</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">5軸で、改善に使える見取り図へ</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              自由記述302件を、苦情／感謝の二分法ではなく、Delta・Trigger・Empathy・R・Phaseの5軸で整理することで、「どの場面で、どの程度のズレが、何をきっかけに生じ、何が不足し、どう回復しうるか」を同時に確認できます。本補足では、詳細な数値表ではなく、改善に使える見取り図として、単純集計とクロス集計の読み方を示します。
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h3 className="text-sm font-bold text-slate-950">単純集計で見る観点</h3>
                <div className="mt-3 grid gap-2">
                  {simpleAggregationItems.map((item) => (
                    <div key={item.axis} className="grid gap-1 rounded-md border border-slate-200 bg-[#f7f8f5] p-3 sm:grid-cols-[5.5rem_1fr]">
                      <p className="text-sm font-black text-slate-950">{item.axis}</p>
                      <p className="text-sm leading-6 text-slate-600">{item.view}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-950">クロス集計で見る改善ポイント</h3>
                <div className="mt-3 overflow-hidden rounded-md border border-slate-200 bg-[#f7f8f5]">
                  {crossAggregationItems.map((item) => (
                    <div key={item.axis} className="grid gap-1 border-b border-slate-200 p-3 last:border-b-0 sm:grid-cols-[8.5rem_1fr]">
                      <p className="text-sm font-black text-slate-950">{item.axis}</p>
                      <p className="text-sm leading-6 text-slate-600">{item.point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 rounded-md border border-cyan-100 bg-cyan-50 px-4 py-3 text-xs leading-6 text-slate-600">
              本ページでは、詳細な数値表ではなく、分類軸によって何が見えるかを示しています。各記述には複数の要素が含まれるため、結果は単一原因としてではなく、現場で確認するための見取り図として扱います。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
