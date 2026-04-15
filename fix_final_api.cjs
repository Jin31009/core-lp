const fs = require("fs");

let code = fs.readFileSync("server.mjs", "utf8");

code = code.replace(
  /content:\s*FINAL_SYSTEM_PROMPT/g,
  'content: [{ type: "input_text", text: FINAL_SYSTEM_PROMPT }]'
);

code = code.replace(
  /content:\s*finalContext/g,
  'content: [{ type: "input_text", text: finalContext }]'
);

code = code.replace(
  /content:\s*userPrompt/g,
  'content: [{ type: "input_text", text: userPrompt }]'
);

fs.writeFileSync("server.mjs", code);
console.log("Final API の content 形式を修正しました");
