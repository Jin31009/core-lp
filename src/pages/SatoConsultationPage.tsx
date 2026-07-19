import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Pause,
  Play,
  RotateCcw,
  Subtitles,
  Volume2,
  VolumeX,
} from "lucide-react";

const SCENE_COUNT = 8;
const ASSET_ROOT = "/assets/sato-consultation-2026";
const AUDIO_ROOT = "/audio/sato-consultation-2026";

const sceneLabels = [
  "本日の相談",
  "病院広報の再定義",
  "関係支援の実装構造",
  "プロトタイプへの接続",
  "デモの意味回収",
  "成立可能性の背景",
  "一疾患・全場面PoCへ",
  "今回、ご相談したいこと",
] as const;

const subtitles = [
  "本日は、完成製品の導入提案ではなく、病院広報を関係構築・関係支援へ広げる考え方と、その成立可能性についてご相談します。",
  "医療が、自ら考え、選び、決めて利用するものへ変わるなか、広報も情報を伝えるだけでなく、患者・家族と病院の関係を構築し、支える役割へ変わる必要があります。",
  "関係支援は三つの実装軸で構成します。患者・家族の言葉を扱うCommunication Console、病院の考え方を示す疾患広報モジュール、支援後の変化を捉えるRA-SSです。AIコンシェルジュとHuman Gateが連動し、整理と人の判断をつなぎます。",
  "ここからは説明を続けず、完成プロトタイプを一続きの体験としてご覧ください。",
  "デモで見た体験を、四つの構造へ戻して確認します。患者・家族の言葉、必要な情報、AIと人による整理・判断、支援後に残る課題です。",
  "この構造が今可能になった背景には、ICD、DPC、ガイドライン、クリティカルパスなど医療情報の体系化と、散在する情報をAIが柔軟に統合・整理できる環境があります。",
  "次は、一疾患の一場面ではなく、一疾患の全場面を対象に段階的に確かめます。大腿骨頸部骨折は、広範なエビデンスと標準的な診療経路があり、現場負担を抑えて検証しやすい候補です。",
  "このプロトタイプは何に見えたでしょうか。正解を求める質問ではありません。広報の再定義、PoCの単位、次の一歩について率直なご意見を伺いたいと思います。",
] as const;

function clampScene(value: number) {
  return Math.max(0, Math.min(SCENE_COUNT - 1, value));
}

