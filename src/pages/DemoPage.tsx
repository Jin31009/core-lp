import React from "react";
import SidePanel from "../components/demo/SidePanel";

export default function DemoPage() {
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <div className="min-h-screen bg-neutral-100 px-6 py-8">
      <div className="mx-auto max-w-6xl grid grid-cols-3 gap-6">
        
        {/* 左メイン（←ここは後で元の内容に戻す） */}
        <div className="col-span-2 space-y-6">

          {/* 仮プレース（元UIに戻すための足場） */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Demo Content</h2>
            <p>ここに元のDemoPageのメインコンテンツを戻していきます。</p>
          </section>

        </div>

        {/* 右カラム（←ここが今回の本体） */}
        <SidePanel currentStep={currentStep} />

      </div>
    </div>
  );
}