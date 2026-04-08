type ReflectionPanelProps = {
  currentStep: number;
};

function getReflection(step: number) {
  switch (step) {
    case 1:
      return "違和感を言葉にすることで、場面が観察できる状態に変わりました。";
    case 2:
      return "関係の状態として、いま何が揺れているかが見えてきました。";
    case 3:
      return "対応は、最初の一手として整理されました。";
    case 4:
      return "対応は経験ではなく、次に使える学びへ変わりました。";
    case 5:
      return "個別のケースが、構造として蓄積される形が見えてきました。";
    default:
      return "";
  }
}

export default function ReflectionPanel({
  currentStep,
}: ReflectionPanelProps) {
  return (
    <section className="mt-10 space-y-6">

      {/* 編集メモ */}
      <div className="rounded-[18px] border border-stone-200 bg-white px-6 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
          Editorial Note
        </p>

        <p className="mt-3 text-[18px] leading-9 text-stone-700">
          {getReflection(currentStep)}
        </p>
      </div>

      {/* 構造ガイド */}
      <div className="rounded-[18px] border border-stone-200 bg-[#f8f5ef] px-6 py-6 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
          Structure
        </p>

        <p className="mt-3 text-[16px] leading-8 text-stone-600">
          このデモは、次の流れで進みます。
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Step1｜観察入力",
            "Step2｜状態の読み取り",
            "Step3｜対応の整理",
            "Step4｜学びとして記録",
            "Step5｜構造化された記録",
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-[12px] border px-4 py-3 text-[14px] transition ${
                currentStep === i + 1
                  ? "bg-slate-700 text-white"
                  : "bg-white text-stone-700 border-stone-200"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}