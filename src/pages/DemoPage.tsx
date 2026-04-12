import { useState } from "react";

type Props = {
  setPage: (page: string) => void;
};

export default function DemoPage({ setPage }: Props) {
  // 👉 ローカルとVercelを自動切り替え
  const API_BASE = import.meta.env.DEV ? "http://localhost:8787" : "";

  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [finalContext, setFinalContext] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Context生成
  // -----------------------------
  const handleGenerateContext = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/context-draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          observationRaw: input,
        }),
      });

      const data = await res.json();
      setContext(data.contextDraft || "");
    } catch (e) {
      console.error(e);
      alert("AI生成に失敗しました");
    }
    setLoading(false);
  };

  // -----------------------------
  // Final生成
  // -----------------------------
  const handleGenerateFinal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/final-context`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contextEdited: context,
        }),
      });

      const data = await res.json();
      setFinalContext(data.finalContext || "");
    } catch (e) {
      console.error(e);
      alert("最終生成に失敗しました");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Demo
      </h1>

      {/* 入力 */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="観察内容を入力してください"
        style={{
          width: "100%",
          height: 120,
          padding: 12,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      <div style={{ marginTop: 16 }}>
        <button onClick={handleGenerateContext}>
          AIでContext生成
        </button>
      </div>

      {/* Context表示 */}
      {context && (
        <div style={{ marginTop: 24 }}>
          <h3>Context Draft</h3>
          <p>{context}</p>

          <button onClick={handleGenerateFinal}>
            最終Context生成
          </button>
        </div>
      )}

      {/* Final表示 */}
      {finalContext && (
        <div style={{ marginTop: 24 }}>
          <h3>Final Context</h3>
          <p>{finalContext}</p>
        </div>
      )}

      {/* ローディング */}
      {loading && <p>生成中...</p>}

      {/* 戻る */}
      <div style={{ marginTop: 40 }}>
        <button onClick={() => setPage("top")}>
          戻る
        </button>
      </div>
    </div>
  );
}