export default function SatoConsultationPage() {
  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [audioReady, setAudioReady] = useState(true);
  const [finalStep, setFinalStep] = useState(1);
  const [demoOpen, setDemoOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToScene = useCallback((next: number) => {
    setScene(clampScene(next));
    setFinalStep(1);
    setShowSubtitles(false);
  }, []);

  useEffect(() => {
    document.title = `7/21 佐藤先生相談｜${sceneLabels[scene]}`;
  }, [scene]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (scene === 0) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [scene]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goToScene(scene + 1);
      if (event.key === "ArrowLeft") goToScene(scene - 1);
      if (event.key === " ") {
        event.preventDefault();
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) audio.play().catch(() => setAudioReady(false));
        else audio.pause();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToScene, scene]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => setAudioReady(false));
    else audio.pause();
  };

  const replay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => setAudioReady(false));
  };

  const openDemo = () => {
    audioRef.current?.pause();
    setDemoOpen(true);
  };

  const closeDemo = () => {
    setDemoOpen(false);
    goToScene(4);
  };

  return (
    <main className="min-h-screen bg-[#e9eeef] text-slate-950">
      <audio
        key={scene}
        ref={audioRef}
        src={`${AUDIO_ROOT}/scene${String(scene).padStart(2, "0")}.mp3`}
        muted={muted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onCanPlay={() => setAudioReady(true)}
        onError={() => setAudioReady(false)}
        preload="auto"
      />

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-3 py-3 md:px-6 md:py-5">
        <header className="mb-3 flex items-center justify-between gap-4 text-xs font-medium tracking-[0.08em] text-slate-600">
          <p>2026.07.21｜佐藤先生・中内看護部長 ご相談</p>
          <p>SCENE {String(scene).padStart(2, "0")} / 07</p>
        </header>

        <section className="relative flex flex-1 items-center justify-center overflow-hidden rounded-sm bg-white shadow-[0_18px_60px_rgba(15,55,62,0.16)]">
          <img
            src={`${ASSET_ROOT}/scene${String(scene).padStart(2, "0")}.png`}
            alt={`Scene ${String(scene).padStart(2, "0")}：${sceneLabels[scene]}`}
            className="h-auto max-h-[calc(100vh-11rem)] w-full object-contain"
          />


          {scene === 7 && (
            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2 px-4">
              {finalStep < 3 ? (
                <button onClick={() => setFinalStep((value) => Math.min(3, value + 1))} className="rounded-full bg-[#075866] px-6 py-3 text-sm font-semibold text-white shadow-lg">
                  {finalStep === 1 ? "論点を表示する" : "相談を始める"}
                </button>
              ) : (
                <span className="rounded-full bg-[#075866] px-6 py-3 text-sm font-semibold text-white shadow-lg">率直なご意見をお聞かせください</span>
              )}
            </div>
          )}
        </section>

        {scene === 3 && (
          <section className="mx-auto mt-3 w-full max-w-6xl rounded-lg border border-[#075866]/20 bg-white px-4 py-3 shadow-sm" aria-label="DEMOで体感するポイント">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="shrink-0">
                <p className="text-xs font-bold tracking-[0.12em] text-[#075866]">DEMOで体感する4点</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">説明ではなく、実際の利用場面としてご覧ください。</p>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-2 text-xs font-semibold text-slate-700 md:grid-cols-4">
                <p className="rounded-md bg-[#e8f3f4] px-3 py-2"><span className="mr-1 text-[#075866]">01</span>スマートフォン／タブレットで利用</p>
                <p className="rounded-md bg-[#e8f3f4] px-3 py-2"><span className="mr-1 text-[#075866]">02</span>COREくんと音声で対話</p>
                <p className="rounded-md bg-[#e8f3f4] px-3 py-2"><span className="mr-1 text-[#075866]">03</span>会話がチャットとして残る</p>
                <p className="rounded-md bg-[#e8f3f4] px-3 py-2"><span className="mr-1 text-[#075866]">04</span>2つの広報モジュールから情報提供</p>
              </div>
              <button onClick={openDemo} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#075866] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#064b56] focus:outline-none focus:ring-4 focus:ring-teal-200">
                体験デモを開く <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {showSubtitles && scene === 2 && (
          <aside className="mx-auto mt-3 w-full max-w-6xl rounded-md border border-[#075866]/30 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm" aria-label="用語の関係">
            <div className="grid gap-2 md:grid-cols-3">
              <p><strong className="text-[#075866]">構想名</strong><br />CORE Communication Console</p>
              <p><strong className="text-[#075866]">中核機能</strong><br />Communication Console</p>
              <p><strong className="text-[#075866]">現在の実装試作</strong><br />CORE Console v18c</p>
            </div>
            <p className="mt-2 border-t border-slate-200 pt-2 text-xs leading-5 text-slate-600">
              広報モジュール群＝疾患広報＋病院広報 ／ Human Gate＝人が確認・判断する関門
            </p>
          </aside>
        )}

        {showSubtitles && scene === 3 && (
          <aside className="mx-auto mt-3 w-full max-w-5xl rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-950" aria-label="DEMO操作案内">
            DEMO内で「総論テストを開始」→ 終了後はDEMOタブを閉じる → Scene 04へ自動復帰
          </aside>
        )}

        {showSubtitles && scene === 5 && (
          <aside className="mx-auto mt-3 w-full max-w-5xl rounded-md border border-slate-300 bg-white px-4 py-3 text-center text-sm text-slate-700" aria-label="技術の位置づけ">
            院内運用や電子カルテを置き換えるものではなく、診療記録の手前と周辺に置くコミュニケーション補助層です。
          </aside>
        )}

        {showSubtitles && scene === 7 && (
          <aside className="mx-auto mt-3 w-full max-w-5xl text-center text-xs font-semibold tracking-[0.08em] text-slate-600" aria-label="相談進行">
            進行：第一印象を聞く → 論点を表示する → 相談を始める
          </aside>
        )}

        {showSubtitles && (
          <div className="mx-auto mt-3 w-full max-w-5xl rounded bg-slate-950/90 px-5 py-3 text-center text-sm leading-7 text-white md:text-base">
            {subtitles[scene]}
          </div>
        )}

        <nav className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-3" aria-label="プレゼンテーション操作">
          <button disabled={scene === 0} onClick={() => goToScene(scene - 1)} className="inline-flex min-h-11 items-center gap-2 rounded border border-slate-300 bg-white px-4 text-sm font-semibold disabled:opacity-35">
            <ArrowLeft className="h-4 w-4" /> 前へ
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button onClick={togglePlayback} disabled={!audioReady} aria-label={isPlaying ? "一時停止" : "再生"} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#075866] text-white disabled:bg-slate-400">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
            </button>
            <button onClick={replay} disabled={!audioReady} aria-label="音声を最初から再生" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white disabled:opacity-35"><RotateCcw className="h-4 w-4" /></button>
            <button onClick={() => setMuted((value) => !value)} aria-label={muted ? "音声をオン" : "音声をオフ"} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white">{muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}</button>
            <button onClick={() => setShowSubtitles((value) => !value)} aria-pressed={showSubtitles} className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold"><Subtitles className="h-5 w-5" /> 字幕・注釈</button>
            {!audioReady && <span className="text-xs font-medium text-amber-800">音声ファイルを配置すると再生できます</span>}
          </div>

          <button disabled={scene === SCENE_COUNT - 1} onClick={() => goToScene(scene + 1)} className="inline-flex min-h-11 items-center gap-2 rounded bg-[#075866] px-4 text-sm font-semibold text-white disabled:opacity-35">
            次へ <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
      {demoOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950" role="dialog" aria-modal="true" aria-label="CORE Console v18c デモ">
          <header className="flex min-h-14 items-center justify-between gap-3 bg-[#073f49] px-3 text-white shadow-lg md:px-5">
            <div>
              <p className="text-xs font-bold tracking-[0.1em] text-teal-100">CORE Console v18c｜体験デモ</p>
              <p className="hidden text-xs text-white/75 sm:block">音声対話・チャット記録・2つの広報モジュールをご確認ください</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://core-a0-demo.vercel.app/" target="_blank" rel="noreferrer" className="hidden min-h-10 items-center gap-2 rounded-full border border-white/40 px-4 text-xs font-semibold sm:inline-flex">
                別タブで開く <ExternalLink className="h-4 w-4" />
              </a>
              <button onClick={closeDemo} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[#075866] shadow">
                <ArrowLeft className="h-4 w-4" /> DEMOを終了して説明スライドへ戻る
              </button>
            </div>
          </header>
          <iframe
            src="https://core-a0-demo.vercel.app/"
            title="CORE Console v18c"
            className="min-h-0 flex-1 border-0 bg-white"
            allow="microphone"
          />
        </div>
      )}
    </main>
  );
}
