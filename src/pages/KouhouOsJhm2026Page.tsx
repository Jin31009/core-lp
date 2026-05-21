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

const siteNavLinks = [
  { label: "病院広報工房", href: "/kouhou-os-dev" },
  { label: "WEBスライド", href: "/slides" },
  { label: "RA-SS DEMO", href: "/demo-intro" },
  { label: "note", href: "/kouhou-os-dev#journal" },
  { label: "相談する", href: "/contact" },
];

const phaseCounts = [
  { label: "入院", count: 182 },
  { label: "外来", count: 97 },
  { label: "救急", count: 23 },
];

const deltaCounts = [
  { label: "Δ0", count: 54 },
  { label: "Δ1", count: 86 },
  { label: "Δ2", count: 86 },
  { label: "Δ3", count: 70 },
  { label: "Δ4", count: 6 },
];

const empathyCounts = [
  { label: "認識不足", count: 158 },
  { label: "未分類", count: 72 },
  { label: "見通し不足", count: 31 },
  { label: "説明不足", count: 27 },
  { label: "手順不明", count: 14 },
];

const triggerCounts = [
  { label: "Triggerなし", count: 235 },
  { label: "Triggerあり", count: 67 },
];

const phaseDeltaRows = [
  { phase: "入院", d0: 36, d1: 57, d2: 51, d3: 35, d4: 3, total: 182 },
  { phase: "外来", d0: 15, d1: 23, d2: 26, d3: 30, d4: 3, total: 97 },
  { phase: "救急", d0: 3, d1: 6, d2: 9, d3: 5, d4: 0, total: 23 },
];

function BarGroup({
  title,
  items,
}: {
  title: string;
  items: { label: string; count: number }[];
}) {
  const max = Math.max(...items.map((item) => item.count));

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-bold text-slate-950">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="font-black text-slate-950">{item.count}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-cyan-700"
                style={{ width: `${Math.max((item.count / max) * 100, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function KouhouOsJhm2026Page() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-950">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-[#f7f8f5]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="/kouhou-os-dev" className="min-w-0 text-slate-950">
            <span className="block text-sm font-bold tracking-wide md:text-base">黒江仁｜病院広報工房</span>
            <span className="mt-1 block text-[11px] font-semibold leading-4 text-slate-500">
              病院広報を、理解と関係を整える仕組みへ
            </span>
          </a>
          <nav className="hidden gap-3 text-xs lg:flex xl:text-sm">
            {siteNavLinks.map((item) => (
              <a key={item.label} className="text-slate-600 hover:text-slate-950" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="rounded-md bg-slate-950 px-3 py-2 text-xs font-semibold text-white lg:hidden" href="/contact">
            相談する
          </a>
        </div>
      </header>

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

      <section className="border-b border-slate-200 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">初期集計</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">302件から見えた初期集計</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
              初期集計では、302件の自由記述のうち、入院に関する記述が182件、外来が97件、救急が23件でした。Delta分布では、Δ1・Δ2が各86件、Δ3が70件であり、軽微な違和感から中程度以上の関係のズレまで、幅のある記述が含まれていました。Empathy分類では、認識不足が158件と最も多く、説明不足や見通し不足だけでなく、患者さん・ご家族と病院側の認識のズレを確認する視点が重要であることが示唆されました。
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <BarGroup title="Phase別件数" items={phaseCounts} />
              <BarGroup title="Delta分布" items={deltaCounts} />
              <BarGroup title="Empathy主要分類" items={empathyCounts} />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
              <article className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
                <h3 className="text-sm font-bold text-slate-950">Triggerあり／なし</h3>
                <div className="mt-3 overflow-hidden rounded-md border border-slate-200 bg-white">
                  {triggerCounts.map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-slate-100 px-3 py-3 text-sm last:border-b-0">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="font-black text-slate-950">{item.count}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-slate-200 bg-[#f7f8f5] p-5">
                <h3 className="text-sm font-bold text-slate-950">Phase × Delta</h3>
                <div className="mt-3 overflow-x-auto rounded-md border border-slate-200 bg-white">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                      <tr>
                        <th className="px-3 py-3">Phase</th>
                        <th className="px-3 py-3">Δ0</th>
                        <th className="px-3 py-3">Δ1</th>
                        <th className="px-3 py-3">Δ2</th>
                        <th className="px-3 py-3">Δ3</th>
                        <th className="px-3 py-3">Δ4</th>
                        <th className="px-3 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phaseDeltaRows.map((row) => (
                        <tr key={row.phase} className="border-t border-slate-100">
                          <th className="px-3 py-3 font-bold text-slate-950">{row.phase}</th>
                          <td className="px-3 py-3 text-slate-700">{row.d0}</td>
                          <td className="px-3 py-3 text-slate-700">{row.d1}</td>
                          <td className="px-3 py-3 text-slate-700">{row.d2}</td>
                          <td className="px-3 py-3 text-slate-700">{row.d3}</td>
                          <td className="px-3 py-3 text-slate-700">{row.d4}</td>
                          <td className="px-3 py-3 font-black text-slate-950">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>

            <p className="mt-6 rounded-md border border-cyan-100 bg-cyan-50 px-4 py-3 text-xs leading-6 text-slate-600">
              Phaseは外来・入院・救急の粗分類です。各記述には複数要素が含まれるため、単一原因の順位ではなく、現場で確認するための初期集計として扱います。
            </p>
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

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-base font-bold tracking-wide text-slate-950">黒江仁｜病院広報工房</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            病院広報に35年以上携わってきた黒江仁が、患者さんの声、職員の気づき、病院の理念や専門性を、理解と関係を整える広報へつなぎ直すためのサイトです。
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            {siteNavLinks.map((item) => (
              <a key={item.label} className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:border-cyan-300 hover:text-slate-950" href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
