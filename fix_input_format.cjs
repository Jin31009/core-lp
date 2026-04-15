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

fs.writeFileSync("server.mjs", code);
console.log("input形式を修正しました");
