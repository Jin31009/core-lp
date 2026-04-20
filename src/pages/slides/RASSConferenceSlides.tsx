import { useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  body: string[];
  emphasis: string;
  note: string;
};

export default function RASSConferenceSlides() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "01",
        kind: "hero",
        title: "ナラティブは“感想”ではない",
        subtitle: "―― 構造として扱える対象である",
        body: [
          "302件の患者ナラティブを同一条件で分析",
          "ズレを“構造”として記述可能にする",
          "主観 → 再現可能な理解対象へ転換",
        ],
        emphasis: "主観 → 構造（扱える）",
        note: "導入で“世界の見方”を変える。ここで関心を掴む。",
      },
      {
        id: "02",
        kind: "standard",
        title: "なぜナラティブは扱いにくいのか",
        subtitle: "従来の限界",
        body: [
          "主観的で再現性が低い",
          "比較・蓄積ができない",
          "行動設計につながらない",
        ],
        emphasis: "重要だが使えない",
        note: "問題を“構造的に”認識させる。",
      },
      {
        id: "03",
        kind: "question",
        title: "構造として扱えないのか？",
        subtitle: "研究の問い",
        body: [
          "ナラティブを構造として記述できるか",
          "記述できれば介入設計に使えるか",
        ],
        emphasis: "ここから研究が始まる",
        note: "問いを一文で理解させる。",
      },
      {
        id: "04",
        kind: "standard",
        title: "観測設計",
        subtitle: "―― 対象と条件の設定",
        body: [
          "投書データを対象",
          "個別ではなく母集団として扱う",
          "同一フィルターで分析",
        ],
        emphasis: "ここから観測設計",
        note: "分析の信頼性を担保する。",
      },
      {
        id: "05",
        kind: "standard",
        title: "フィルターの採用",
        subtitle: "―― 構造を記述するための視角",
        body: [
          "AK：未充足条件の配置（意味の把握）",
          "Δ / e / Trigger：変異の観測（変化の把握）",
          "APCE_Miss：接点欠損（欠損の把握）",
        ],
        emphasis: "フィルターによる構造記述",
        note: "分析フレーム＝フィルターとして明確化する。",
      },
      {
        id: "06",
        kind: "standard",
        title: "構造の把握",
        subtitle: "―― ズレを未充足条件として読む",
        body: [
          "安全・役割が中心",
          "複数条件の組み合わせ",
          "単一原因ではない構造",
        ],
        emphasis: "ズレ＝構造",
        note: "状態＝構造として読むことを強調。",
      },
      {
        id: "07",
        kind: "diagram",
        title: "変異の把握",
        subtitle: "―― 転換はジャンプとして観測される",
        body: [
          "Δ2→Δ3で変化",
          "Triggerとして観測",
          "臨界点としての変異",
        ],
        emphasis: "変異としてのズレ",
        note: "進行ではなく“変異”として理解させる。時間的進行を直接示すものではなく、条件別に観測される指標である。",
      },
      {
        id: "08",
        kind: "diagram",
        title: "欠損の把握",
        subtitle: "―― 接点の問題は重なり構造を持つ",
        body: [
          "全体：共感・接続に分布",
          "個別：認識に集中",
          "複数欠損が重なり合う",
        ],
        emphasis: "欠損構造",
        note: "接点の問題＝欠損として統一的に理解させる。",
      },
      {
        id: "09",
        kind: "insight",
        title: "ナラティブは（構造・変異・欠損）として記述可能",
        subtitle: "―― 構造として把握できる対象である",
        body: [
          "構造：状態（AK）として把握される",
          "変異：Δジャンプとして観測される",
          "欠損：接点において重なりとして現れる",
        ],
        emphasis: "ナラティブ＝構造・変異・欠損（記述可能）",
        note: "本研究における操作的定義として提示（因果の特定ではない）。",
      },
      {
        id: "09b",
        kind: "case",
        title: "CASE①：ナラティブの構造分解（不満化ケース）",
        subtitle: "―― CONTEXTとフィルターで読む",
        body: [
          "『どれくらい待つのか分からない』",
          "CONTEXT：外来待ち時間が長く、状況説明がない",
          "AK：見通し欠如（P）＋役割不明（L）",
          "Δ/e/Trigger：Δ2→Δ3・e3でクレーム化（Trigger=Yes）",
          "APCE_Miss：C（説明）/E（共感）不足",
        ],
        emphasis: "フィルターで分解できる",
        note: "実際の発話を起点に構造へ展開する。",
      },
      {
        id: "09c",
        kind: "case",
        title: "CASE②：接点介入で抑制（良化ケース）",
        subtitle: "―― ACEでΔジャンプを抑える",
        body: [
          "『お待たせして申し訳ありません。あと10分ほどです』",
          "CONTEXT：同様に待ち時間あり・不安増大の兆候",
          "AK：見通し不安（P）を早期に認識",
          "介入（ACE）：C＋P＋E",
          "結果：Δ2で停滞（Trigger=No）",
        ],
        emphasis: "ACEでジャンプを止める",
        note: "同一条件でも接点介入で結果が変わることを示す。",
      },
      {
        id: "10",
        kind: "turn",
        title: "設計転換",
        subtitle: "―― では、どこが操作できるのか",
        body: [
          "状態・進行は操作できない",
          "接点だけが操作可能領域として残る",
        ],
        emphasis: "ここで設計に転換",
        note: "“全部は無理”を明確にしてから価値へ繋ぐ。",
      },
      {
        id: "11",
        kind: "value",
        title: "ACE-X（接点設計）",
        subtitle: "―― 設計セクションの中核",
        body: [
          "A / P / C / E：接点における行為設計",
          "X：Δ2→Δ3のジャンプ抑制",
          "構造を“操作可能”に変えるポイント",
        ],
        emphasis: "ここがCORE（価値）",
        note: "⑩の続きとして“唯一の解”を提示する。ただし解決策の確定ではなく、外挿的に設計された介入仮説である。",
      },
      {
        id: "12",
        kind: "cta",
        title: "RA-SS / DEMO",
        subtitle: "―― 可能性：ACE-X的介入手法＋RA-SS的現場最適化",
        body: [
          "ACE-Xにより接点での介入設計を実装",
          "RA-SSにより構造指標を現場でリアルタイム観測",
          "両者の統合で“予防的最適化”を実現（Demoで体感）",
        ],
        emphasis: "介入（ACE-X）＋最適化（RA-SS）",
        note: "可能性を“手法（ACE-X）”と“運用（RA-SS）”に分けて提示し、デモへ誘導する。",
      },
      {
        id: "13",
        kind: "conclusion",
        title: "結論",
        subtitle: "ズレは構造である",
        body: [
          "ナラティブ＝構造",
          "ズレ＝観測可能",
          "介入＝接点",
        ],
        emphasis: "記述から設計へ",
        note: "短く強く締める。",
      },
    ],
    []
  );

  const [current, setCurrent] = useState<number>(0);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});
  const [fade, setFade] = useState<boolean>(true);

  const slide = slides[current];

  const roleMap: Record<string, string> = {
    "02": "PROBLEM",
    "03": "QUESTION",
    "04": "SECTION",
    "05": "OBSERVATION",
    "06": "OBSERVATION",
    "07": "OBSERVATION",
    "08": "OBSERVATION",
    "09": "INSIGHT",
    "10": "TURN",
    "11": "VALUE",
    "12": "CTA",
    "13": "CONCLUSION",
  };

  const roleColorMap: Record<string, string> = {
    PROBLEM: "bg-gray-200 text-gray-800",
    QUESTION: "bg-blue-100 text-blue-800",
    SECTION: "bg-purple-100 text-purple-800",
    OBSERVATION: "bg-amber-100 text-amber-800",
    INSIGHT: "bg-green-100 text-green-800",
    TURN: "bg-indigo-100 text-indigo-800",
    VALUE: "bg-red-100 text-red-800",
    CTA: "bg-black text-white",
    CONCLUSION: "bg-neutral-200 text-neutral-800",
  };

  const role = roleMap[slide.id];
  const roleClass = role ? roleColorMap[role] : "";

  const sectionCoverIds = ["01", "04", "09", "10"];
  const sectionTitleMap: Record<string, string> = {
    "01": "REDEFINITION",
    "04": "OBSERVATION DESIGN",
    "09": "UNDERSTANDING",
    "10": "DESIGN TURN",
  };
  const isSpecialSlide = sectionCoverIds.includes(slide.id);

  const toggleItem = (index: number) => {
    setActiveItems((prev) => {
      const key = `${current}-${index}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const clearSlideItems = (slideIndex: number) => {
    setActiveItems((prev) => {
      const next = { ...prev };
      slides[slideIndex].body.forEach((_, i) => {
        delete next[`${slideIndex}-${i}`];
      });
      return next;
    });
  };

  const activateNextItem = (): boolean => {
    const nextIndex = slide.body.findIndex((_, i) => !activeItems[`${current}-${i}`]);
    if (nextIndex !== -1) {
      setActiveItems((prev) => ({ ...prev, [`${current}-${nextIndex}`]: true }));
      return true;
    }
    return false;
  };

  const moveToSlide = (nextIndex: number) => {
    if (nextIndex === current) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(nextIndex);
      clearSlideItems(nextIndex);
      setFade(true);
    }, 120);
  };

  const handleNext = () => {
    if (current < slides.length - 1) {
      moveToSlide(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      moveToSlide(current - 1);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        const progressed = activateNextItem();
        if (!progressed) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, activeItems, slide]);

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="h-1 bg-neutral-200 rounded mb-4 overflow-hidden">
          <div
            className="h-1 bg-neutral-900 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className={`bg-white rounded-3xl p-10 shadow transition-opacity duration-150 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-6">
            <div>
              {role && (
                <div className={`mb-3 inline-block text-sm px-3 py-1 rounded-full ${roleClass}`}>
                  {role}
                </div>
              )}

              {isSpecialSlide ? (
                <div className="text-center space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">{slide.title}</h1>
                  <p className="text-2xl text-gray-500">{slide.subtitle}</p>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                  <p className="text-xl text-gray-500">{slide.subtitle}</p>
                </div>
              )}
            </div>

            <div className={isSpecialSlide ? "mx-auto text-center" : ""}>
              <div className="bg-black text-white px-6 py-3 rounded-xl inline-block text-lg md:text-xl">
                {slide.emphasis}
              </div>
            </div>

            {isSpecialSlide && (
              <div className="pt-2">
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-400 text-center">
                  {sectionTitleMap[slide.id] || "Section Cover"}
                </p>
              </div>
            )}

            <div className={isSpecialSlide ? "space-y-3" : "space-y-2"}>
              {slide.body.map((item, i) => {
                const itemKey = `${current}-${i}`;
                const isActive = !!activeItems[itemKey];
                return (
                  <div
                    key={itemKey}
                    className={`flex items-center gap-3 ${isSpecialSlide ? "justify-center" : ""}`}
                  >
                    <button
                      onClick={() => toggleItem(i)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm shrink-0 ${
                        isActive ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>

                    <div
                      className={`transition-all duration-200 rounded-lg border ${
                        isSpecialSlide ? "max-w-2xl p-4 text-2xl w-full" : "p-3 text-xl flex-1"
                      } ${
                        isActive ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"
                      }`}
                    >
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 items-center">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40"
          >
            ← 前へ
          </button>
          <span className="text-sm text-gray-500">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={handleNext}
            disabled={current === slides.length - 1}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40"
          >
            次へ →
          </button>
        </div>

        <div className="mt-6 text-gray-500 text-base leading-relaxed">{slide.note}</div>
      </div>
    </div>
  );
}
