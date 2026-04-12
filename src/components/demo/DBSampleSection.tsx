import { useState } from "react";

type DBSampleSectionProps = {
  delta: string;
  eLevel: string;
  text: string;
  judgment: string;
  actionSummary: string;
  executedActions: string[];
  resultType: string;
  afterNote: string;
  whyTags: string[];
  whyMemo: string;
  nextAssets: string[];
  innerRef?: React.RefObject<HTMLDivElement | null>;
};

export default function DBSampleSection({
  delta,
  eLevel,
  text,
  judgment,
  actionSummary,
  executedActions,
  resultType,
  afterNote,
  whyTags,
  whyMemo,
  nextAssets,
  innerRef,
}: DBSampleSectionProps) {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const sectionShell =
    "overflow-hidden rounded-[22px] border border-stone-200 bg-[#fbfaf7] shadow-[0_12px_36px_rgba(15,23,42,0.06)]";

  const sectionHeader =
    "border-b border-stone-200 bg-[linear-gradient(180deg,#ede8dd_0%,#e6e1d6_100%)] px-6 py-7 sm:px-8";

  const sectionTitleClass =
    "mt-3 text-[36px] font-semibold tracking-[-0.02em] text-slate-900";

  const leadClass =
    "mt-4 max-w-4xl text-[18px] leading-9 text-stone-700";

  const tableCard =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

  const blockCard =
    "rounded-[18px] border border-stone-200 bg-white p-6 shadow-[0_3px_14px_rgba(15,23,42,0.04)]";

  const row =
    "grid grid-cols-3 gap-4 border-b border-stone-200 py-4 last:border-b-0";

  const label =
    "text-[13px] font-medium text-stone-500";

  const value =
    "text-[15px] leading-8 text-stone-800";

  const primaryButton =
    "w-full rounded-[14px] bg-violet-600 py-4 text-[16px] font-medium text-white transition hover:bg-violet-700";

  const resolvedObservation = text?.trim() || "未入力";
  const resolvedJudgment = judgment?.trim() || "未設定";
  const resolvedAction = actionSummary?.trim() || "未設定";
  const resolvedExecuted =
    executedActions.length > 0 ? executedActions.join(" / ") : "未選択";
  const resolvedResult = resultType || "未選択";
  const resolvedAfterNote = afterNote?.trim() || "未記入";
  const resolvedWhyTags =
    whyTags.length > 0 ? whyTags.join(" / ") : "未選択";
  const resolvedWhyMemo = whyMemo?.trim() || "未記入";
  const resolvedNextAssets =
    nextAssets.length > 0 ? nextAssets.join(" / ") : "未選択";

  const handleRegister = () => {
    if (registering || registered) return;

    setRegistering(true);

    setTimeout(() => {
      setRegistering(false);
      setRegistered(true);
    }, 1200);
  };

  return (
    <section ref={innerRef} className={sectionShell}>
      <div className={sectionHeader}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Step 05 / Structured Record
        </p>
        <h2 className={sectionTitleClass}>このように構造化して残ります</h2>
        <p className={leadClass}>
          Step4 で整理した学びは、このような記録構造として残せます。
          単なるメモではなく、次回に再利用できる知見として見える形にします。
        </p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className={tableCard}>
          <div className={row}>
            <div className={label}>Observation</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedObservation}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Insight</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedJudgment}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Delta</div>
            <div className={value}>Δ{delta}</div>
            <div className="text-[13px] text-stone-500">
              関係の緊張の強さ
            </div>
          </div>

          <div className={row}>
            <div className={label}>Phase</div>
            <div className={value}>{eLevel}</div>
            <div className="text-[13px] text-stone-500">
              関係の局面
            </div>
          </div>

          <div className={row}>
            <div className={label}>Planned Response</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedAction}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Executed ACE+X</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedExecuted}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Outcome</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedResult}
            </div>
          </div>

          <div className={row}>
            <div className={label}>After Note</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedAfterNote}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Why Tags</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedWhyTags}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Why Memo</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedWhyMemo}
            </div>
          </div>

          <div className={row}>
            <div className={label}>Next Asset</div>
            <div className="col-span-2 text-[15px] leading-8 text-stone-800">
              {resolvedNextAssets}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={blockCard}>
            <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
              Learning Summary
            </p>
            <p className="mt-2 text-[20px] font-semibold text-slate-900">
              今回の学び
            </p>

            <div className="mt-4 space-y-3 text-[15px] leading-8 text-stone-700">
              <p>
                <span className="font-medium text-slate-900">Action：</span>
                {resolvedExecuted}
              </p>
              <p>
                <span className="font-medium text-slate-900">Outcome：</span>
                {resolvedResult}
              </p>
              <p>
                <span className="font-medium text-slate-900">Why：</span>
                {resolvedWhyTags}
              </p>
              <p>
                <span className="font-medium text-slate-900">Next：</span>
                {resolvedNextAssets}
              </p>
            </div>
          </div>

          <div className={blockCard}>
            <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
              Insight
            </p>
            <p className="mt-2 text-[20px] font-semibold text-slate-900">
              構造化して残す意味
            </p>
            <p className="mt-4 text-[15px] leading-8 text-stone-700">
              個別の対応を、結果だけでなく「なぜそうなったか」「次に何を残すか」
              まで含めて記録することで、場面ごとの揺れと有効な一手が少しずつ見えるようになります。
            </p>
          </div>
        </div>

        <div className="rounded-[18px] border border-stone-200 bg-[#f8f5ef] p-6">
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Record Preview
          </p>
          <p className="mt-3 text-[16px] leading-9 text-stone-700">
            この画面は、Step4 で整理した内容が「学習可能なケース記録」として
            並ぶイメージを示しています。今後はここに Context Log や Signal、
            Alignment Key などを追加していく土台にもできます。
          </p>
        </div>

        <div className={blockCard}>
          <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
            Demo Action
          </p>
          <p className="mt-2 text-[20px] font-semibold text-slate-900">
            今の内容を登録しますか
          </p>
          <p className="mt-3 text-[15px] leading-8 text-stone-600">
            このボタンはデモ用の演出です。実際の CSV 保存や Notion 連携は行いませんが、
            「登録されるとこう見える」という体験を確認できます。
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleRegister}
              disabled={registering || registered}
              className={`${primaryButton} ${
                registering || registered ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              {registering
                ? "登録中..."
                : registered
                  ? "登録済み"
                  : "今の内容を登録しますか"}
            </button>

            {!registered && !registering && (
              <p className="text-[14px] leading-7 text-stone-500">
                CSV / Notion への登録演出を表示します
              </p>
            )}
          </div>

          {registered && (
            <div className="mt-6 rounded-[16px] border border-stone-200 bg-[#f8f5ef] p-5">
              <p className="text-[12px] uppercase tracking-[0.18em] text-stone-500">
                Registration Result
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="rounded-full border border-stone-300 bg-white px-4 py-2 text-[14px] font-medium text-stone-700">
                  CSV に登録しました
                </div>
                <div className="rounded-full border border-stone-300 bg-white px-4 py-2 text-[14px] font-medium text-stone-700">
                  Notion に登録しました
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-8 text-stone-600">
                ※ これはデモ演出です。実際のファイル保存・DB登録は行っていません。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}