import type { Page } from "../App";

type Props = {
  setPage: (page: Page) => void;
};

export default function SlidesPage({ setPage }: Props) {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "96px 24px 120px",
      }}
    >
      <p
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Slides
      </p>

      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          lineHeight: 1.15,
          textAlign: "center",
          marginBottom: 24,
          fontWeight: 600,
        }}
      >
        COREの説明を、
        <br />
        スライドとしてどう編成するか。
      </h1>

      <p
        style={{
          maxWidth: 760,
          margin: "0 auto 48px",
          fontSize: 18,
          lineHeight: 1.9,
          textAlign: "center",
          color: "#444",
        }}
      >
        LP、プロトタイプ、研究発表を接続するための構成要素を、
        読み物としても、説明資料としても機能するかたちで整理します。
      </p>

      <section
        style={{
          background: "#ffffff",
          border: "1px solid #e5e5e0",
          borderRadius: 24,
          padding: "32px 28px",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {[
            "1. 問題提起：医療広報・関係設計をどう再定義するか",
            "2. 構造提示：RA / RA-SS / COREの位置づけ",
            "3. 実装導線：Prototype / Mission / Contact",
            "4. 実証と展望：Case / Evidence / Academic expansion",
          ].map((line) => (
            <div
              key={line}
              style={{
                padding: "16px 18px",
                border: "1px solid #ecece7",
                borderRadius: 16,
                background: "#fafaf8",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setPage("participation")}
          style={buttonSecondaryStyle}
        >
          Participationへ戻る
        </button>
        <button
          onClick={() => setPage("contact")}
          style={buttonStyle}
        >
          Contactへ
        </button>
      </div>
    </main>
  );
}

const buttonStyle = {
  border: "none",
  background: "#111111",
  color: "#ffffff",
  padding: "14px 22px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer",
};

const buttonSecondaryStyle = {
  border: "1px solid #d7d7d0",
  background: "#ffffff",
  color: "#111111",
  padding: "14px 22px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer",
};