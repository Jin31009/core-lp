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
      <h1 style={{ fontSize: 40, marginBottom: 40 }}>
        CORE LP Development
      </h1>

      {/* ===== 既存導線 ===== */}
      <div style={{ marginBottom: 40 }}>
        <button onClick={() => setPage("prototype")}>
          DEMOを見る
        </button>
      </div>

      {/* ===== 🔥 新LP導線 ===== */}
      <div style={{ marginTop: 60 }}>
        <button
          onClick={() => setPage("corelp")}
          style={{
            padding: "14px 28px",
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          新LPを見る
        </button>
      </div>
    </main>
  );
}