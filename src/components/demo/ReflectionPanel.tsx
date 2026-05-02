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
    <section className="mt-8">
      <details className="rounded-[16px] border border-stone-300 bg-[#f8f5ef] px-5 py-4">
        <summary className="cursor-pointer list-none text-[13px] font-semibold tracking-[0.08em] text-stone-700">
          補助ガイド（振り返りメモ）
        </summary>
        <p className="mt-3 text-[15px] leading-8 text-stone-700">
          {getReflection(currentStep)}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Step1｜観察入力",
            "Step2｜状態の読み取り",
            "Step3｜対応の整理",
            "Step4｜学びとして記録",
            "Step5｜構造化された記録",
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-[10px] border px-3 py-2 text-[13px] ${
                currentStep === i + 1
                  ? "border-slate-700 bg-slate-700 text-white"
                  : "border-stone-300 bg-white text-stone-700"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
