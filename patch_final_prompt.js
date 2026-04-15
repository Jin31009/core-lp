const fs = require("fs");

let code = fs.readFileSync("server.mjs", "utf8");

const insert = `
【最重要補正】

Final Contextは「要約」ではない。
一次Contextより解像度を上げること。

以下を厳守：

1. 出来事を削除してはいけない
2. 反応変化を必ず残す
3. 「どの瞬間に変わったか」を明示する
4. 抽象語（関係・距離・不満）だけで終わらない

---

【禁止】

・一般化
・要約
・抽象化のみ

---

【例】

❌ 悪い：
関係の距離が生じた

⭕ 良い：
話を遮った直後から反応が変わり、関係が一段切れた可能性がある
`;

code = code.replace(
  /const FINAL_SYSTEM_PROMPT = `([\s\S]*?)`;/,
  (match, body) => {
    return `const FINAL_SYSTEM_PROMPT = \`${insert}\n\n${body}\`;`;
  }
);

fs.writeFileSync("server.mjs", code);
console.log("FINAL_SYSTEM_PROMPT を強化しました");
