import { useMemo, useState } from "react";

type RoleKey = "core" | "navi" | "sora" | "codex";
type ViewMode = "normal" | "character" | "hybrid";

type RoleContent = Partial<Record<RoleKey, string>>;

type Slide = {
  id: string;
  chapter: string;
  section: string;
  title: string;
  subtitle: string;
  point: string;
  status: string;
  reactBody: string[];
  core: string;
  navi: string;
  sora: string;
  codex: string;
};

type IndexGroup = {
  label: string;
  note: string;
  ids: string[];
};

type ViewingPoint = {
  title: string;
  description: string;
  dotClass: string;
};

function makeSlide(
  id: string,
  chapter: string,
  section: string,
  title: string,
  subtitle: string,
  point: string,
  body: string[],
  roles: RoleContent = {}
): Slide {
  return {
    id,
    chapter,
    section,
    title,
    subtitle,
    point,
    status: id === "00" ? "未設定" : "予定",
    reactBody: body,
    core: roles.core ?? "このスライドで問うべきことを確認する。",
    navi: roles.navi ?? "構造としてどこを見るかを整理する。",
    sora: roles.sora ?? "専門的な内容を伝わる言葉へ翻訳する。",
    codex: roles.codex ?? "画像・コード・公開導線を同一IDで接続する。",
  };
}

