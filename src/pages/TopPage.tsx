import React from "react";

type Props = {
  setPage: (page: string) => void;
};

export default function TopPage({ setPage }: Props) {
  return (
    <main
      style={{
        padding: "120px 40px",
        textAlign: "center",
        background: "#f7f5f2",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: 42,
          marginBottom: 40,
          letterSpacing: "-0.02em",
        }}
      >
        CORE LP Development
      </h1>

      {/* ===== DEMO ===== */}
      <div style={{ marginBottom: 20 }}>
        <button style={buttonStyle} onClick={() => setPage("prototype")}>
          DEMOを見る
        </button>
      </div>

      {/* ===== 新LP ===== */}
      <div style={{ marginBottom: 20 }}>
        <button style={buttonStyle} onClick={() => setPage("corelp")}>
          新LPを見る
        </button>
      </div>

      {/* ===== Structure（重要） ===== */}
      <div style={{ marginBottom: 20 }}>
        <button style={buttonStyle} onClick={() => setPage("structure")}>
          Structureを見る
        </button>
      </div>

      {/* ===== Case ===== */}
      <div style={{ marginBottom: 20 }}>
        <button style={buttonStyle} onClick={() => setPage("case")}>
          Caseを見る
        </button>
      </div>

      {/* ===== Evidence ===== */}
      <div style={{ marginBottom: 20 }}>
        <button style={buttonStyle} onClick={() => setPage("evidence")}>
          Evidenceを見る
        </button>
      </div>

      {/* ===== Slides ===== */}
      <div style={{ marginBottom: 20 }}>
        <button style={buttonStyle} onClick={() => setPage("slides")}>
          Slidesを見る
        </button>
      </div>
    </main>
  );
}

/* ===== 共通ボタン ===== */

const buttonStyle: React.CSSProperties = {
  padding: "12px 24px",
  border: "1px solid rgba(0,0,0,0.2)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 14,
  letterSpacing: "0.04em",
};