import { useEffect, useRef, useState } from "react";

type DemoPageProps = {
  setPage: (page: string) => void;
};

type AcexItem = {
  key: string;
  label: string;
  title: string;
  body: string;
};

export default function DemoPage({ setPage }: DemoPageProps) {
  /* ===== State ===== */
  const [text, setText] = useState("");
  const [result, setResult] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showCaseReport, setShowCaseReport] = useState(false);
  const [showDbSample, setShowDbSample] = useState(false);

  const dbSampleRef = useRef<HTMLDivElement | null>(null);

  /* ===== Auto Scroll ===== */
  useEffect(() => {
    if (showDbSample) {
      dbSampleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showDbSample]);

  /* ===== Derived Logic ===== */
  const isAnxious = text.includes("不安");

  const judgment = isAnxious
    ? "関係の緊張が高まりつつある可能性"
    : "大きな緊張はまだ表面化していない状態";

  const actionSummary = isAnxious
    ? "まず不安の言葉を受け止め、説明不足として感じている点を確認する"
    : "現状の関わりを維持しつつ、追加の違和感が出ないかを見守る";

  const delta = isAnxious ? "3" : "1";
  const eLevel = isAnxious ? "e2（対処の段階）" : "e1（予防の段階）";

  /* ===== ACE + X Data ===== */
  const acexItems: AcexItem[] = isAnxious
    ? [
        {
          key: "A",
          label: "A",
          title: "受け止め",
          body: "不安の言葉をそのまま受け止める",
        },
        {
          key: "C",
          label: "C",
          title: "確認・説明",
          body: "何が足りないと感じたのかを確認する",
        },
        {
          key: "E",
          label: "E",
          title: "見通し",
          body: "これから何をどう説明するかを伝える",
        },
        {
          key: "X",
          label: "X",
          title: "補助",
          body: "説明順の整理や確認メモを使う",
        },
      ]
    : [
        {
          key: "A",
          label: "A",
          title: "受け止め",
          body: "現在の反応を維持しながら丁寧に観察する",
        },
        {
          key: "C",
          label: "C",
          title: "確認・説明",
          body: "必要があれば追加で確認する",
        },
        {
          key: "E",
          label: "E",
          title: "見通し",
          body: "今後の流れを簡潔に共有する",
        },
        {
          key: "X",
          label: "X",
          title: "補助",
          body: "特別な追加支援はせず通常対応を維持する",
        },
      ];

  /* ===== Flow / NG Data ===== */
  const flowItems = isAnxious
    ? [
        "まず不安の言葉を受け止める",
        "次に不足感の中身を確認する",
        "そのうえで説明の見通しを伝える",
      ]
    : [
        "現在の反応を維持する",
        "必要時のみ追加確認する",
        "今後の流れを簡潔に共有する",
      ];

  const ngItems = isAnxious
    ? [
        "不安を軽く扱う",
        "確認せずに説明を進める",
        "急いで結論だけを返す",
      ]
    : [
        "変化がないのに過剰対応する",
        "説明を省きすぎる",
        "観察を止めてしまう",
      ];

  return (
    <div className="bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* ===== Hero / Page Intro ===== */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Demo
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            観察内容から、関係の状態と次の対応を確認する。
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            この画面では、現場で捉えた違和感や患者の反応を入力し、
            関係緊張（Δ）・フェーズ（e）・状態の見立て・次の対応までを、
            最小構成で確認できます。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setPage("top")}
              className="rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              ← TOPへ戻る
            </button>

            <div className="rounded border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
              面談用デモ / 試作版
            </div>
          </div>
        </div>

        {/* ===== Main Layout ===== */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ===== Left Column ===== */}
          <div>
            {/* ===== Input Section ===== */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Input
                </p>

                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  観察内容を入力
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  患者の発言、表情、説明場面での違和感、やり取りのズレなどを、
                  短い文章で入力してください。
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Observation
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  ここでは、まず「何が気になったか」を観察記述として置きます。
                  まだ結論を出す段階ではなく、現場で感じた違和感を
                  言葉にして残す入口です。
                </p>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="例：患者が説明が足りない気がすると不安を訴えている"
                rows={7}
                className="mt-5 w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm leading-7 text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
              />

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setResult(true);
                    setShowResponse(false);
                    setShowCaseReport(false);
                    setShowDbSample(false);
                  }}
                  className="rounded bg-black px-5 py-3 text-sm text-white hover:bg-slate-800"
                >
                  状態を確認する
                </button>

                <button
                  onClick={() => {
                    setText("");
                    setResult(false);
                    setShowResponse(false);
                    setShowCaseReport(false);
                    setShowDbSample(false);
                  }}
                  className="rounded border border-slate-300 px-5 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  入力をクリア
                </button>
              </div>
            </div>

            {/* ===== Analysis Section ===== */}
            {result && (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="border-b border-slate-200 pb-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Analysis
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    確認結果
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    入力された観察内容をもとに、関係の状態を簡易に見立てています。
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      Delta
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      Δ（関係緊張）
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {delta}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      Phase
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      e（フェーズ）
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {eLevel}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Observation Summary
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    観察内容
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {text ? text : "まだ入力がありません"}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Interpretation
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    状態の見立て
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {judgment}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <button
                    onClick={() => setShowResponse(true)}
                    className="rounded bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800"
                  >
                    次の対応を見る
                  </button>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    この先で、ACE＋X・行為の順番・避けたい行動を表示します。
                  </p>
                </div>
              </div>
            )}

            {/* ===== Next Response Section ===== */}
            {result && showResponse && (
              <div className="mt-16 rounded-3xl border-2 border-slate-900 bg-white shadow-md">
                <div className="rounded-t-3xl bg-slate-900 px-6 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                    Next Response
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    次の対応
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    ここから先は、対応の中身を具体的に確認するセクションです。
                  </p>
                </div>

                <div className="p-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      Response Summary
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      次の対応の要約
                    </p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">
                      {actionSummary}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {acexItems.map((item) => (
                      <div
                        key={item.key}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-slate-600">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      Flow
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      行為の順番
                    </p>
                    <ol className="mt-2 space-y-2 text-sm leading-7 text-slate-600">
                      {flowItems.map((item, index) => (
                        <li key={index}>
                          {index + 1}. {item}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                      NG
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      避けたい行動
                    </p>
                    <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-600">
                      {ngItems.map((item, index) => (
                        <li key={index}>・{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <button
                      onClick={() => setShowCaseReport(true)}
                      className="rounded bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800"
                    >
                      ケース記録を見る
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===== Case Report Section ===== */}
            {result && showCaseReport && (
              <div className="mt-20 rounded-3xl border border-slate-300 bg-slate-50 p-6">
                <div className="border-b border-slate-200 pb-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Case Report
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    ケース記録（簡易）
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    今回の観察・見立て・対応を、1つのケースとして整理しています。
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      Delta
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      Δ（関係緊張）
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {delta}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                      Phase
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-700">
                      e（フェーズ）
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {eLevel}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Observation Summary
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    観察内容
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {text ? text : "未入力"}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Interpretation
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    状態の見立て
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {judgment}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    Response Summary
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    次の対応（要約）
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    {actionSummary}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowDbSample(true)}
                    className="rounded bg-slate-900 px-5 py-3 text-sm text-white hover:bg-slate-800"
                  >
                    DB見本に送る
                  </button>

                  <p className="mt-3 text-sm text-slate-500">
                    ※実際のDB保存ではなく、保存後の見本画面を表示します。
                  </p>
                </div>
              </div>
            )}

            {/* ===== DB Sample Section ===== */}
            {result && showDbSample && (
              <div
                ref={dbSampleRef}
                className="mt-20 rounded-3xl border-2 border-slate-900 bg-white shadow-md"
              >
                <div className="rounded-t-3xl bg-slate-900 px-6 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                    Case DB Sample
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    DB見本
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    ここでは、ケースが保存された後の見本表示をテーブル形式で示しています。
                  </p>
                </div>

                <div className="overflow-x-auto p-6">
                  <table className="min-w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-left">
                        <th className="px-4 py-3 font-medium text-slate-700">Case ID</th>
                        <th className="px-4 py-3 font-medium text-slate-700">Δ</th>
                        <th className="px-4 py-3 font-medium text-slate-700">e</th>
                        <th className="px-4 py-3 font-medium text-slate-700">観察内容</th>
                        <th className="px-4 py-3 font-medium text-slate-700">状態の見立て</th>
                        <th className="px-4 py-3 font-medium text-slate-700">次の対応</th>
                        <th className="px-4 py-3 font-medium text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="px-4 py-3 text-slate-700">CASE-001</td>
                        <td className="px-4 py-3 text-slate-700">{delta}</td>
                        <td className="px-4 py-3 text-slate-700">{eLevel}</td>
                        <td className="px-4 py-3 text-slate-700">
                          {text ? text : "未入力"}
                        </td>
                        <td className="px-4 py-3 text-slate-700">{judgment}</td>
                        <td className="px-4 py-3 text-slate-700">{actionSummary}</td>
                        <td className="px-4 py-3 text-slate-700">Draft / Demo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ===== Right Column / Side Panel ===== */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Structure
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                この画面で行っていること
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                観察内容を入力し、まず関係の状態を確認し、
                必要に応じて次の対応・ケース記録・DB見本まで確認できる構成にしています。
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Framework
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                この段階で見ている要素
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                <li>・Δ：関係緊張の大きさ</li>
                <li>・e：関係遷移の段階</li>
                <li>・Interpretation：状態の見立て</li>
                <li>・Next Response：次の対応</li>
                <li>・ACE＋X：対応の中身</li>
                <li>・Flow / NG：順番と避けたい行動</li>
                <li>・Case Report：簡易記録</li>
                <li>・DB Sample：保存後の見本テーブル</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Reading
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                見る順番
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
                <li>・まず観察内容を入力する</li>
                <li>・つぎに状態を確認する</li>
                <li>・必要に応じて次の対応を見る</li>
                <li>・ケース記録を見る</li>
                <li>・最後にDB見本へ送る</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Note
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                このデモの位置づけ
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                ここで示しているのは完成した自動判定ではなく、
                観察内容を起点に、関係の状態・次の対応・記録の流れを
                考えやすくするための試作段階です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}