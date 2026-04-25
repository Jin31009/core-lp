# RA-SS Project

## Overview
このプロジェクトは、RA-SSの理論・キャラクター・空間・発表素材を統合管理するためのものです。

## Main Components
- Characters: キャラクター定義
- Scenes: 舞台設定
- Prompts: 画像生成・演出用プロンプト
- Assets: 画像素材
- Production Rules: 制作フォーマット共通ルール

## Usage
1. AGENTS.mdを最初に読む
2. `ALWAYS_BASELINE.md` を読む（毎回必須）
3. 必要なcharacters/ と scenes/ を読む
4. production_rules.md で出力フォーマットを固定する
5. prompts/ を参照して再生成や差分作成を行う

## Character Base Reference
- 添付基準13枚を公式ベースとして固定する
- 全キャラ共通の最上位基準画像: `assets/covers/cover_character_base_302.jpeg`
- 以後の差分制作は、顔・頭身・配色・空気感を固定し、別画風へ逸脱しない
- 固定参照一覧: `BASELINE_REFERENCES.md`
- 毎回運用の入口: `ALWAYS_BASELINE.md`
- スタイル固定: デフォルメ3D（トイモデル風）/ 2〜3頭身 / マット質感 / 柔らかい映画光

## Character Sheets
- CORE: `assets/character-sheets/core_sheet_01.jpeg`
- NAVI: `assets/character-sheets/navi_sheet_02.jpeg`
- SORA: `assets/character-sheets/sora_sheet_03.png`
- CODEX: `assets/character-sheets/codex_sheet_04.jpeg`

## Scene Baselines
- CHAPTER3参照: `assets/scenes/scene_chapter3_baseline.jpeg`
- 最適化参照: `assets/scenes/scene_ra_ss_opt_baseline.jpeg`
- 外観（看板）: `assets/scenes/stage_01_exterior_signboard.jpeg`
- メイン室内（テーブル）: `assets/scenes/stage_02_main_room_table.jpeg`
- 窓越し構図: `assets/scenes/stage_03_window_side.jpeg`
- 会議室（黒板）: `assets/scenes/stage_04_meeting_board.jpeg`
- 応接室（WEB対話）: `assets/scenes/stage_05_reception_web.jpeg`
- 4空間マップ: `assets/scenes/stage_06_four_spaces_map.jpeg`
