import { useState } from "react";

type Props = {
  setPage: (page: string) => void;
};

export default function MissionPage({ setPage }: Props) {
  return (
    <main
      style={{
        padding: "100px 24px",
        maxWidth: 960,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 42, marginBottom: 24 }}>
        Mission
      </h1>

      <p style={{ lineHeight: 1.8, color: "#555" }}>
        COREは、医療・広報・関係設計を横断し、
        「伝える」から「構造として扱う」へ再定義するプロジェクトです。
      </p>

      <button
        style={{
          marginTop: 40,
          padding: "12px 20px",
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
        onClick={() => setPage("top")}
      >
        TOPへ戻る
      </button>
    </main>
  );
}