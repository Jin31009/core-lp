import React from "react";
import type { Page } from "../types";

export default function PocPage({
  onNavigate,
  onBackPrev,
}: {
  onNavigate: (page: Page) => void;
  onBackPrev: () => void;
}) {
  return (
    <div style={{ padding: 40 }}>
      <h1>PocPage OK</h1>

      <div style={{ marginTop: 20 }}>
        <button onClick={onBackPrev} style={{ marginRight: 10 }}>
          戻る
        </button>

        <button onClick={() => onNavigate("top")}>
          TOPへ
        </button>
      </div>
    </div>
  );
}
