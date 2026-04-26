import { useEffect, useMemo, useRef, useState } from "react";

type RoleKey = "core" | "navi" | "sora" | "codex";
type ViewMode = "normal" | "character" | "hybrid";

type RoleContent = Partial<Record<RoleKey, string>>;

type Slide = {
  id: string;
  group: string;
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

const groups = [
  "Cover",
  "Opening",
  "Core Concept",
  "Structure",
  "Filters",
  "Case",
  "DATA",
  "Conclusion",
] as const;

const dataTemplateTokens = {
  frameClass: "h-full w-full px-10 py-10 md:px-12 md:py-12",
  columnClass: "flex h-full min-w-[360px] max-w-[520px] flex-col justify-center",
  headerSlotClass: "shrink-0",
  mainMessageSlotClass: "w-full min-w-0",
};

const dataTypographyTokens = {
  titleClass: "text-[22px] md:text-[25px] font-bold leading-[1.22] tracking-[-0.01em] text-slate-900",
  mainClass: "mt-2 w-full whitespace-normal break-normal text-[1.7rem] font-extrabold leading-[1.2] tracking-[-0.02em] text-slate-950 md:text-[2.1rem]",
};
const reactSlideScaleClass = "origin-top scale-[0.9] md:scale-100";
const tightMobileFrameClass = "h-full w-full px-5 py-5 md:px-12 md:py-12";

type MagazineCopy = {
  title: string;
  lead: string;
  main: [string, string];
};

const magazineCopyBySlideId: Record<string, MagazineCopy> = {
  "00": { title: "ナラティブは、構造になる", lead: "感じたことを、そのままにしない", main: ["ナラティブは、", "構造として扱える。"] },
  "01": { title: "同じではない", lead: "見えているのに", main: ["同じに見えても、", "同じではない。"] },
  "02": { title: "扱えない理由", lead: "問題は価値ではない", main: ["構造化されていないと、", "扱えない。"] },
  "03": { title: "構造として読めるか", lead: "問いを立てる", main: ["ナラティブは、", "構造として読めるのか。"] },
  "04": { title: "観測を設計する", lead: "同じ条件で見る", main: ["条件を固定すれば、", "比較できる。"] },
  "05-01": { title: "条件を決める", lead: "何を見るか", main: ["条件が決まると、", "見える。"] },
  "05-02": { title: "見える形にする", lead: "そのままでは見えない", main: ["記述は、", "観測可能になる。"] },
  "05-03": { title: "使える状態", lead: "見えるだけでは足りない", main: ["比較・再現・分析が、", "できる。"] },
  "05-04": { title: "観測は成立した", lead: "条件と可視化", main: ["ナラティブは、", "扱える。"] },
  "06-01": { title: "原因ではない", lead: "見方を変える", main: ["ズレは、", "条件不足として現れる。"] },
  "06-02": { title: "構造で読む", lead: "どこで起きるか", main: ["ズレは、", "構造の中にある。"] },
  "06-03": { title: "重なりとして見る", lead: "ひとつではない", main: ["ズレは、", "条件の重なりである。"] },
  "06-04": { title: "ズレは配置", lead: "見え方が変わる", main: ["ズレは、", "配置である。"] },
  "07-01": { title: "同じではない", lead: "見ているのに", main: ["同じに見えても、", "同じではない。"] },
  "07-02": { title: "どう変わるか", lead: "もう一つの見方", main: ["ズレは、", "強さと時間で変わる。"] },
  "07-03": { title: "ここで変わる", lead: "連続ではない", main: ["変化は、", "ある点で起きる。"] },
  "07-04": { title: "変化のかたち", lead: "気づいたこと", main: ["ズレは、", "ここで変わる。"] },
  "08-01": { title: "なぜ起きるのか", lead: "原因を見る", main: ["ズレの原因は、", "接点にある。"] },
  "08-02": { title: "欠けているもの", lead: "見えてきた", main: ["ズレは、", "欠損で起きる。"] },
  "08-03": { title: "欠け方の型", lead: "ばらばらではない", main: ["欠損は、", "パターンになる。"] },
  "08-04": { title: "原因はひとつ", lead: "まとめると", main: ["ズレの原因は、", "接点の欠損である。"] },
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
  const group = resolveSlideGroup(id);
  return {
    id,
    group,
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

function resolveSlideGroup(id: string): (typeof groups)[number] {
  if (id === "00") return "Cover";
  if (id === "01" || id === "02") return "Opening";
  if (id === "03" || id === "04") return "Core Concept";
  if (id.startsWith("06") || id.startsWith("07")) return "Structure";
  if (id.startsWith("05") || id.startsWith("08-")) return "Filters";
  if (id.startsWith("CASE") || id.startsWith("09")) return "Case";
  if (id.startsWith("DATA") || id === "08-DATA") return "DATA";
  return "Conclusion";
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
  makeSlide("05-02", "02｜Observation", "下層ページ", "観測フレーム", "条件を通すことで、ナラティブは見える", "フィルターを通すことで、ナラティブは見える。", ["ナラティブ", "フィルター（観測条件）", "見える", "構造 / 変異 / 欠損"]),
  makeSlide("05-03", "02｜Observation", "下層ページ", "フィルターの意味", "見える状態は、比較・再現・分析に使える", "見える状態は、比較・再現・分析に使える。", ["比較できる", "再現できる", "分析できる"]),
  makeSlide("05-04", "02｜Observation", "下層ページ", "観測設計のまとめ", "05章結論：条件→見える→使えるを統合する", "ナラティブは、条件→見える→使えるの統合で記述可能になる。", ["05-01 条件を決める", "05-02 見える", "05-03 使える"]),
  makeSlide("06-01", "02｜Observation", "下層ページ", "構造の把握", "ズレの見方を、原因から条件へ切り替える", "ズレを原因から切り離し、未充足条件として読む入口をつくる。", ["ズレは原因ではなく", "未充足条件として", "読めないか。"]),
  makeSlide("06-02", "02｜Observation", "下層ページ", "構造の提示（SRPL）", "人の体験は、4つの未充足条件で整理できる", "ズレは、SRPLの未充足条件として読める。", ["S：安全（Safety）", "R：尊厳（Respect）", "P：見通し（Perspective）", "L：役割（Role）"]),
  makeSlide("06-03", "02｜Observation", "下層ページ", "配置の把握", "ズレは、SRPL未充足条件の配置として読める", "原因ではなく、配置として読む。", ["ズレ ＝", "複数の未充足条件の重なり", "例：P（見通し）＋ L（役割）"]),
  makeSlide("06-04", "02｜Observation", "下層ページ", "理解の確定", "06章の結論を確定する", "ズレは原因ではなく、SRPLの未充足条件の配置である。", ["ズレは原因ではなく", "SRPLの未充足条件の", "配置である"]),
  makeSlide("06", "02｜Observation", "下層ページ", "構造の把握", "ズレを未充足条件として読む", "ズレは単一原因ではなく、SRPLの配置として観測される。", ["SRPLとして配置する。", "複数条件として読む。", "構造として観測する。"]),
  makeSlide("07-01", "02｜Observation", "下層ページ", "進行の把握", "基準フレーム", "同じに見えるが、同じではない。", ["同じに見えるが", "同じではない"]),
  makeSlide("07-02", "02｜Observation", "下層ページ", "進行の軸", "強さと時間で観測する", "進行は、強さと時間で見える。", ["進行は", "強さと時間で見える"], {
    core: "Figureを見て、観察軸を受け取る。",
    navi: "こう見ると、見えてきます",
    sora: "補助としてメモを取り、意味の接続を待つ。",
    codex: "07-01の延長として同一フレームで接続する。",
  }),
  makeSlide("07-03", "02｜Observation", "下層ページ", "転移の把握", "Trigger", "変化は連続ではなく転移する。", ["変化は", "連続ではなく", "転移する"], {
    core: "…ここか",
    navi: "指示を止め、観測を見守る。",
    sora: "背景で意味整理を支える。",
    codex: "同一空間で転移点のみを観測する。",
  }),
  makeSlide("07-04", "02｜Observation", "下層ページ", "言語化の確定", "気づきを言葉にする", "気づいたズレを、自分の言葉で確定する。", ["気づいたズレを", "自分の言葉で", "確定する"], {
    core: "ズレは、ある点で変わる。",
    navi: "観測軸を再確認する。",
    sora: "意味を言葉にして共有する。",
    codex: "章の理解を次章へ接続する。",
  }),
  makeSlide("08-01", "02｜Observation", "下層ページ", "欠損の把握①", "APCE_Missとして原因を特定する", "ズレの原因は、接点欠損（APCE_Miss）として特定できる。", ["ズレの原因を", "接点欠損として", "特定する"]),
  makeSlide("08-02", "02｜Observation", "下層ページ", "欠損の把握②", "A（認識）欠損の具体例", "1つのAPCE_Missを具体例で捉え、原因特定の感覚をつかむ。", ["A（認識）が欠けると", "行動がズレ", "結果にズレが生じる"]),
  makeSlide("08-03", "02｜Observation", "下層ページ", "欠損の把握③", "APCE_Missの4パターン整理", "欠ける接点によってズレ方は変わる。", ["A_Miss", "P_Miss", "C_Miss", "E_Miss"]),
  makeSlide("08-04", "02｜Observation", "下層ページ", "欠損の把握④", "結論：ズレの原因は接点欠損", "すべてのズレは、どこかの接点欠損として説明できる。", ["ズレの原因は", "接点の欠損", "（APCE_Miss）"]),
  makeSlide("DATA-01", "DATA｜302 Analysis", "DATA", "DATA｜構造", "Structure", "302件の分析でも、構造は組み合わせとして現れた", ["302件の分析でも、", "構造は組み合わせとして現れた"]),
  makeSlide("DATA-02", "DATA｜302 Analysis", "DATA", "DATA｜変異", "Variation", "ズレは進行し、ある点で変わる", ["ズレは進行し、", "ある点で変わる"]),
  makeSlide("DATA-03", "DATA｜302 Analysis", "DATA", "DATA｜欠損", "Missing", "欠損は、組み合わせで起きる", ["欠損は、", "組み合わせで起きる"]),
  makeSlide("CASE-01", "CASE STUDY", "CASE", "CASE 01 ｜ 初期状態", "まだ臨界ではないケース", "この状態なら、介入で進行を止められる。", ["ズレは、", "条件不足として現れる。"]),
  makeSlide("CASE-02", "CASE STUDY", "CASE", "CASE 02 ｜ 継続ズレ", "継続ズレ", "この段階では、介入しないと臨界へ進む。", ["ズレは継続し、", "関係の中に残り続ける。"]),
  makeSlide("CASE-03", "CASE STUDY", "CASE", "CASE 03｜臨界転移", "臨界転移", "この段階では、即時介入が必要。", ["ズレは臨界に達し、", "関係は転移した。"]),
  makeSlide("CASE-COMPARE", "CASE STUDY", "CASE", "CASE比較", "構造差分", "比較すると、介入の優先順位が見える。", ["ズレは進行し、", "ある点で転移する。"]),
  makeSlide("INSIGHT-01", "INSIGHT & DESIGN", "INSIGHT", "INSIGHT", "まだ、答えは決まっていない。", "関係は、変えていけるのかもしれない。", ["でも、", "ここから広がる。"]),
  makeSlide("DESIGN-01", "INSIGHT & DESIGN", "DESIGN", "DESIGN", "集まった声は、まだ形になっていない。", "把握することで、次が見える。", ["でも、", "すでに、何かが見える。"]),
  makeSlide("DESIGN-03", "INSIGHT & DESIGN", "DESIGN", "DESIGN", "見えてきた構造を、現場で試す。", "DEMO版を通じて、次の一手が見えてくる。", ["この構造は、", "現場で磨かれていく。"]),
  makeSlide("FUTURE-01", "INSIGHT & DESIGN", "FUTURE", "FUTURE", "一つひとつの関係が、", "", ["未来を変える。"]),
  makeSlide("08-DATA", "DATA｜302 Analysis", "DATA", "DATA｜302件ナラティブ分析結果", "構造・変異・欠損の実測分布", "302件の患者ナラティブは、構造・変異・欠損として定量的に把握可能である。", ["Δ分布：Δ2・Δ3が中核", "Trigger：転換点の有無を把握", "APCE：欠損構造から介入入口を特定"], { core: "302件が土台", navi: "観測可能性の根拠", sora: "数字ではなく構造を伝える", codex: "CSV結果をUIに接続" }),
  makeSlide("09", "03｜Cases", "下層ページ", "ナラティブは構造・変異・欠損として記述可能", "次に個別事例で確認する", "ナラティブは、比較可能な観測枠組みとして扱える。", ["構造として把握。", "変異として観測。", "欠損として特定。"]),
  makeSlide("09b", "03｜Cases", "下層ページ", "CASE①：不満化ケース", "CONTEXTとフィルターで読む", "フィルターにより、不満化したナラティブを分解できる。", ["文脈を整理する。", "変異として観測する。", "欠損として特定する。"]),
  makeSlide("09c", "03｜Cases", "下層ページ", "CASE②：継続ズレケース", "CONTEXTとフィルターで読む", "転換前の継続的な不安も、同じ観測フレームで把握できる。", ["文脈を整理する。", "配置として読む。", "欠損として特定する。"]),
  makeSlide("09d", "03｜Cases", "下層ページ", "CASE③：臨界局面ケース", "医学的状況と関係のズレを同時に読む", "臨界局面でも、関係のズレは構造として分解できる。", ["文脈を整理する。", "変異として観測する。", "欠損として特定する。"]),
  makeSlide("10", "04｜Implementation", "下層ページ", "可能性への転換", "関係の状態にどこまで介入可能かを考える", "構造把握から、予防的介入の可能性へ転換する。", ["ACE-Xへ接続。", "RA-SSへ接続。", "実践可能性へ展開。"]),
  makeSlide("11", "04｜Implementation", "下層ページ", "ACE-X：予防的介入への機能拡張", "関係の状態に働きかける接点行為の設計", "観測された構造から、接点で作用しうる行為を導出する。", ["介入可能性を抽出する。", "行為として実装する。", "環境で成立させる。"]),
  makeSlide("12", "04｜Implementation", "下層ページ", "RA-SS：現場への最適化", "関係状態の観測と接点運用をつなぐ", "観測・判断・介入を現場で循環させるPoCへ接続する。", ["接点で扱うPoC。", "Trigger前を把握する。", "予防的介入を検討する。"]),
  makeSlide("13", "05｜Conclusion", "結論", "結論", "広報は、情報伝達ではなく関係の状態に働きかける営みである", "病院広報は、関係を扱う領域として再定義される。", ["ナラティブは構造として記述しうる。", "広報は関係状態に働きかけている。", "ACE-XとRA-SSにより接点設計へ接続される。"]),
];

const PUBLIC_VISIBLE_SLIDE_LIMIT = 33;
const PUBLIC_HIDDEN_SLIDE_IDS = new Set([
  "06",
  "07-02",
]);

const indexGroups: IndexGroup[] = [
  { label: "00 Cover", note: "導入", ids: ["00"] },
  { label: "01 Opening", note: "導入", ids: ["01", "02"] },
  { label: "02 Observation", note: "問い", ids: ["03"] },
  { label: "03 Structure", note: "観測設計", ids: ["04", "05-01", "05-02", "05-03", "05-04"] },
  { label: "04 Variation", note: "構造把握", ids: ["06-01", "06-02", "06-03", "06-04"] },
  { label: "05 Missing", note: "進行の把握", ids: ["07-01", "07-02", "07-03", "07-04"] },
  { label: "06 DATA", note: "証明", ids: ["DATA-01", "DATA-02", "DATA-03"] },
  { label: "07 CASE STUDY", note: "統合ケース", ids: ["CASE-01", "CASE-02", "CASE-03", "CASE-COMPARE"] },
  { label: "08 INSIGHT & DESIGN", note: "統合", ids: ["INSIGHT-01", "DESIGN-01", "DESIGN-03", "FUTURE-01"] },
];

const navDisplayBySlideId: Record<string, string> = {
  "INSIGHT-01": "INSIGHT",
  "DESIGN-01": "DESIGN（見える）",
  "DESIGN-03": "DESIGN（現場で磨く）",
  "FUTURE-01": "FUTURE",
  "09": "INSIGHT",
  "11": "DESIGN-ACE-X",
  "12": "DESIGN-RA-SS",
  "13": "FUTURE",
  "CASE-COMPARE": "CASE比較",
};

export default function RASSHybridSlides() {
  const [activeSlide, setActiveSlide] = useState(slides[0].id);
  const [mode, setMode] = useState<ViewMode>("hybrid");
  const [openGroup, setOpenGroup] = useState("00 Cover");
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((group) => [group, group === "Cover"])) as Record<string, boolean>
  );
  const swipeAreaRef = useRef<HTMLElement | null>(null);
  const touchStartPointRef = useRef<{ x: number; y: number } | null>(null);
  const hasSlideChangedRef = useRef(false);

  const visibleSlides = useMemo(
    () =>
      slides.filter(
        (slideItem, index) =>
          index < PUBLIC_VISIBLE_SLIDE_LIMIT && !PUBLIC_HIDDEN_SLIDE_IDS.has(slideItem.id)
      ),
    []
  );
  const visibleSlideIds = useMemo(() => new Set(visibleSlides.map((item) => item.id)), [visibleSlides]);
  const visibleIndexGroups = useMemo(
    () =>
      indexGroups
        .map((group) => ({
          ...group,
          ids: group.ids.filter((id) => visibleSlideIds.has(id)),
        }))
        .filter((group) => group.ids.length > 0),
    [visibleSlideIds]
  );

  const slide = useMemo(
    () => visibleSlides.find((s) => s.id === activeSlide) ?? visibleSlides[0],
    [activeSlide, visibleSlides]
  );
  const currentSlideGroup = slide.group;
  const activeSlideIndex = useMemo(
    () => Math.max(0, visibleSlides.findIndex((s) => s.id === activeSlide)),
    [activeSlide, visibleSlides]
  );
  const totalSlides = visibleSlides.length;
  const currentSlideLabel = String(activeSlideIndex + 1).padStart(2, "0");
  const totalSlidesLabel = String(totalSlides).padStart(2, "0");
  const slidesByGroup = useMemo(
    () =>
      groups.map((group) => ({
        group,
        items: visibleSlides.filter((item) => item.group === group),
      })),
    [visibleSlides]
  );

  useEffect(() => {
    if (!visibleSlideIds.has(activeSlide)) {
      setActiveSlide(visibleSlides[0].id);
    }
  }, [activeSlide, visibleSlideIds, visibleSlides]);

  useEffect(() => {
    setOpenMobileGroups((prev) =>
      prev[currentSlideGroup] ? prev : { ...prev, [currentSlideGroup]: true }
    );
  }, [currentSlideGroup]);

  useEffect(() => {
    if (!hasSlideChangedRef.current) {
      hasSlideChangedRef.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSlide]);

  const showReact = mode === "normal" || mode === "hybrid";
  const showCharacter = mode === "character" || mode === "hybrid";
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
  const isStructureSummarySlide = slide.id === "06";
  const isSrplIntroSlide = slide.id === "06-02";
  const isPlacementGraspSlide = slide.id === "06-03";
  const isPlacementConclusionSlide = slide.id === "06-04";
  const isProgressionShiftSlide = slide.id === "07-01";
  const isProgressionAxisSlide = slide.id === "07-02";
  const isProgressionTriggerSlide = slide.id === "07-03";
  const isProgressionLanguageSlide = slide.id === "07-04";
  const isDataStructureSlide = slide.id === "DATA-01";
  const isDataVariationSlide = slide.id === "DATA-02";
  const isDataMissingSlide = slide.id === "DATA-03";
  const isCaseStudy01Slide = slide.id === "CASE-01";
  const isCaseStudy02Slide = slide.id === "CASE-02";
  const isCaseStudy03Slide = slide.id === "CASE-03";
  const isCaseStudyCompareSlide = slide.id === "CASE-COMPARE";
  const isInsightDesign01Slide = slide.id === "INSIGHT-01";
  const isDesign01Slide = slide.id === "DESIGN-01";
  const isDesign03Slide = slide.id === "DESIGN-03";
  const isFuture01Slide = slide.id === "FUTURE-01";
  const isInsightDesignPairSlide = isInsightDesign01Slide || isDesign01Slide || isDesign03Slide || isFuture01Slide;
  const isOpeningPhaseShiftSlide = slide.id === "01";
  const isObservationPhaseShiftSlide = slide.id === "04";
  const structuredTitleLabelBySlideId: Record<string, string> = {
    "05-01": "05｜FILTER",
    "05-02": "05｜FILTER",
    "05-03": "05｜FILTER",
    "05-04": "05｜FILTER",
    "06-01": "06｜STRUCTURE",
    "06-02": "06｜STRUCTURE",
    "06-03": "06｜STRUCTURE",
    "06-04": "06｜STRUCTURE",
    "07-01": "07｜VARIATION",
    "07-02": "07｜VARIATION",
    "07-03": "07｜VARIATION",
    "07-04": "07｜VARIATION",
    "08-01": "08｜MISSING",
    "08-02": "08｜MISSING",
    "08-03": "08｜MISSING",
    "08-04": "08｜MISSING",
  };
  const structuredTitleLabel = structuredTitleLabelBySlideId[slide.id];
  const phaseLabelBySlideId: Record<string, string> = {
    "01": "OPENING",
    "02": "PROBLEM",
    "03": "QUESTION",
  };
  const phaseLabel = phaseLabelBySlideId[slide.id];
  const isFilterStructuredLabelSlide = ["05-01", "05-02", "05-03", "05-04"].includes(slide.id);
  const isMagazineTemplateSlide = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05-01",
    "05-02",
    "05-03",
    "05-04",
    "06-01",
    "06-02",
    "06-03",
    "06-04",
    "07-01",
    "07-02",
    "07-03",
    "07-04",
    "08-01",
    "08-02",
    "08-03",
    "08-04",
  ].includes(slide.id);
  const magazineCopy = magazineCopyBySlideId[slide.id];
  const characterImageSrc = isCoverSlide
    ? "/assets/slides/characters/00.png"
    : isDataStructureSlide
      ? "/assets/slides/data/data-structure.png"
    : isDataVariationSlide
      ? "/assets/slides/data/data-variation.png"
    : isDataMissingSlide
      ? "/assets/slides/data/data-missing.png"
    : isCaseStudy01Slide
      ? "/assets/slides/case/case-01.png"
    : isCaseStudy02Slide
      ? "/assets/slides/case/case-02.png"
    : isCaseStudy03Slide
      ? "/assets/slides/case/case-03.png"
    : isCaseStudyCompareSlide
      ? "/assets/slides/case/case-comparison.png"
    : isInsightDesign01Slide
      ? "/assets/slides/insight-design/insight-01.png"
    : isDesign01Slide
      ? "/assets/slides/insight-design/design-01.png"
    : isDesign03Slide
      ? "/assets/slides/insight-design/design-03.png"
    : isFuture01Slide
      ? "/assets/slides/insight-design/future-01.png"
    : isObservationFrameSlide
      ? "/assets/slides/characters/05-02.png"
    : isProgressionShiftSlide
        ? "/assets/slides/characters/07-01.png"
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
  const viewingPointsForProgressionShift: ViewingPoint[] = [
    {
      title: "CORE｜静かな観察",
      description: "…同じ状態ではない？",
      dotClass: "bg-rose-300/90",
    },
  ];
  const viewingPointsForProgressionAxis: ViewingPoint[] = [
    {
      title: "Figure｜Δ×e",
      description: "ノート／画面上の軸で進行を捉える",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "NAVI｜構造ナビ",
      description: "こう見ると、見えてきます",
      dotClass: "bg-blue-300/90",
    },
    {
      title: "CORE｜観察者",
      description: "Figureを見て受け取る",
      dotClass: "bg-rose-300/90",
    },
  ];
  const viewingPointsForProgressionTrigger: ViewingPoint[] = [
    {
      title: "Figure｜Trigger点",
      description: "ノート上で、連続の中に転移点が現れる",
      dotClass: "bg-cyan-300/90",
    },
    {
      title: "CORE｜焦点",
      description: "…ここか",
      dotClass: "bg-rose-300/90",
    },
  ];
  const viewingPointsForProgressionLanguage: ViewingPoint[] = [
    {
      title: "CORE｜言語化",
      description: "ズレは、ある点で変わる",
      dotClass: "bg-rose-300/90",
    },
  ];
  const viewingPointsForCoreObservation: ViewingPoint[] = [
    {
      title: "CORE｜64歳の観測",
      description: "重心を低く保ち、原因ではなく未充足条件の配置として読む",
      dotClass: "bg-rose-300/90",
    },
  ];
  const isFilterSrplSlide =
    isFilterSetupSlide ||
    isObservationFrameSlide ||
    isFilterMeaningSlide ||
    isFilterIntegrationSlide ||
    isStructureGraspIntroSlide ||
    isSrplIntroSlide ||
    isPlacementGraspSlide ||
    isPlacementConclusionSlide;
  const viewingPoints = isIntroSlide
    ? viewingPointsForIntro
    : isProblemSlide
      ? viewingPointsForProblem
      : isHypothesisSlide
        ? viewingPointsForHypothesis
        : isProgressionShiftSlide
          ? viewingPointsForProgressionShift
        : isProgressionAxisSlide
          ? viewingPointsForProgressionAxis
        : isProgressionTriggerSlide
          ? viewingPointsForProgressionTrigger
        : isProgressionLanguageSlide
          ? viewingPointsForProgressionLanguage
        : isFilterSrplSlide
          ? viewingPointsForCoreObservation
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

  const moveToSlide = (index: number) => {
    if (index < 0 || index >= visibleSlides.length) return;
    setActiveSlide(visibleSlides[index].id);
  };

  const goPrevSlide = () => {
    moveToSlide(activeSlideIndex - 1);
  };

  const goNextSlide = () => {
    moveToSlide(activeSlideIndex + 1);
  };

  const toggleMobileGroup = (group: string) => {
    setOpenMobileGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isEditable =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        !!target?.isContentEditable;
      if (isEditable) return;

      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveToSlide(activeSlideIndex + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveToSlide(activeSlideIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlideIndex]);

  useEffect(() => {
    const swipeArea = swipeAreaRef.current;
    if (!swipeArea) return;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      touchStartPointRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isMenuOpen) return;
      const start = touchStartPointRef.current;
      touchStartPointRef.current = null;
      if (!start || event.changedTouches.length === 0) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      if (deltaX < 0) {
        moveToSlide(activeSlideIndex + 1);
      } else {
        moveToSlide(activeSlideIndex - 1);
      }
    };

    swipeArea.addEventListener("touchstart", handleTouchStart, { passive: true });
    swipeArea.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      swipeArea.removeEventListener("touchstart", handleTouchStart);
      swipeArea.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSlideIndex, isMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-950 p-3 text-slate-100 md:p-4">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-3 shadow-2xl md:aspect-video md:flex-row">
        <aside className="hidden max-h-[42vh] w-full shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 md:flex md:h-full md:max-h-none md:w-[250px]">
          <div className="mb-4 shrink-0">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">RA-SS</p>
            <h1 className="mt-2 text-lg font-black leading-tight">病院広報工房</h1>
                <p className="mt-2 text-xs leading-snug text-slate-300">
                  React正本とキャラ版を統合するハイブリッド型スライド。
                </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="space-y-2">
              {visibleIndexGroups.map((group) => {
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
                        <p className={`text-xs font-semibold ${activeGroup ? "text-white" : "text-cyan-200"}`}>{group.label}</p>
                        <span className="text-[10px] text-slate-500">{isOpen ? "▲" : "▼"}</span>
                      </div>
                      <p className="mt-1 line-clamp-1 text-[10px] text-slate-500">{group.note}</p>
                    </button>

                    {isOpen && (
                      <div className="mt-2 max-h-[34vh] space-y-1 overflow-y-auto pr-1">
                        {group.ids.map((id) => {
                          const target = visibleSlides.find((s) => s.id === id);
                          if (!target) return null;
                          return (
                            <button
                              key={id}
                              onClick={() => setActiveSlide(id)}
                              className={`w-full rounded-lg border-l border-white/10 pl-4 pr-2 py-2 text-left transition ${
                                activeSlide === id ? "bg-white/20 text-white" : "text-slate-400 hover:bg-white/10 hover:text-slate-200"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium">{navDisplayBySlideId[target.id] ?? target.id}</span>
                                <span className="text-[10px] text-slate-500">{target.status}</span>
                              </div>
                              <p className="mt-1 line-clamp-2 text-[11px] font-normal leading-snug">{target.title}</p>
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

        </aside>

        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <header className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white"
                aria-label={isMenuOpen ? "スライド一覧を閉じる" : "スライド一覧を開く"}
              >
                ☰
              </button>
              <p className="flex-1 text-center text-sm font-semibold text-cyan-300">
                {currentSlideLabel} / {totalSlidesLabel}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrevSlide}
                  disabled={activeSlideIndex === 0}
                  className="min-h-11 rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  前へ
                </button>
                <button
                  type="button"
                  onClick={goNextSlide}
                  disabled={activeSlideIndex >= totalSlides - 1}
                  className="min-h-11 rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  次へ
                </button>
              </div>
            </div>

            {isMenuOpen ? (
              <div className="mt-3 max-h-[38vh] overflow-y-auto rounded-lg border border-white/10 bg-slate-900/80 p-2">
                <div className="space-y-2">
                  {slidesByGroup.map(({ group, items }) => {
                    if (items.length === 0) return null;
                    const isOpen = !!openMobileGroups[group];
                    const isCurrentGroup = currentSlideGroup === group;
                    return (
                      <div key={group} className="rounded-md border border-white/10 bg-black/20">
                        <button
                          type="button"
                          onClick={() => toggleMobileGroup(group)}
                          className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs font-semibold ${
                            isCurrentGroup ? "text-cyan-200" : "text-slate-200"
                          }`}
                        >
                          <span>{group}</span>
                          <span className="text-[10px] text-slate-400">{isOpen ? "▲" : "▼"}</span>
                        </button>
                        {isOpen ? (
                          <div className="grid grid-cols-4 gap-2 border-t border-white/10 p-2">
                            {items.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setActiveSlide(item.id);
                                  setIsMenuOpen(false);
                                }}
                                className={`min-h-10 rounded-md border px-2 py-1 text-xs font-semibold ${
                                  activeSlide === item.id
                                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                                    : "border-white/20 bg-white/5 text-slate-200"
                                }`}
                              >
                                {item.id}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-2 min-w-0">
              <div className="flex min-w-0 items-center gap-2 text-xs text-slate-300">
                <span className="shrink-0 font-semibold text-cyan-300">{slide.id}</span>
                <span className="text-slate-500">|</span>
                <span className="truncate">{slide.chapter}</span>
                <span className="text-slate-500">|</span>
                <span className="shrink-0 text-slate-400">{slide.group}</span>
              </div>
              <p className="mt-1 truncate text-base font-bold tracking-tight text-white md:text-lg">
                {slide.title}
              </p>
            </div>
          </header>

          <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">View Mode</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "normal", label: "構造版" },
                  { key: "character", label: "キャラ版" },
                  { key: "hybrid", label: "両方" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMode(item.key as ViewMode)}
                    className={`rounded-lg px-3 py-2 text-center text-xs font-bold transition ${
                      mode === item.key ? "bg-white text-slate-950" : "bg-white/10 text-slate-300 hover:bg-white/15"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <section
            ref={(element) => {
              swipeAreaRef.current = element;
            }}
            className={`grid min-h-0 flex-1 gap-3 ${mode === "hybrid" ? (isInsightDesignPairSlide ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 lg:grid-cols-2") : "grid-cols-1"}`}
          >
            {showReact && (
            <div className={`react-structure-slide !space-y-2 !gap-2 flex min-h-0 flex-col rounded-xl border border-cyan-300/20 bg-slate-900 p-3 overflow-x-hidden [&_p]:max-w-full [&_p]:break-words [&_p]:whitespace-normal [&_p]:!text-[0.9rem] md:[&_p]:!text-[0.98rem] [&_p]:!leading-[1.2] [&_p]:!mt-1 [&_h1]:!mb-2 [&_h2]:!mb-1.5 [&_h4]:!mb-1.5 [&_p+p]:!mt-2 [&_.subtitle]:!mt-2 [&_.body]:!mt-3 [&_.card]:!p-4 [&_.card]:!space-y-2 ${mode === "hybrid" ? "order-2 opacity-95" : "order-1"}`}>
              <div className="mb-1 shrink-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-300">React Slide</p>
              </div>

              {/* Legacy branch note: these intro branches are currently unreachable because 01/04 are included in isMagazineTemplateSlide. */}
              {isIntroSlide && !isMagazineTemplateSlide ? (
                <div className="flex min-h-0 flex-1 items-center justify-center">
                  <div className={`mx-auto aspect-video w-full max-w-[960px] max-w-full max-h-[65vh] overflow-hidden ${reactSlideScaleClass} rounded-xl bg-white px-6 py-10 md:px-10 md:py-12`}>
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
                        <p className="mt-2 text-base font-medium leading-snug text-slate-700 md:text-lg">
                          302件の患者ナラティブを、
                          <br />
                          同一条件で読み直す。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isObservationIntroSlide && !isMagazineTemplateSlide ? (
                <div className="flex min-h-0 flex-1 items-center justify-center">
                  <div className={`mx-auto aspect-video w-full max-w-[960px] max-w-full max-h-[65vh] overflow-hidden ${reactSlideScaleClass} rounded-xl bg-white px-6 py-7 md:px-10 md:py-9`}>
                    <div className="flex h-full flex-col items-center justify-center text-center text-slate-900">
                      <h4 className="text-3xl font-black leading-tight md:text-4xl">
                        観測設計
                      </h4>
                      <p className="mt-4 text-base font-semibold text-slate-700 md:text-lg">
                        302件を、同一条件・同一フィルターで観測する
                      </p>

                      <div className="card mt-2 w-full max-w-4xl rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-4 md:px-4 md:py-4">
                        <div className="grid grid-cols-2 gap-3 text-left md:grid-cols-4 md:gap-4">
                          <p className="text-xs font-semibold leading-snug text-slate-700 md:text-sm">05 フィルターの採用</p>
                          <p className="text-xs font-semibold leading-snug text-slate-700 md:text-sm">06 構造の把握（SRPL）</p>
                          <p className="text-xs font-semibold leading-snug text-slate-700 md:text-sm">07 進行の把握</p>
                          <p className="text-xs font-semibold leading-snug text-slate-700 md:text-sm">08 欠損の把握（APCE_Miss）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <div className="min-h-0 flex flex-1 items-center justify-center">
              <div className={`card mx-auto aspect-video w-full max-w-[960px] max-w-full max-h-[65vh] min-h-0 ${reactSlideScaleClass} rounded-xl bg-white p-4 md:p-4 text-slate-950 ${isCoverSlide || isProblemSlide || isHypothesisSlide || isFilterSetupSlide || isObservationFrameSlide || isFilterMeaningSlide || isFilterIntegrationSlide || isStructureSummarySlide || isStructureGraspIntroSlide || isSrplIntroSlide || isPlacementGraspSlide || isPlacementConclusionSlide || isProgressionShiftSlide || isProgressionAxisSlide || isProgressionTriggerSlide || isProgressionLanguageSlide || isDataStructureSlide || isDataVariationSlide || isDataMissingSlide || isCaseStudy01Slide || isCaseStudy02Slide || isCaseStudy03Slide || isCaseStudyCompareSlide || isInsightDesign01Slide || isDesign01Slide || isDesign03Slide || isFuture01Slide ? "overflow-hidden" : "overflow-auto"}`}>
                {isCoverSlide ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="aspect-[16/9] w-full max-w-[820px] overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img
                        src="/assets/slides/cover/cover-01.png"
                        alt="RASS cover slide"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                ) : isMagazineTemplateSlide ? (
                  <div className={`${dataTemplateTokens.frameClass} text-slate-900`}>
                      <div className={`${dataTemplateTokens.columnClass} ${isObservationPhaseShiftSlide || isOpeningPhaseShiftSlide ? "pt-5" : ""}`}>
                        <div className={dataTemplateTokens.headerSlotClass}>
                          {phaseLabel ? (
                            <p className="text-xs md:text-sm font-semibold tracking-wide text-slate-400">
                              {phaseLabel}
                            </p>
                          ) : null}
                          {isObservationPhaseShiftSlide ? (
                            <p className="text-[11px] md:text-xs font-semibold tracking-[0.12em] text-slate-500">
                              OBSERVATION
                            </p>
                          ) : null}
                          {structuredTitleLabel ? (
                            <p className={isFilterStructuredLabelSlide ? "text-[10px] md:text-[11px] font-semibold tracking-[0.1em] text-slate-400" : "text-[11px] md:text-xs font-semibold tracking-[0.12em] text-slate-500"}>
                              {structuredTitleLabel}
                            </p>
                          ) : null}
                          <h4 className={structuredTitleLabel ? "mt-2 text-[20px] md:text-[22px] font-semibold leading-[1.22] tracking-[-0.01em] text-slate-900" : dataTypographyTokens.titleClass}>
                            {magazineCopy?.title}
                          </h4>
                          <div className={`w-full h-px my-4 ${isObservationPhaseShiftSlide || isOpeningPhaseShiftSlide ? "bg-slate-300" : "bg-slate-200"}`} />
                          <p className="mt-5 text-[14px] md:text-[16px] font-semibold leading-[1.3] text-slate-600">
                            {magazineCopy?.lead}
                          </p>
                        </div>
                        <div className={dataTemplateTokens.mainMessageSlotClass}>
                          <p className={dataTypographyTokens.mainClass}>
                            {magazineCopy?.main[0]}
                            <br />
                            {magazineCopy?.main[1]}
                          </p>
                        </div>
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

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
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

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
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
                      <p className="text-center text-lg font-bold leading-snug text-slate-900 md:text-2xl">
                        出来事を「知る」のではなく
                        <br />
                        観測するための条件を先に決める
                      </p>
                    </div>

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
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
                        条件を通すことで、ナラティブは見える
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex w-full max-w-4xl flex-col items-center gap-5 text-center">
                        <div className="flex w-full items-center justify-between gap-2 md:gap-4">
                          <p className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-black text-slate-900 md:text-base">ナラティブ</p>
                          <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                          <p className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-black text-slate-900 md:text-base">フィルター（観測条件）</p>
                          <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                          <p className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm font-black text-slate-900 md:text-base">見える</p>
                        </div>
                        <p className="text-xs font-semibold tracking-wide text-slate-500 md:text-sm">構造 / 変異 / 欠損</p>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
                      フィルターを通すことで、ナラティブは見える
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

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
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
                          <p className="mt-1 text-sm font-black leading-snug text-slate-900 md:text-base">見える</p>
                        </div>
                        <span className="shrink-0 text-lg font-black text-slate-400 md:text-xl">→</span>
                        <div className="flex min-h-[96px] flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-3 text-center">
                          <p className="text-xs font-bold text-slate-500 md:text-sm">05-03</p>
                          <p className="mt-1 text-sm font-black leading-snug text-slate-900 md:text-base">比較・再現・分析できる</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
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

                    <div className="mt-2 flex items-center justify-center">
                      <p className="text-center text-2xl font-bold leading-snug text-slate-900 md:text-4xl">
                        ズレは原因ではなく
                        <br />
                        <span className="text-slate-800">条件の不足として</span>
                        <br />
                        読めないか。
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

                    <p className="text-center text-xs font-medium leading-snug text-slate-600 md:text-sm">
                      ズレは、SRPLの未充足条件として読める
                    </p>
                  </div>
                ) : isPlacementGraspSlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-5 text-slate-900 md:px-9 md:py-7">
                    <div className="text-center">
                      <h4 className="text-[1.45rem] font-black leading-tight md:text-[1.9rem]">
                        配置の把握
                      </h4>
                      <p className="mt-3 text-sm font-semibold text-slate-700 md:text-base">
                        ズレは、SRPL未充足条件の配置として読める
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex w-full max-w-4xl items-center justify-between gap-2">
                        <div className="flex-1 text-center">
                          <p className="text-lg font-black text-slate-900 md:text-2xl">ズレ ＝</p>
                          <p className="mt-2 text-sm font-bold leading-snug text-slate-800 md:text-lg">
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
                    <p className="text-center text-2xl font-bold leading-snug text-slate-900 md:text-4xl">
                      ズレは原因ではなく
                      <br />
                      <span className="text-slate-800">SRPLの未充足条件の</span>
                      <br />
                      配置である
                    </p>
                    <p className="mt-6 text-center text-[11px] font-semibold tracking-wide text-slate-500 md:text-xs">
                      観測 → 構造 → 配置 → 理解
                    </p>
                  </div>
                ) : isStructureSummarySlide ? (
                  <div className="flex h-full flex-col justify-between px-6 py-6 text-slate-900 md:px-8 md:py-8">
                    <div className="text-center">
                      <h4 className="text-[1.4rem] md:text-[1.75rem] font-black leading-snug tracking-[-0.01em]">
                        構造の把握
                      </h4>
                      <p className="mt-3 text-xs md:text-sm font-semibold text-slate-700 leading-snug">
                        ズレを未充足条件として読む
                      </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="w-full max-w-xl space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                        {slide.reactBody.map((text, index) => (
                          <p key={`${slide.id}-summary-${index}`} className="text-sm md:text-base font-semibold leading-snug text-slate-800">
                            {text}
                          </p>
                        ))}
                      </div>
                    </div>

                    <p className="text-center text-xs md:text-sm font-medium leading-snug text-slate-600">
                      {slide.point}
                    </p>
                  </div>
                ) : isProgressionShiftSlide ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <p className="text-center text-3xl font-bold leading-snug text-slate-900 md:text-[3.6rem]">
                      同じに見えるが
                      <br />
                      同じではない
                    </p>
                  </div>
                ) : isProgressionAxisSlide ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <p className="text-center text-2xl font-bold leading-snug text-slate-900 md:text-4xl">
                      進行は
                      <br />
                      強さと時間で見える
                    </p>
                    <p className="mt-2 text-center text-xs font-semibold text-slate-500 md:text-sm">
                      Δ：強度　e：時間
                    </p>
                    <div className="mt-2 w-full max-w-[360px] md:mt-2 md:max-w-[420px]">
                      <div className="relative mx-auto h-32 w-full border-b-2 border-l-2 border-slate-300 md:h-36">
                        <span className="absolute -left-6 top-1 text-sm font-semibold text-slate-600">Δ</span>
                        <span className="absolute -bottom-6 right-1 text-sm font-semibold text-slate-600">e</span>
                        <svg
                          className="absolute inset-0 h-full w-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <polyline
                            points="8,88 24,82 40,74 56,65 72,53 90,40"
                            fill="none"
                            stroke="rgb(15 23 42 / 0.7)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : isProgressionTriggerSlide ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <p className="text-center text-2xl font-bold leading-snug text-slate-900 md:text-4xl">
                      変化は
                      <br />
                      連続ではなく
                      <br />
                      転移する
                    </p>
                    <p className="mt-3 text-center text-xs font-semibold tracking-wide text-slate-500 md:text-sm">
                      Trigger
                    </p>
                  </div>
                ) : isProgressionLanguageSlide ? (
                  <div className="flex h-full flex-col items-center justify-center px-6 py-6 text-slate-900 md:px-9 md:py-8">
                    <p className="text-center text-2xl font-bold leading-snug text-slate-900 md:text-4xl">
                      気づいたズレを
                      <br />
                      自分の言葉で
                      <br />
                      確定する
                    </p>
                  </div>
                ) : isDataStructureSlide ? (
                  <div className={`${tightMobileFrameClass} text-slate-900`}>
                    <div className={`${dataTemplateTokens.columnClass} max-w-[480px]`}>
                      <div className={dataTemplateTokens.headerSlotClass}>
                        <h4 className="text-xl md:text-2xl font-bold leading-snug tracking-[-0.01em] text-slate-900">DATA｜構造</h4>
                        <div className="w-full h-px bg-slate-200 my-4" />
                        <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                          SRPLは単独ではなく、重なりとして現れる
                        </p>
                      </div>
                      <div className={dataTemplateTokens.mainMessageSlotClass}>
                        <p className="mt-4 max-w-full whitespace-normal break-words text-[1.15rem] md:text-[1.45rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-slate-950">
                          構造は、
                          <br />
                          組み合わせとして現れた。
                        </p>
                      </div>
                    </div>
                  </div>
                ) : isDataVariationSlide ? (
                  <div className={`${tightMobileFrameClass} text-slate-900`}>
                    <div className={`${dataTemplateTokens.columnClass} max-w-[480px]`}>
                      <div className={dataTemplateTokens.headerSlotClass}>
                        <h4 className="text-xl md:text-2xl font-bold leading-snug tracking-[-0.01em] text-slate-900">DATA｜変異</h4>
                        <div className="w-full h-px bg-slate-200 my-4" />
                        <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                          Δ・e・Triggerで変化を確認
                        </p>
                      </div>
                      <div className={dataTemplateTokens.mainMessageSlotClass}>
                        <p className="mt-4 max-w-full whitespace-normal break-words text-[1.15rem] md:text-[1.45rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-slate-950">
                          ズレは進行し、
                          <br />
                          ある点で変わる。
                        </p>
                      </div>
                    </div>
                  </div>
                ) : isDataMissingSlide ? (
                  <div className={`${tightMobileFrameClass} text-slate-900`}>
                    <div className={`${dataTemplateTokens.columnClass} max-w-[480px]`}>
                      <div className={dataTemplateTokens.headerSlotClass}>
                        <h4 className="text-xl md:text-2xl font-bold leading-snug tracking-[-0.01em] text-slate-900">DATA｜欠損</h4>
                        <div className="w-full h-px bg-slate-200 my-4" />
                        <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                          APCE_Missの偏りを確認
                        </p>
                      </div>
                      <div className={dataTemplateTokens.mainMessageSlotClass}>
                        <p className="mt-4 max-w-full whitespace-normal break-words text-[1.15rem] md:text-[1.45rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-slate-950">
                          欠損は、
                          <br />
                          組み合わせで起きる。
                        </p>
                      </div>
                    </div>
                  </div>
                ) : isCaseStudy01Slide || isCaseStudy02Slide || isCaseStudy03Slide || isCaseStudyCompareSlide || isInsightDesign01Slide || isDesign01Slide || isDesign03Slide || isFuture01Slide ? (
                  <div className={`${isInsightDesignPairSlide ? "h-full w-full p-5 md:p-11" : tightMobileFrameClass} text-slate-900`}>
                    <div className={`${dataTemplateTokens.columnClass} max-w-[500px]`}>
                      <div className={dataTemplateTokens.headerSlotClass}>
                        <h4 className="text-[20px] md:text-[22px] font-semibold leading-[1.22] tracking-[-0.01em] text-slate-900">
                          {isFuture01Slide ? "FUTURE" : isDesign01Slide || isDesign03Slide ? "DESIGN" : isInsightDesign01Slide ? "INSIGHT" : isCaseStudyCompareSlide ? "CASE比較 ｜ 構造差分" : isCaseStudy03Slide ? "CASE 03 ｜ 臨界転移" : isCaseStudy02Slide ? "CASE 02 ｜ 継続ズレ" : "CASE 01 ｜ 初期状態"}
                        </h4>
                        <div className="w-full h-px bg-slate-200 my-4" />
                        {isInsightDesignPairSlide ? (
                          <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                            {isDesign01Slide ? (
                              <>
                                集まった声は、
                                <br />
                                まだ形になっていない。
                              </>
                            ) : isDesign03Slide ? (
                              <>
                                見えてきた構造を、
                                <br />
                                現場で試す。
                              </>
                            ) : isFuture01Slide ? (
                              <>一つひとつの関係が、</>
                            ) : (
                              <>まだ、答えは決まっていない。</>
                            )}
                          </p>
                        ) : null}
                      </div>
                      <div className={dataTemplateTokens.mainMessageSlotClass}>
                        <p className={`${isInsightDesignPairSlide ? "mt-4 max-w-full whitespace-normal break-words text-[1.18rem] md:text-[1.5rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-slate-950" : "mt-4 max-w-full whitespace-normal break-words text-[1.15rem] md:text-[1.45rem] font-extrabold leading-[1.28] tracking-[-0.02em] text-slate-950"}`}>
                          {isInsightDesignPairSlide ? (
                            <>
                              {isFuture01Slide ? (
                                <span className="block whitespace-nowrap">未来を変える。</span>
                              ) : isDesign03Slide ? (
                                <>
                                  <span className="block">この構造は、</span>
                                  <span className="block whitespace-nowrap">現場で磨かれていく。</span>
                                </>
                              ) : (
                                <>
                                  <span className="block">でも、</span>
                                  <span className="block whitespace-nowrap">{isDesign01Slide ? "すでに、何かが見える。" : "ここから広がる。"}</span>
                                </>
                              )}
                            </>
                          ) : isCaseStudyCompareSlide ? (
                            <>
                              <span className="block">ズレは進行し、</span>
                              <span className="block whitespace-nowrap">
                                ある点で<span className="font-black text-rose-700">転移する。</span>
                              </span>
                            </>
                          ) : isCaseStudy03Slide ? (
                            <>
                              <span className="block">ズレは臨界に達し、</span>
                              <span className="block whitespace-nowrap">関係は転移した。</span>
                            </>
                          ) : isCaseStudy02Slide ? (
                            <>
                              <span className="block">ズレは継続し、</span>
                              <span className="block whitespace-nowrap">関係の中に残り続ける。</span>
                            </>
                          ) : (
                            <>
                              <span className="block">ズレは、</span>
                              <span className="block whitespace-nowrap">条件不足として現れる。</span>
                            </>
                          )}
                        </p>
                        {!isInsightDesignPairSlide ? (
                          <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                            {isCaseStudyCompareSlide ? (
                              <>比較すると、介入の優先順位が見える。</>
                            ) : isCaseStudy03Slide ? (
                              <>
                                この段階では、
                                <br />
                                即時介入が必要。
                              </>
                            ) : isCaseStudy02Slide ? (
                              <>
                                このままでは、
                                <br />
                                臨界へ進む。
                              </>
                            ) : (
                              <>この状態なら、介入で進行を止められる。</>
                            )}
                          </p>
                        ) : isDesign01Slide ? (
                          <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                            <>
                              把握することで、
                              <br />
                              次が見える。
                            </>
                          </p>
                        ) : isDesign03Slide ? (
                          <p className="mt-3 max-w-full text-xs md:text-sm font-semibold leading-snug text-slate-600">
                            <>
                              DEMO版を通じて、
                              <br />
                              次の一手が見えてくる。
                            </>
                          </p>
                        ) : isFuture01Slide ? null : null}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-slate-500">{slide.id}</p>
                    <h4 className="mt-1 text-xl md:text-2xl font-black leading-snug">{slide.title}</h4>
                    <p className="mt-1 text-xs md:text-sm leading-snug text-slate-600">{slide.subtitle}</p>

                    <div className="mt-4 grid gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Slide Notes
                      </p>
                      {slide.reactBody.map((text, index) => (
                        <div key={`${slide.id}-${index}`} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-[10px] font-bold text-slate-400">NOTE {index + 1}</p>
                          <p className="mt-1 text-[11px] font-semibold leading-[1.3] md:text-xs">{text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-lg bg-slate-100 p-3 text-slate-900 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Key Message</p>
                      <p className="mt-1 text-xs font-bold leading-[1.3] md:text-sm">{slide.point}</p>
                    </div>
                  </>
                )}
              </div>
              </div>
              )}
            </div>
            )}

            {showCharacter && (
            <div className={`flex min-h-0 flex-col rounded-xl border border-amber-300/20 bg-slate-900 p-3 transition ${mode === "hybrid" ? "order-1" : "order-2"}`}>
              <div className="mb-0.5 shrink-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300">Character Slide</p>
              </div>

              <div className="flex min-h-0 flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 bg-slate-800 p-2 text-center">
                <div className={`aspect-[16/9] w-full max-w-[1120px] max-h-[68vh] mx-auto flex items-center justify-center rounded-lg overflow-hidden bg-slate-900 ${isDataStructureSlide || isDataVariationSlide || isDataMissingSlide || isCaseStudy01Slide || isCaseStudy02Slide || isCaseStudy03Slide || isCaseStudyCompareSlide || isInsightDesign01Slide || isDesign01Slide || isDesign03Slide || isFuture01Slide ? "p-3" : "p-4"}`}>
                  {!hasImageError ? (
                    <div className="relative h-full w-full">
                      <img
                        key={slide.id}
                        src={characterImageSrc}
                        alt="character slide"
                        className="h-full w-full max-h-[68vh] max-w-full object-contain object-center mx-auto"
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
                    </div>
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

              <div className={`mt-2 grid grid-cols-1 gap-2 ${viewingPoints.length === 1 ? "md:grid-cols-1" : "md:grid-cols-4"}`}>
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

          <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mt-3 flex justify-center">
              <a
                href="https://core-lp.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-300 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
              >
                サイトへ
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