const slides: Slide[] = [
  makeSlide(
    "00",
    "00｜Cover",
    "表紙",
    "統合表紙（未設定）",
    "キャラ版・React版を統合する表紙スライド",
    "現時点では統合表紙は未設定。後でImage2生成画像または専用表紙を接続する。",
    [
      "この枠は、最終的な統合表紙を格納するための予約領域です。",
      "CORE / NAVI / SORA / CODEX を含む表紙画像を後で配置します。",
      "現時点では本編スライド01以降の受け皿を優先します。",
    ],
    {
      core: "表紙はまだ確定させず、全体の器を先に固める。",
      navi: "統合表紙は未設定として明示し、INDEX上では予約枠として管理する。",
      sora: "ここは最後に世界観を整える場所。今は“準備中”と見せればOKです。",
      codex: "後で /assets/slides/characters/00.png または cover.png に接続できるようにする。",
    }
  ),
  makeSlide("01", "01｜Opening / Problem / Question", "扉", "ナラティブは“感想”ではない", "構造として扱える対象である", "主観的に見える語りを、再現可能な構造として扱う。", ["302件の患者ナラティブを同一条件で分析する。", "関係のズレを“構造”として記述可能にする。", "主観から、再現可能な理解対象へ転換する。"]),
  makeSlide("02", "01｜Opening / Problem / Question", "扉", "なぜ扱いにくいのか", "従来の限界", "重要だが、比較・蓄積・行動設計につながりにくい。", ["主観的で再現性が低い。", "比較・蓄積が難しい。", "行動設計につながりにくい。"]),
  makeSlide("03", "01｜Opening / Problem / Question", "下層ページ", "構造として扱えないのか？", "研究の問い", "ナラティブを構造として記述し、介入設計に使えるか。", ["研究問いを提示する。", "構造化可能性を問う。", "接点設計への接続可能性を問う。"]),

  makeSlide("04", "02｜Observation", "下層ページ", "観測設計", "302件を同一条件で観測する", "個別印象ではなく、同一条件で比較可能にする。", ["対象を固定する。", "条件を固定する。", "同一フィルターで読む。"]),
  makeSlide("05-01", "02｜Observation", "下層ページ", "フィルター条件の設定", "ナラティブを観測するために、フィルターを採用する", "同じ条件で見なければ、比較も再現もできない。", ["観測する前に条件を先に決める。", "同一条件で観測して比較可能性を確保する。", "記録の前提を固定する。"]),
  makeSlide("05-02", "02｜Observation", "下層ページ", "観測フレーム", "条件を通すことで、ナラティブは記述可能になる", "フィルターを通すことで、ナラティブは構造として扱える。", ["ナラティブ", "フィルター（観測条件）", "記述可能", "構造 / 変異 / 欠損"]),
  makeSlide("05-03", "02｜Observation", "下層ページ", "フィルターの意味", "フィルターを入れると、「扱えない」が「扱える」に変わる", "「扱えない」が「扱える」に変わる。", ["比較できる", "再現できる", "分析できる"]),
  makeSlide("05-04", "02｜Observation", "下層ページ", "観測設計のまとめ", "フィルターを通すことで、ナラティブは構造・変異・欠損として記述できる", "ナラティブは、フィルターを通して構造・変異・欠損として記述できる。", ["05-01 条件を決める", "05-02 記述可能になる", "05-03 比較・再現・分析できる"]),
  makeSlide("06-01", "02｜Observation", "下層ページ", "構造の把握", "ズレの見方を、原因から条件へ転換する", "原因ではなく条件かもしれない、という見方へ転換する。", ["ズレは原因ではなく", "条件の不足として", "見れないか？"]),
  makeSlide("06-02", "02｜Observation", "下層ページ", "構造の提示（SRPL）", "人の体験は、4つの条件で整理できる", "ズレは、これらの“どこかの不足”として見れる。", ["S：安全（Safety）", "R：尊厳（Respect）", "P：見通し（Perspective）", "L：役割（Role）"]),
  makeSlide("06-03", "02｜Observation", "下層ページ", "配置の把握", "ズレは、SRPLの不足の組み合わせとして見れる", "原因ではなく、配置として読む。", ["ズレ ＝", "複数の条件の不足の重なり", "例：P（見通し）＋ L（役割）"]),
  makeSlide("06-04", "02｜Observation", "下層ページ", "理解の確定", "06章の結論を、理解として確定する", "理解できることが、使えることにつながる。", ["ズレは原因ではなく", "SRPLの未充足条件の", "配置として捉えられる"]),
  makeSlide("06", "02｜Observation", "下層ページ", "構造の把握", "ズレを未充足条件として読む", "ズレは単一原因ではなく、SRPLの配置として観測される。", ["SRPLとして配置する。", "複数条件として読む。", "構造として観測する。"]),
  makeSlide("07", "02｜Observation", "下層ページ", "変異の把握", "転換はジャンプとして観測される", "ズレは連続的進行ではなく、非連続的な変異として観測される。", ["Δ指標として観測する。", "非連続的な変異を見る。", "転換点を読む。"]),
  makeSlide("08", "02｜Observation", "下層ページ", "欠損の把握", "接点の問題は重なり構造を持つ", "接点欠損は集中と分散の二層構造として現れる。", ["接点欠損として観測する。", "分散と集中を見る。", "複数欠損の重なりを見る。"]),
  makeSlide("08-DATA", "02｜Observation", "下層ページ", "DATA｜302件ナラティブ分析結果", "構造・変異・欠損の実測分布", "302件の患者ナラティブは、構造・変異・欠損として定量的に把握可能である。", ["Δ分布：Δ2・Δ3が中核", "Trigger：転換点の有無を把握", "APCE：欠損構造から介入入口を特定"], { core: "302件が土台", navi: "観測可能性の根拠", sora: "数字ではなく構造を伝える", codex: "CSV結果をUIに接続" }),
  makeSlide("09", "03｜Cases", "下層ページ", "ナラティブは構造・変異・欠損として記述可能", "次に個別事例で確認する", "ナラティブは、比較可能な観測枠組みとして扱える。", ["構造として把握。", "変異として観測。", "欠損として特定。"]),
  makeSlide("09b", "03｜Cases", "下層ページ", "CASE①：不満化ケース", "CONTEXTとフィルターで読む", "フィルターにより、不満化したナラティブを分解できる。", ["文脈を整理する。", "変異として観測する。", "欠損として特定する。"]),
  makeSlide("09c", "03｜Cases", "下層ページ", "CASE②：継続ズレケース", "CONTEXTとフィルターで読む", "転換前の継続的な不安も、同じ観測フレームで把握できる。", ["文脈を整理する。", "配置として読む。", "欠損として特定する。"]),
  makeSlide("09d", "03｜Cases", "下層ページ", "CASE③：臨界局面ケース", "医学的状況と関係のズレを同時に読む", "臨界局面でも、関係のズレは構造として分解できる。", ["文脈を整理する。", "変異として観測する。", "欠損として特定する。"]),
  makeSlide("10", "04｜Implementation", "下層ページ", "可能性への転換", "関係の状態にどこまで介入可能かを考える", "構造把握から、予防的介入の可能性へ転換する。", ["ACE-Xへ接続。", "RA-SSへ接続。", "実践可能性へ展開。"]),
  makeSlide("11", "04｜Implementation", "下層ページ", "ACE-X：予防的介入への機能拡張", "関係の状態に働きかける接点行為の設計", "観測された構造から、接点で作用しうる行為を導出する。", ["介入可能性を抽出する。", "行為として実装する。", "環境で成立させる。"]),
  makeSlide("12", "04｜Implementation", "下層ページ", "RA-SS：現場への最適化", "関係状態の観測と接点運用をつなぐ", "観測・判断・介入を現場で循環させるPoCへ接続する。", ["接点で扱うPoC。", "Trigger前を把握する。", "予防的介入を検討する。"]),
  makeSlide("13", "05｜Conclusion", "結論", "結論", "広報は、情報伝達ではなく関係の状態に働きかける営みである", "病院広報は、関係を扱う領域として再定義される。", ["ナラティブは構造として記述しうる。", "広報は関係状態に働きかけている。", "ACE-XとRA-SSにより接点設計へ接続される。"]),
];

