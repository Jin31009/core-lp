import React from "react";
import SidePanel from "../components/demo/SidePanel";

export default function DemoPage() {
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <div className="min-h-screen bg-neutral-100 px-6 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-3 gap-6">
        
        {/* 左メイン */}
        <div className="col-span-2 space-y-6">
          
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Step 1：観察入力</h2>
            <button onClick={() => setCurrentStep(1)}>Step1</button>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Step 2：確認結果</h2>
            <button onClick={() => setCurrentStep(2)}>Step2</button>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Step 3：対応</h2>
            <button onClick={() => setCurrentStep(3)}>Step3</button>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Step 4：ケース記録</h2>
            <button onClick={() => setCurrentStep(4)}>Step4</button>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Step 5：DB</h2>
            <button onClick={() => setCurrentStep(5)}>Step5</button>
          </section>

        </div>

        {/* 右カラム（←ここが今回の目的） */}
        <SidePanel currentStep={currentStep} />

      </div>
    </div>
  );
}