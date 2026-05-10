# RASS 2026 Audio Generation

## 概要

`RASSWebSlides2026.tsx` の 00〜08 スライド向けに、AI音声ガイド MP3 を一括生成します。

出力先:

- `public/audio/rass-2026/`

## 事前準備

OpenAI APIキーを環境変数に設定してください。

```bash
export OPENAI_API_KEY="your_api_key_here"
```

## 実行コマンド

既存MP3がある場合はスキップ:

```bash
node scripts/generate-rass-2026-audio.mjs
```

既存MP3を上書き再生成:

```bash
node scripts/generate-rass-2026-audio.mjs --force
```

## 生成後の確認先

- `public/audio/rass-2026/`

生成対象:

- `00-cover.mp3`
- `01-problem.mp3`
- `02-purpose.mp3`
- `03-structure.mp3`
- `04-rass.mp3`
- `05-data.mp3`
- `06-case.mp3`
- `07-sensor.mp3`
- `08-next.mp3`

## 注意

この音声はAI生成音声です。WEBスライド上にも「AI生成音声です」と明示する必要があります。

## 次段階

音声確認後に、`RASSWebSlides2026.tsx` 側へ音声ボタンを接続してください。