const indexGroups: IndexGroup[] = [
  { label: "00｜Cover", note: "統合表紙（未設定）", ids: ["00"] },
  { label: "01｜Opening / Problem / Question", note: "導入・問題提起・研究問い", ids: ["01", "02", "03"] },
  { label: "02｜Observation", note: "観測設計・構造把握", ids: ["04", "05-01", "05-02", "05-03", "05-04", "06-01", "06-02", "06-03", "06-04", "07", "08", "08-DATA"] },
  { label: "03｜Cases", note: "ナラティブ事例", ids: ["09", "09b", "09c", "09d"] },
  { label: "04｜Implementation", note: "応用・実装", ids: ["10", "11", "12"] },
  { label: "05｜Conclusion", note: "結論・再定義", ids: ["13"] },
];

export default function RASSHybridSlides() {
  const [activeSlide, setActiveSlide] = useState(slides[0].id);
  const [mode, setMode] = useState<ViewMode>("hybrid");
  const [openGroup, setOpenGroup] = useState("00｜Cover");
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});

  const slide = useMemo(() => slides.find((s) => s.id === activeSlide) ?? slides[0], [activeSlide]);

  const showReact = mode === "normal" || mode === "hybrid";
  const showCharacter = mode === "character" || mode === "hybrid";
  const isNormalMode = mode === "normal";
  const isCoverSlide = slide.id === "00";
  const isIntroSlide = slide.id === "01";
  const isProblemSlide = slide.id === "02";
  const isHypothesisSlide = slide.id === "03";
  const isObservationIntroSlide = slide.id === "04";
  const isFilterSetupSlide = slide.id === "05-01";
  const isObservationFrameSlide = slide.id === "05-02";
  const isFilterMeaningSlide = slide.id === "05-03";
  const isFilterIntegrationSlide = slide.id === "05-04";
  const isStructureGraspIntroSlide = slide.id === "06-01";
  const isSrplIntroSlide = slide.id === "06-02";
  const isPlacementGraspSlide = slide.id === "06-03";
  const isPlacementConclusionSlide = slide.id === "06-04";
  const characterImageSrc = isCoverSlide
    ? "/assets/slides/characters/00.png"
    : isObservationFrameSlide
      ? "/assets/slides/characters/05-02.png"
      : `/assets/slides/characters/${slide.id}.png`;
  const hasImageError = !!imageLoadError[slide.id];
  const viewingPointsDefault: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "病院広報は、“関係”を軸に再定義できるのか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "関係はどのような構造として現れているのか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "言葉は関係の解像度をどこまで高められるのか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "関係の状態はどこまで再現可能なのか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPointsForIntro: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "ナラティブは、本当に“感想”のままでいいのか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "302件の語りを、同じ条件で読み直せるのか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "患者の声の奥にある関係のズレを受け取れるか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "主観的な語りを、再現可能な理解対象へ変換できるか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPointsForProblem: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "価値ある声が、なぜ活かされないのか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "扱いにくさは、構造欠損として見えるか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "比較できないことが、現場の迷いを生んでいないか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "再現・設計できない状態を、どう記録するか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPointsForHypothesis: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "ナラティブは、構造として見れるのではないか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "同じ流れで見れば、比較できるのではないか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "出来事を、行為として捉え直せるのではないか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "構造として記録すれば、再現できるのではないか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPointsForObservationIntro: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "302件を、どう同じ条件で観測するか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "同一フィルターで、差分を比較できるか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "一つひとつの声を、観測可能な対象にできるか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "観測手順を固定し、再現可能にできるか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPointsForObservationFrame: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "何を見れば、同じ条件で観測できるのか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "フィルターを通すと、記述可能になるか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "バラバラな声を、同じ見方で捉え直せるか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "観測条件を固定すれば、再現できるか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPointsForFilterIntegration: ViewingPoint[] = [
    {
      title: "CORE｜問いを立てる",
      description: "フィルターによって、何が記述可能になったのか",
      dotClass: "bg-rose-300/90",
    },
    {
      title: "NAVI｜構造で読む",
      description: "条件・記述・比較の流れがつながっているか",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "SORA｜意味を翻訳する",
      description: "バラバラな声が、観測可能な対象になったか",
      dotClass: "bg-violet-300/90",
    },
    {
      title: "CODEX｜再現へつなぐ",
      description: "同じ手順で、再現可能な分析に進めるか",
      dotClass: "bg-emerald-300/90",
    },
  ];
  const viewingPoints = isIntroSlide
    ? viewingPointsForIntro
    : isProblemSlide
      ? viewingPointsForProblem
      : isHypothesisSlide
        ? viewingPointsForHypothesis
        : isObservationIntroSlide
          ? viewingPointsForObservationIntro
          : isObservationFrameSlide
            ? viewingPointsForObservationFrame
            : isFilterIntegrationSlide
              ? viewingPointsForFilterIntegration
        : viewingPointsDefault;

  const handleToggleGroup = (label: string) => {
    setOpenGroup((current) => (current === label ? "" : label));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-3 text-slate-100 md:p-4">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-3 shadow-2xl md:aspect-video md:flex-row">
        <aside className="flex max-h-[42vh] w-full shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 md:h-full md:max-h-none md:w-[250px]">
          <div className="mb-4 shrink-0">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">RA-SS</p>
            <h1 className="mt-2 text-lg font-black leading-tight">病院広報工房</h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              React正本とキャラ版を統合するハイブリッド型スライド。
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="space-y-2">
              {indexGroups.map((group) => {
                const activeGroup = group.ids.includes(activeSlide);
                const isOpen = openGroup === group.label || activeGroup;
                return (
                  <div key={group.label} className="rounded-lg border border-white/10 bg-slate-900/60 p-2">
                    <button
                      type="button"
                      onClick={() => handleToggleGroup(group.label)}
                      className="w-full border-b border-white/10 pb-1 text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs font-bold ${activeGroup ? "text-white" : "text-cyan-200"}`}>{group.label}</p>
                        <span className="text-[10px] text-slate-500">{isOpen ? "▲" : "▼"}</span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">{group.note}</p>
                    </button>

                    {isOpen && (
                      <div className="mt-2 max-h-[34vh] space-y-1 overflow-y-auto pr-1">
                        {group.ids.map((id) => {
                          const target = slides.find((s) => s.id === id);
                          if (!target) return null;
                          return (
                            <button
                              key={id}
                              onClick={() => setActiveSlide(id)}
                              className={`w-full rounded-lg px-2 py-2 text-left transition ${
                                activeSlide === id ? "bg-white/20 text-white" : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-black">{target.id}</span>
                                <span className="text-[10px] text-slate-500">{target.status}</span>
                              </div>
                              <p className="mt-1 line-clamp-2 text-[11px] leading-snug">{target.title}</p>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 shrink-0 rounded-xl border border-white/10 bg-slate-900/80 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">View Mode</p>
            <div className="grid gap-2">
              {[
                { key: "normal", label: "通常版" },
                { key: "character", label: "キャラ版" },
                { key: "hybrid", label: "ハイブリッド" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setMode(item.key as ViewMode)}
                  className={`rounded-lg px-3 py-2 text-left text-xs font-bold transition ${
                    mode === item.key ? "bg-white text-slate-950" : "bg-white/10 text-slate-300 hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <header className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-cyan-300">{slide.id} / {slide.chapter}</p>
                <h2 className="mt-1 truncate text-xl font-black tracking-tight">{slide.title}</h2>
                <p className="mt-1 truncate text-xs text-slate-400">{slide.subtitle}</p>
              </div>

              <div className="flex w-full shrink-0 items-center justify-between gap-3 rounded-xl border border-cyan-300/20 bg-cyan-900/30 px-3 py-2 md:w-auto md:justify-start">
                <div className="hidden h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-[10px] text-slate-400 md:flex">QR</div>
                <div className="hidden md:block">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Next Action</p>
                  <p className="text-[10px] text-slate-300">この構造を実際に体験できます</p>
                </div>
                <a
                  href="https://core-lp.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-cyan-300 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-cyan-200"
                >
                  サイトへ
                </a>
              </div>
            </div>

          </header>

          <section className={`grid min-h-0 flex-1 gap-3 ${mode === "hybrid" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
            {showReact && (
            <div className="flex min-h-0 flex-col rounded-xl border border-cyan-300/20 bg-slate-900 p-3">
              <div className="mb-2 shrink-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300">React Slide</p>
                <h3 className="text-sm font-bold">構造版・正本</h3>
              </div>

              {isIntroSlide ? (
                <div className="flex min-h-0 flex-1 items-center justify-center">
                  <div className="mx-auto aspect-video w-full max-h-full rounded-xl bg-white px-6 py-10 md:px-10 md:py-12">
                    <div className="flex h-full items-center justify-center text-center text-slate-900">
                      <div>
                        <h4 className="text-3xl font-black leading-tight md:text-4xl">
                          ナラティブは
                          <br />
                          <span className="text-slate-950">“感想”</span>ではない
                        </h4>
                        <p className="mt-5 text-lg font-semibold text-slate-700 md:text-xl">
                          構造として扱える対象である
                        </p>
                        <p className="mt-8 text-base font-medium leading-relaxed text-slate-700 md:text-lg">
                          302件の患者ナラティブを、
                          <br />
                          同一条件で読み直す。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isObservationIntroSlide ? (
                <div className="flex min-h-0 flex-1 items-center justify-center">
                  <div className="mx-auto aspect-video w-full max-h-full rounded-xl bg-white px-6 py-7 md:px-10 md:py-9">
                    <div className="flex h-full flex-col items-center justify-center text-center text-slate-900">
                      <h4 className="text-3xl font-black leading-tight md:text-4xl">
                        観測設計
                      </h4>
                      <p className="mt-4 text-base font-semibold text-slate-700 md:text-lg">
                        302件を、同一条件・同一フィルターで観測する
                      </p>

                      <div className="mt-8 w-full max-w-4xl rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 md:px-6 md:py-5">
                        <div className="grid grid-cols-2 gap-3 text-left md:grid-cols-4 md:gap-4">
                          <p className="text-xs font-semibold leading-relaxed text-slate-700 md:text-sm">05 フィルターの採用</p>
                          <p className="text-xs font-semibold leading-relaxed text-slate-700 md:text-sm">06 構造の把握（SRPL）</p>
                          <p className="text-xs font-semibold leading-relaxed text-slate-700 md:text-sm">07 変異の把握（Δ × e × Trigger）</p>
                          <p className="text-xs font-semibold leading-relaxed text-slate-700 md:text-sm">08 欠損の把握（APCE_Miss）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <div className="min-h-0 flex flex-1 items-center justify-center">
              <div className={`${isNormalMode ? "h-full w-full" : "mx-auto aspect-video w-full max-w-full min-h-0"} rounded-xl bg-white p-4 text-slate-950 ${isCoverSlide || isProblemSlide || isHypothesisSlide || isFilterSetupSlide || isObservationFrameSlide || isFilterMeaningSlide || isFilterIntegrationSlide || isStructureGraspIntroSlide || isSrplIntroSlide || isPlacementGraspSlide || isPlacementConclusionSlide ? "overflow-hidden" : "overflow-auto"}`}>
                {isCoverSlide ? (
                  <div className="flex h-full flex-col justify-start p-2 md:p-3">
                    <div className="md:-mt-2">
                      <h4 className="mt-2 text-3xl font-black leading-[1.15] text-slate-900 md:text-[2.55rem]">
                        302件のナラティブ分析が
                        <br />
                        もたらしたもの
                      </h4>
                      <p className="mt-6 text-center text-base font-semibold leading-relaxed text-slate-800 md:text-xl">
                        人の声を、構造として理解する。<br />
                        それが、関係を変え、未来をつくる。
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] text-slate-600 md:gap-3">
                      <span>DATA　302件</span>
                      <span className="text-slate-400">｜</span>
                      <span>MODEL　構造・変異・欠損</span>
                      <span className="text-slate-400">｜</span>
                      <span>OUTPUT　RA-SS / ACE-X / 病院広報の再定義</span>
                    </div>
                  </div>
                ) : isProblemSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-8 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.55rem] font-black leading-tight tracking-[-0.01em] md:text-[1.95rem]">
                        なぜナラティブは扱いにくいのか
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        価値はあるのに、構造として使えない
                      </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex min-h-[92px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-center">
                          <span className="text-base text-slate-500">🧩</span>
                          <p className="mt-1 text-xs font-semibold leading-snug text-slate-800">構造化されていない</p>
                        </div>
                        <span className="shrink-0 text-base font-semibold text-slate-500">→</span>
                        <div className="flex min-h-[92px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-center">
                          <span className="text-base text-slate-500">⚖</span>
                          <p className="mt-1 text-xs font-semibold leading-snug text-slate-800">比較できない</p>
                        </div>
                        <span className="shrink-0 text-base font-semibold text-slate-500">→</span>
                        <div className="flex min-h-[92px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-center">
                          <span className="text-base text-slate-500">🔁</span>
                          <p className="mt-1 text-xs font-semibold leading-snug text-slate-800">再現できない</p>
                        </div>
                        <span className="shrink-0 text-base font-semibold text-slate-500">→</span>
                        <div className="flex min-h-[92px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-center">
                          <span className="text-base text-slate-500">🛠</span>
                          <p className="mt-1 text-xs font-semibold leading-snug text-slate-800">設計できない</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      投書の価値が低いのではなく、構造化されていないため活かしきれない。
                    </p>
                  </div>
                ) : isHypothesisSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-8 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.55rem] font-black leading-tight tracking-[-0.01em] md:text-[1.95rem]">
                        構造として扱えないのか？
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        本当にそうだろうか？
                      </p>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex w-full items-center justify-between gap-3 md:gap-4">
                        <p className="flex-1 text-center text-sm font-semibold leading-snug text-slate-800 md:text-base">起きたこと</p>
                        <span className="shrink-0 text-lg font-black text-slate-500 md:text-xl">→</span>
                        <p className="flex-1 text-center text-sm font-semibold leading-snug text-slate-800 md:text-base">どう感じたか</p>
                        <span className="shrink-0 text-lg font-black text-slate-500 md:text-xl">→</span>
                        <p className="flex-1 text-center text-sm font-semibold leading-snug text-slate-800 md:text-base">どう考えたか</p>
                        <span className="shrink-0 text-lg font-black text-slate-500 md:text-xl">→</span>
                        <p className="flex-1 text-center text-sm font-semibold leading-snug text-slate-800 md:text-base">何をしたか</p>
                        <span className="shrink-0 text-lg font-black text-slate-500 md:text-xl">→</span>
                        <p className="flex-1 text-center text-sm font-semibold leading-snug text-slate-800 md:text-base">どうなったか</p>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      ナラティブは、構造として扱えるかもしれない
                    </p>
                  </div>
                ) : isFilterSetupSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <div className="text-center">
                      <h4 className="text-[1.5rem] font-black leading-tight md:text-[1.95rem]">
                        フィルター条件の設定
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        ナラティブを観測するために、フィルターを採用する
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <p className="text-center text-lg font-bold leading-relaxed text-slate-900 md:text-2xl">
                        出来事を「知る」のではなく
                        <br />
                        観測するための条件を先に決める
                      </p>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      同じ条件で見なければ、比較も再現もできない
                    </p>
                  </div>
                ) : isObservationFrameSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-9 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.45rem] font-black leading-tight md:text-[1.9rem]">
                        観測フレーム
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        条件を通すことで、ナラティブは記述可能になる
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex w-full max-w-4xl flex-col items-center gap-5 text-center">
                        <div className="flex w-full items-center justify-between gap-2 md:gap-4">
                          <p className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-black text-slate-900 md:text-base">ナラティブ</p>
                          <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                          <p className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-black text-slate-900 md:text-base">フィルター（観測条件）</p>
                          <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                          <p className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-black text-slate-900 md:text-base">記述可能</p>
                        </div>
                        <p className="text-xs font-semibold tracking-wide text-slate-500 md:text-sm">構造 / 変異 / 欠損</p>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      フィルターを通すことで、ナラティブは構造として扱える
                    </p>
                  </div>
                ) : isFilterMeaningSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-9 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.45rem] font-black leading-tight md:text-[1.9rem]">
                        フィルターの意味
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        フィルターを入れると、「扱えない」が「扱える」に変わる
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="grid w-full grid-cols-3 gap-3 md:gap-5">
                        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-6 text-center text-lg font-black text-slate-900 md:text-2xl">比較できる</p>
                        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-6 text-center text-lg font-black text-slate-900 md:text-2xl">再現できる</p>
                        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-6 text-center text-lg font-black text-slate-900 md:text-2xl">分析できる</p>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      「扱えない」が「扱える」に変わる
                    </p>
                  </div>
                ) : isFilterIntegrationSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-9 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.4rem] font-black leading-tight md:text-[1.85rem]">
                        観測設計のまとめ
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        フィルターを通すことで、ナラティブは構造・変異・欠損として記述できる
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex w-full items-center justify-between gap-2 md:gap-4">
                        <div className="flex min-h-[96px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-3 text-center">
                          <p className="text-xs font-bold text-slate-500 md:text-sm">05-01</p>
                          <p className="mt-1 text-sm font-black leading-snug text-slate-900 md:text-base">条件を決める</p>
                        </div>
                        <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                        <div className="flex min-h-[96px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-3 text-center">
                          <p className="text-xs font-bold text-slate-500 md:text-sm">05-02</p>
                          <p className="mt-1 text-sm font-black leading-snug text-slate-900 md:text-base">記述可能になる</p>
                        </div>
                        <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                        <div className="flex min-h-[96px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-3 text-center">
                          <p className="text-xs font-bold text-slate-500 md:text-sm">05-03</p>
                          <p className="mt-1 text-sm font-black leading-snug text-slate-900 md:text-base">比較・再現・分析できる</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      ナラティブは、フィルターを通して構造・変異・欠損として記述できる
                    </p>
                  </div>
                ) : isStructureGraspIntroSlide ? (
                  <div className="flex h-full flex-col justify-center px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <div className="text-center">
                      <h4 className="text-[1.5rem] font-black leading-tight md:text-[1.95rem]">
                        構造の把握
                      </h4>
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                      <p className="text-center text-2xl font-bold leading-relaxed text-slate-900 md:text-4xl">
                        ズレは原因ではなく
                        <br />
                        <span className="text-slate-800">条件の不足として</span>
                        <br />
                        見れないか？
                      </p>
                    </div>
                  </div>
                ) : isSrplIntroSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-9 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.45rem] font-black leading-tight md:text-[1.9rem]">
                        構造の提示（SRPL）
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        人の体験は、4つの条件で整理できる
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:gap-4">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                          <p className="text-lg font-black text-slate-900 md:text-xl">S：安全</p>
                          <p className="mt-1 text-xs font-semibold text-slate-600 md:text-sm">Safety</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                          <p className="text-lg font-black text-slate-900 md:text-xl">R：尊厳</p>
                          <p className="mt-1 text-xs font-semibold text-slate-600 md:text-sm">Respect</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                          <p className="text-lg font-black text-slate-900 md:text-xl">P：見通し</p>
                          <p className="mt-1 text-xs font-semibold text-slate-600 md:text-sm">Perspective</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center">
                          <p className="text-lg font-black text-slate-900 md:text-xl">L：役割</p>
                          <p className="mt-1 text-xs font-semibold text-slate-600 md:text-sm">Role</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-relaxed text-slate-600 md:text-sm">
                      ズレは、これらの“どこかの不足”として見れる
                    </p>
                  </div>
                ) : isPlacementGraspSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-9 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.45rem] font-black leading-tight md:text-[1.9rem]">
                        配置の把握
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        ズレは、SRPLの不足の組み合わせとして見れる
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex w-full max-w-4xl items-center justify-between gap-6">
                        <div className="flex-1 text-center">
                          <p className="text-lg font-black text-slate-900 md:text-2xl">ズレ ＝</p>
                          <p className="mt-2 text-sm font-bold leading-relaxed text-slate-800 md:text-lg">
                            複数の条件の不足の重なり
                          </p>
                          <p className="mt-3 text-xs font-semibold text-slate-600 md:text-sm">
                            例：P（見通し）＋ L（役割）
                          </p>
                        </div>

                        <div className="relative h-44 w-44 shrink-0 rounded-full border-2 border-slate-300 md:h-52 md:w-52">
                          <div className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 md:text-xs">S</div>
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 md:text-xs">R</div>
                          <div className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-200/70 px-2 py-1 text-[10px] font-bold text-slate-500 md:text-xs">P</div>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-slate-200/70 px-2 py-1 text-[10px] font-bold text-slate-500 md:text-xs">L</div>
                          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isPlacementConclusionSlide ? (
                  <div className="relative flex h-full flex-col items-center justify-center px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="relative h-52 w-52 rounded-full border border-slate-400">
                        <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[10px] font-bold text-slate-500">S</span>
                        <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">R</span>
                        <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">P</span>
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500">L</span>
                      </div>
                    </div>
                    <p className="text-center text-2xl font-bold leading-relaxed text-slate-900 md:text-4xl">
                      ズレは原因ではなく
                      <br />
                      <span className="text-slate-800">SRPLの未充足条件の</span>
                      <br />
                      配置として捉えられる
                    </p>
                    <p className="mt-6 text-center text-[11px] font-semibold tracking-wide text-slate-500 md:text-xs">
                      観測 → 構造 → 配置 → 理解
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-slate-500">{slide.id}</p>
                    <h4 className="mt-1 text-2xl font-black leading-tight">{slide.title}</h4>
                    <p className="mt-1 text-xs text-slate-600">{slide.subtitle}</p>

                    <div className="mt-4 grid gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Slide Notes
                      </p>
                      {slide.reactBody.map((text, index) => (
                        <div key={`${slide.id}-${index}`} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-[10px] font-bold text-slate-400">NOTE {index + 1}</p>
                          <p className="mt-1 text-xs font-semibold leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-lg bg-slate-100 p-3 text-slate-900 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Key Message</p>
                      <p className="mt-1 text-sm font-bold leading-relaxed">{slide.point}</p>
                    </div>
                  </>
                )}
              </div>
              </div>
              )}
            </div>
            )}

            {showCharacter && (
            <div className="flex min-h-0 flex-col rounded-xl border border-amber-300/20 bg-slate-900 p-3 transition">
              <div className="mb-1 shrink-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300">Character Slide</p>
                <h3 className="text-sm font-bold">キャラ版・体験層</h3>
              </div>

              <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 bg-slate-800 p-2 text-center">
                <div className="aspect-[16/9] w-full flex items-center justify-center rounded-lg overflow-hidden bg-slate-900 p-4">
                  {!hasImageError ? (
                    <img
                      key={slide.id}
                      src={characterImageSrc}
                      alt="character slide"
                      className="h-full w-full max-h-full max-w-full object-contain"
                      onLoad={() =>
                        setImageLoadError((prev) => ({ ...prev, [slide.id]: false }))
                      }
                      onError={(e) => {
                        if (isObservationFrameSlide && e.currentTarget.dataset.fallbackApplied !== "true") {
                          e.currentTarget.dataset.fallbackApplied = "true";
                          e.currentTarget.src = "/assets/slides/characters/05.png";
                          return;
                        }
                        setImageLoadError((prev) => ({ ...prev, [slide.id]: true }));
                      }}
                    />
                  ) : (
                    <>
                      <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">🎭</div>
                      <p className="mt-2 text-xs font-semibold text-slate-300">キャラ版画像は未設定です</p>
                      <p className="mt-1 font-mono text-[10px] text-cyan-200">/assets/slides/characters/{slide.id}.png</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            )}
          </section>

          <footer className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mt-2 rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <p className="text-xs font-bold tracking-[0.2em] text-white">
                見てほしいポイント
              </p>

              <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-4">
                {viewingPoints.map((point) => (
                  <div key={point.title} className="relative min-h-[74px] rounded-lg border border-white/10 bg-white/5 p-2.5">
                    <span className={`absolute left-2 top-2 h-2 w-2 rounded-full ${point.dotClass}`} />
                    <p className="pl-3 text-xs font-semibold text-white">{point.title}</p>
                    <p className="mt-1 pl-3 line-clamp-2 text-[10px] leading-snug text-slate-300">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
