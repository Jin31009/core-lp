import { useState } from "react";

type Props = {
  setPage: (page: string) => void;
};

export default function DemoPage({ setPage }: Props) {
  const API_BASE = import.meta.env.DEV ? "http://localhost:8787" : "";

  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [finalContext, setFinalContext] = useState("");

  const generateContext = async () => {
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
  };

  const generateFinal = async () => {
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
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Demo</h1>

      <textarea
        style={{ width: "100%", height: 120 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="観察内容を入力"
      />

      <br />
      <br />

      <button onClick={generateContext}>
        AIでContext生成
      </button>

      <p>{context}</p>

      <button onClick={generateFinal}>
        最終Context生成
      </button>

      <p>{finalContext}</p>

      <br />

      <button onClick={() => setPage("top")}>
        戻る
      </button>
    </div>
  );
}