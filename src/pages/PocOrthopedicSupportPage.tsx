import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  MessageCircle,
  QrCode,
  RefreshCcw,
  Smartphone,
  Stethoscope,
  Tablet,
  Users,
} from "lucide-react";

const patientPhases = [
  {
    title: "転倒・受傷直後",
    body: "股関節まわりを強く痛がるとき、家族が確認したいこと",
  },
  {
    title: "救急受診・診断",
    body: "救急外来、検査、入院までの流れ",
  },
  {
    title: "入院・手術前",
    body: "手術説明を受けたあとに確認したいこと",
  },
  {
    title: "手術後・リハビリ",
    body: "リハビリはなぜ必要か、何を目標にするか",
  },
  {
    title: "退院前",
    body: "家族と確認したい生活準備、転倒予防、相談先",
  },
  {
    title: "退院後の生活",
    body: "困ったときの相談先、再診までの確認事項",
  },
] as const;

type PatientPhase = (typeof patientPhases)[number]["title"];

const patientPhasePreviews: Record<
  PatientPhase,
  {
    info: string;
    familyCheck: string;
    contents: string[];
    media: string[];
  }
> = {
  "転倒・受傷直後": {
    info: "股関節まわりを強く痛がるときに、家族が確認したいこと",
    familyCheck: "お薬手帳、既往歴、転倒時の状況、連絡先",
    contents: ["転倒して股関節まわりを強く痛がるとき、家族が確認したいこと"],
    media: ["Web記事", "FAQ", "QR", "LINE入口"],
  },
  "救急受診・診断": {
    info: "救急外来、検査、入院までの流れ",
    familyCheck: "既往歴、服薬情報、家族の連絡先、入院時に確認したいこと",
    contents: ["救急外来、検査、入院までの流れ", "大腿骨頸部骨折とは"],
    media: ["Web記事", "PDF", "QR", "職員説明メモ"],
  },
  "入院・手術前": {
    info: "手術説明を受けたあとに、家族と確認したいこと",
    familyCheck: "今日説明されたこと、まだ確認したいこと、次回聞きたいこと",
    contents: ["手術説明を受けたあとに、家族と確認したいこと"],
    media: ["Web記事", "PDF", "QR", "職員説明メモ"],
  },
  "手術後・リハビリ": {
    info: "手術後のリハビリはなぜ必要か",
    familyCheck: "本人が何を目標にしているか、どの動作に不安があるか",
    contents: ["手術後のリハビリはなぜ必要か"],
    media: ["Web記事", "動画", "FAQ", "QR", "職員説明メモ"],
  },
  退院前: {
    info: "退院前に家族と確認したいこと",
    familyCheck: "段差、夜間トイレ、履物、手すり、介助の範囲、相談先",
    contents: ["退院前に家族と確認したいこと", "退院後の転倒予防と生活動作"],
    media: ["Web記事", "PDF", "QR付きA4資料", "LINE入口", "職員説明メモ"],
  },
  退院後の生活: {
    info: "困ったときの相談先、再診までの確認事項",
    familyCheck: "再診日、生活動作で困っていること、相談先、家族の見守り体制",
    contents: ["困ったときの相談先", "退院後の転倒予防と生活動作"],
    media: ["Web記事", "LINE入口", "FAQ", "QR"],
  },
};

const staffPhases = [
  "発症時",
  "救急受診",
  "診断・入院",
  "手術前",
  "手術後",
  "リハビリ",
  "退院前",
  "退院後の生活",
] as const;

type StaffPhase = (typeof staffPhases)[number];

const staffToPatientPhase: Record<StaffPhase, PatientPhase> = {
  発症時: "転倒・受傷直後",
  救急受診: "救急受診・診断",
  "診断・入院": "救急受診・診断",
  手術前: "入院・手術前",
  手術後: "手術後・リハビリ",
  リハビリ: "手術後・リハビリ",
  退院前: "退院前",
  退院後の生活: "退院後の生活",
};

const patientToStaffPhase: Record<PatientPhase, StaffPhase> = {
  "転倒・受傷直後": "発症時",
  "救急受診・診断": "救急受診",
  "入院・手術前": "手術前",
  "手術後・リハビリ": "リハビリ",
  退院前: "退院前",
  退院後の生活: "退院後の生活",
};

const patientToLineMenu: Record<PatientPhase, string> = {
  "転倒・受傷直後": "転倒した時",
  "救急受診・診断": "入院された方へ",
  "入院・手術前": "手術前確認",
  "手術後・リハビリ": "リハビリ",
  退院前: "退院前チェック",
  退院後の生活: "退院後の生活",
};

const lineMenuToPatient: Record<string, PatientPhase> = {
  転倒した時: "転倒・受傷直後",
  入院された方へ: "救急受診・診断",
  手術前確認: "入院・手術前",
  リハビリ: "手術後・リハビリ",
  退院前チェック: "退院前",
  退院後の生活: "退院後の生活",
  家族の方へ: "退院前",
  相談先: "退院後の生活",
};

const lineMenuItems = [
  "転倒した時",
  "入院された方へ",
  "手術前確認",
  "リハビリ",
  "退院前チェック",
  "退院後の生活",
  "家族の方へ",
  "相談先",
] as const;

const lineMenuPreviews: Record<
  string,
  {
    title: string;
    body: string;
    returnTargets: string[];
    actions: string[];
  }
> = {
  転倒した時: {
    title: "転倒して股関節まわりを強く痛がるとき、家族が確認したいこと",
    body: "転倒時の状況、お薬手帳、既往歴、連絡先など、受診時に伝えたい情報を整理します。",
    returnTargets: ["Web記事へ戻る", "FAQへ戻る", "QR資料へ戻る", "相談先へ戻る"],
    actions: ["Web記事を読む", "FAQを見る", "家族に共有", "相談先"],
  },
  入院された方へ: {
    title: "入院から退院後の生活までの見通し",
    body: "救急受診、検査、入院後の説明を見返し、家族内で同じ情報を共有します。",
    returnTargets: ["Web記事へ戻る", "PDFへ戻る", "FAQへ戻る", "職員説明メモへ戻る"],
    actions: ["Web記事を読む", "PDFを見る", "家族に共有", "FAQ"],
  },
  手術前確認: {
    title: "手術説明を受けたあとに、家族と確認したいこと",
    body: "説明されたこと、まだ確認したいこと、次回聞きたいことを家族で整理します。",
    returnTargets: ["Web記事へ戻る", "PDFへ戻る", "QR資料へ戻る", "職員説明メモへ戻る"],
    actions: ["Web記事を読む", "PDFを見る", "家族に共有", "職員説明メモ"],
  },
  リハビリ: {
    title: "手術後のリハビリはなぜ必要か",
    body: "リハビリの目的、本人の目標、不安のある動作を家族と見返します。",
    returnTargets: ["Web記事へ戻る", "動画へ戻る", "FAQへ戻る", "QR資料へ戻る"],
    actions: ["Web記事を読む", "動画を見る", "FAQを見る", "職員説明メモ"],
  },
  退院前チェック: {
    title: "退院前に家族と確認したいこと",
    body: "家の中の段差、夜間トイレ、履物、手すり、介助の範囲、困ったときの相談先を確認します。",
    returnTargets: ["Web記事へ戻る", "PDFへ戻る", "FAQへ戻る", "QR付きA4資料へ戻る"],
    actions: ["Web記事を読む", "PDFを見る", "家族に共有", "FAQを見る"],
  },
  退院後の生活: {
    title: "困ったときの相談先、再診までの確認事項",
    body: "退院後に困ったときの相談先、再診日、生活動作で不安なことを見返します。",
    returnTargets: ["Web記事へ戻る", "FAQへ戻る", "LINE入口へ戻る", "相談先へ戻る"],
    actions: ["Web記事を読む", "FAQを見る", "LINEで見返す", "相談先"],
  },
  家族の方へ: {
    title: "家族と共有したい確認事項",
    body: "本人だけでなく、家族があとから同じ情報に戻れるように確認事項を整理します。",
    returnTargets: ["Web記事へ戻る", "PDFへ戻る", "FAQへ戻る", "QR付きA4資料へ戻る"],
    actions: ["Web記事を読む", "PDFを見る", "家族に共有", "FAQ"],
  },
  相談先: {
    title: "困ったときの相談先",
    body: "退院後の生活で迷ったときに、どこへ相談するかを確認します。",
    returnTargets: ["FAQへ戻る", "相談先ページへ戻る", "LINE入口へ戻る", "Web記事へ戻る"],
    actions: ["相談先を見る", "FAQを見る", "家族に共有", "LINEで見返す"],
  },
};

const staffPhaseDetails: Record<
  StaffPhase,
  {
    contents: string[];
    points: string[];
    insights: string[];
    media: string[];
  }
> = {
  発症時: {
    contents: [
      "転倒して股関節まわりを強く痛がるとき、家族が確認したいこと",
      "救急受診前に伝える情報",
      "受傷直後の相談先",
    ],
    points: [
      "痛みや動けなさを家族が具体的に伝えられるか",
      "本人を無理に動かそうとしていないか",
      "救急受診につながる連絡先が共有されているか",
    ],
    insights: [
      "家族が様子見でよいのか迷っている",
      "本人の訴えが家族に十分伝わっていない",
    ],
    media: ["Web記事", "QR", "LINE入口", "FAQ"],
  },
  救急受診: {
    contents: [
      "救急外来、検査、入院までの流れ",
      "家族が持参・確認したい情報",
      "検査説明を受けたあとに見返すメモ",
    ],
    points: [
      "検査や待ち時間の見通しを家族が理解しているか",
      "既往歴や服薬情報が整理されているか",
      "入院になる可能性を家族が受け止められているか",
    ],
    insights: [
      "検査の意味が伝わっていない",
      "入院までの流れが家族内で共有されていない",
    ],
    media: ["Web記事", "PDF", "QR", "職員説明メモ"],
  },
  "診断・入院": {
    contents: [
      "大腿骨頸部骨折とは",
      "入院から退院後の生活までの見通し",
      "入院時に家族と確認したいこと",
    ],
    points: [
      "病名と今後の流れを家族が言葉にできるか",
      "入院中に誰へ連絡するか決まっているか",
      "退院後の生活まで含めた見通しを早めに共有できているか",
    ],
    insights: [
      "診断名だけが先行して生活の見通しが抜けている",
      "キーパーソンへ情報が届いていない",
    ],
    media: ["Web記事", "PDF", "FAQ", "LINE入口"],
  },
  手術前: {
    contents: [
      "手術説明を受けたあとに、家族と確認したいこと",
      "同意説明後に見返すポイント",
      "家族間で共有したい確認事項",
    ],
    points: [
      "説明後に残った不安を言葉にできているか",
      "家族が同じ情報を見返せる状態か",
      "手術後のリハビリや生活変化の話に接続できているか",
    ],
    insights: [
      "説明直後は頷いているが後から質問が増える",
      "遠方家族に説明内容が共有されていない",
    ],
    media: ["PDF", "FAQ", "QR", "職員説明メモ"],
  },
  手術後: {
    contents: [
      "手術後に家族が確認したいこと",
      "術後の痛みや安静について見返す情報",
      "リハビリ開始までの流れ",
    ],
    points: [
      "術後の変化を家族が過度に不安視していないか",
      "リハビリ開始の意味が伝わっているか",
      "本人の状態変化を誰に相談するか確認できているか",
    ],
    insights: [
      "リハビリ開始を早すぎると感じている",
      "術後の状態を家族が断片的に受け取っている",
    ],
    media: ["Web記事", "PDF", "FAQ", "職員説明メモ"],
  },
  リハビリ: {
    contents: [
      "手術後のリハビリはなぜ必要か",
      "何を目標にリハビリを進めるか",
      "家族ができる声かけと見守り",
    ],
    points: [
      "リハビリの目的が本人と家族に共有されているか",
      "できること・まだ難しいことを具体的に理解できているか",
      "退院後の生活動作へ説明がつながっているか",
    ],
    insights: [
      "リハビリの意味が伝わっていない",
      "本人の意欲と家族の期待にズレがある",
    ],
    media: ["Web記事", "動画", "QR", "職員説明メモ"],
  },
  退院前: {
    contents: ["退院前に家族と確認したいこと", "退院後の転倒予防と生活動作", "困ったときの相談先"],
    points: [
      "家族が退院後の生活を具体的に想像できているか",
      "本人が「大丈夫」と思い込みすぎていないか",
      "夜間トイレ、段差、履物、手すりを確認したか",
      "介助する家族が無理をしすぎない設計になっているか",
    ],
    insights: [
      "退院後に困りそう",
      "転倒リスクの認識が不足している",
      "家族に共有されていない",
    ],
    media: ["Web記事", "PDF", "QR", "LINE入口", "FAQ", "職員説明メモ"],
  },
  退院後の生活: {
    contents: [
      "退院後の生活で困ったときの相談先",
      "再診までに確認したいこと",
      "転倒予防を続けるための生活メモ",
    ],
    points: [
      "困ったときの相談先が家族内で共有されているか",
      "再診までの注意点を見返せるか",
      "生活動作の不安が放置されていないか",
    ],
    insights: [
      "困りごとの相談先がわからない",
      "退院後に同じ質問が繰り返される",
    ],
    media: ["Web記事", "LINE入口", "FAQ", "QR"],
  },
};

const contentCards = [
  {
    title: "大腿骨頸部骨折とは",
    body: "入院から退院後の生活までの見通し",
    phase: "全体像",
    functionLabel: "理解支援",
    media: ["Web記事", "PDF", "FAQ"],
  },
  {
    title: "転倒して股関節まわりを強く痛がるとき、家族が確認したいこと",
    body: "発症時・救急受診の導線",
    phase: "発症時・救急受診",
    functionLabel: "初動確認",
    media: ["Web記事", "QR", "LINE入口"],
  },
  {
    title: "手術説明を受けたあとに、家族と確認したいこと",
    body: "IC支援・家族共有",
    phase: "手術前",
    functionLabel: "説明補助",
    media: ["PDF", "FAQ", "職員説明メモ"],
  },
  {
    title: "手術後のリハビリはなぜ必要か",
    body: "理解支援・行動支援",
    phase: "手術後・リハビリ",
    functionLabel: "行動支援",
    media: ["Web記事", "PDF", "QR", "動画"],
  },
  {
    title: "退院前に家族と確認したいこと",
    body: "転倒予防・生活準備・相談先",
    phase: "退院前",
    functionLabel: "生活準備",
    media: ["Web記事", "PDF", "QR", "LINE入口", "FAQ", "職員説明メモ"],
  },
] as const;

const insightTypes = [
  "伝わっていない気がする",
  "家族に共有されていない",
  "退院後に困りそう",
  "同じ質問が多い",
  "資料が使いにくい",
  "不安が言葉になっていない",
  "リハビリの意味が伝わっていない",
  "転倒リスクの認識が不足している",
] as const;

const improvementTargets = [
  "FAQ",
  "PDF",
  "QR付き資料",
  "患者向けページ",
  "職員説明メモ",
  "LINE入口",
  "動画",
] as const;

type InsightType = (typeof insightTypes)[number];
type ImprovementTarget = (typeof improvementTargets)[number];

type DemoStepId = "staff" | "patient" | "insight" | "preview" | "line-entry" | "backyard" | "loop";

type SharedContent = {
  title: string;
  phases: string;
  media: string[];
};

const sharedContentByPatientPhase: Record<PatientPhase, SharedContent> = {
  "転倒・受傷直後": {
    title: "転倒して股関節まわりを強く痛がるとき、家族が確認したいこと",
    phases: "発症時 / 救急受診 / 家族支援",
    media: ["患者スマホ", "QR", "LINE入口", "FAQ"],
  },
  "救急受診・診断": {
    title: "大腿骨頸部骨折とは",
    phases: "救急受診 / 診断・入院 / 家族支援",
    media: ["患者スマホ", "職員タブレット", "PDF", "FAQ"],
  },
  "入院・手術前": {
    title: "手術説明を受けたあとに、家族と確認したいこと",
    phases: "手術前 / 家族支援 / 職員説明支援",
    media: ["患者スマホ", "職員タブレット", "PDF", "QR", "職員説明メモ"],
  },
  "手術後・リハビリ": {
    title: "手術後のリハビリはなぜ必要か",
    phases: "手術後 / リハビリ / 行動支援",
    media: ["患者スマホ", "職員タブレット", "動画", "FAQ", "QR"],
  },
  退院前: {
    title: "退院前に家族と確認したいこと",
    phases: "退院前 / 退院後の生活 / 家族支援",
    media: ["患者スマホ", "職員タブレット", "QR付きA4資料", "LINE入口", "PDF", "FAQ"],
  },
  退院後の生活: {
    title: "困ったときの相談先",
    phases: "退院後の生活 / 相談先 / 家族支援",
    media: ["患者スマホ", "LINE入口", "FAQ", "QR"],
  },
};

type InsightPreview = {
  rass: string;
  missingFunctions: string;
  candidates: string[];
  media: string[];
};

const insightPreviewExamples: Record<string, InsightPreview> = {
  "退院前|家族に共有されていない|QR付き資料": {
    rass: "退院前フェーズにおける家族共有・生活準備情報の不足",
    missingFunctions: "家族共有／不安整理／行動支援",
    candidates: ["退院前に家族と確認したいこと", "退院後の転倒予防と生活動作"],
    media: ["Web記事", "PDF", "QR付きA4資料", "LINE入口", "職員説明メモ"],
  },
  "リハビリ|リハビリの意味が伝わっていない|動画": {
    rass: "リハビリ期における治療理解・行動支援情報の不足",
    missingFunctions: "理解支援／行動支援／不安整理",
    candidates: ["手術後のリハビリはなぜ必要か"],
    media: ["Web記事", "動画", "FAQ", "職員説明メモ", "QR"],
  },
  "発症時|不安が言葉になっていない|FAQ": {
    rass: "発症時・受傷直後における家族の行動迷いと不安整理情報の不足",
    missingFunctions: "案内／不安整理／行動支援",
    candidates: ["転倒して股関節まわりを強く痛がるとき、家族が確認したいこと"],
    media: ["Web記事", "FAQ", "QR", "LINE入口"],
  },
};

function getInsightPreview(phase: StaffPhase, insight: InsightType, target: ImprovementTarget): InsightPreview {
  const exact = insightPreviewExamples[`${phase}|${insight}|${target}`];
  if (exact) {
    return exact;
  }

  const phaseLabels: Record<StaffPhase, string> = {
    発症時: "発症時・受傷直後における家族の行動迷い",
    救急受診: "救急受診時における流れの理解と家族共有",
    "診断・入院": "診断・入院時における見通し共有",
    手術前: "手術前フェーズにおける説明理解と家族共有",
    手術後: "手術後フェーズにおける状態理解と不安整理",
    リハビリ: "リハビリ期における理解支援と行動支援",
    退院前: "退院前フェーズにおける家族共有・生活準備",
    退院後の生活: "退院後の生活における相談先理解と不安整理",
  };

  const mediaByTarget: Record<ImprovementTarget, string[]> = {
    FAQ: ["Web記事", "FAQ", "QR"],
    PDF: ["Web記事", "PDF", "QR"],
    QR付き資料: ["Web記事", "PDF", "QR付きA4資料", "職員説明メモ"],
    患者向けページ: ["Web記事", "LINE入口", "FAQ", "QR"],
    職員説明メモ: ["職員説明メモ", "PDF", "QR"],
    LINE入口: ["Web記事", "LINE入口", "FAQ"],
    動画: ["Web記事", "動画", "FAQ", "QR"],
  };

  const phaseContents = staffPhaseDetails[phase].contents.slice(0, 2);
  const functions = insight.includes("リハビリ")
    ? "理解支援／行動支援／不安整理"
    : insight.includes("家族")
      ? "家族共有／不安整理／行動支援"
      : insight.includes("不安")
        ? "案内／不安整理／行動支援"
        : "理解支援／情報整理／行動支援";

  return {
    rass: `${phaseLabels[phase]}情報の不足`,
    missingFunctions: functions,
    candidates: phaseContents,
    media: mediaByTarget[target],
  };
}

const loopSteps = [
  "看護師の違和感",
  "RA-SSで整理",
  "不足している情報・説明機能を抽出",
  "基幹コンテンツを更新",
  "Web記事・PDF・QR・LINE入口・職員説明メモへ展開",
  "患者・家族が見返す／職員が説明に使う",
  "バックヤードで利用状況と違和感をモニター",
] as const;

const demoSteps: Array<{ id: DemoStepId; targetId: string; message: string }> = [
  {
    id: "staff",
    targetId: "staff",
    message: "職員タブレットで退院前フェーズの説明ポイントを確認します。",
  },
  {
    id: "patient",
    targetId: "patient",
    message: "患者スマホ画面で退院前フェーズを選び、家族と確認する内容を見返します。",
  },
  {
    id: "insight",
    targetId: "insight",
    message: "看護師が「家族に共有されていない」という違和感を記録します。",
  },
  {
    id: "preview",
    targetId: "improvement-preview",
    message: "RA-SS整理により、不足している情報・説明機能と改善候補が見えます。",
  },
  {
    id: "line-entry",
    targetId: "line-entry",
    message: "LINE入口から、退院後にも「退院前チェック」を見返せる導線を確認します。",
  },
  {
    id: "backyard",
    targetId: "backyard",
    message: "バックヤードで「退院前 × 家族共有不足」が改善候補になっていることを確認します。",
  },
  {
    id: "loop",
    targetId: "loop",
    message: "基幹コンテンツがFAQ、QR付きA4資料、LINE入口、職員説明メモへ再展開される流れを確認します。",
  },
];

const safetyNotes = {
  patient: "この画面は、説明内容を見返すためのPoCです。実際の判断は医師・医療機関の説明を前提とします。",
  line: "LINEは医療情報そのものを置く場所ではなく、Web記事・PDF・FAQへ戻るための入口です。個別医療相談には使いません。",
  insight: "PoC段階では、患者名・ID・個別症状などの個人情報は入力しません。",
} as const;

const miniNavItems = [
  ["デモ", "demo-area"],
  ["職員", "staff"],
  ["患者", "patient"],
  ["違和感", "insight"],
  ["改善候補", "improvement-preview"],
  ["LINE", "line-entry"],
  ["バックヤード", "backyard"],
  ["改善ループ", "loop"],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Section({
  id,
  eyebrow,
  title,
  children,
  highlighted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  highlighted?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t px-4 py-14 transition-all sm:px-6 lg:px-8 ${
        highlighted
          ? "border-teal-400 bg-teal-50/80 shadow-[inset_0_0_0_2px_rgba(13,148,136,0.24)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function SafetyNotice({ children, tone = "amber" }: { children: ReactNode; tone?: "amber" | "teal" }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        tone === "teal" ? "border-teal-200 bg-teal-50 text-teal-950" : "border-amber-200 bg-amber-50 text-amber-950"
      }`}
    >
      <p className="text-sm font-medium leading-6">{children}</p>
    </div>
  );
}

function PocHero() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-teal-700">広報モジュール開発の代表事例</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.18] text-slate-950 sm:text-5xl">
            大腿骨頸部骨折の退院前・退院後の生活支援PoC
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            職員がタブレットで退院前説明に使い、患者・家族が同じ基幹コンテンツをスマホで見返す流れを確認するデモです。
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
            説明時に看護師が感じた違和感を、RA-SSで改善候補として整理し、LINE入口やバックヤード確認を経て、次の基幹コンテンツ改善へ戻します。
          </p>
          <div className="mt-5 max-w-3xl">
            <SafetyNotice tone="teal">
              本PoCは医療判断や診断を行うものではありません。患者・家族の理解支援、職員の説明支援、情報導線の改善を検証するための表示デモです。
            </SafetyNotice>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://calendar.app.google/oEc8eoHxxSij79au9"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              初回30分相談を予約する
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("demo-area")}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              デモを見る
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("decision-area")}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              導入判断を見る
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
          <p className="mb-4 text-sm leading-7 text-slate-700">
            このPoCでは、職員説明、患者・家族の見返し、現場の違和感、改善管理を一つの流れとして確認します。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Tablet, title: "職員", body: "タブレットで説明に使う" },
              { icon: Smartphone, title: "患者・家族", body: "スマホで段階別に見返す" },
              { icon: ClipboardList, title: "違和感", body: "現場メモを改善候補へ戻す" },
              { icon: BarChart3, title: "バックヤード", body: "利用状況と不足を確認する" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
                <item.icon aria-hidden className="h-5 w-5 text-teal-700" />
                <p className="mt-3 font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-teal-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">PoC Operation Loop</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
              {["タブレット", "スマホ", "違和感", "RA-SS", "LINE入口", "バックヤード", "改善"].map((step, index) => (
                <span key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-teal-900">{step}</span>
                  {index < 6 && <span className="text-slate-400">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              患者・家族が見返し、職員が説明に使い、看護師の違和感を次の基幹コンテンツ改善へ戻す。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniNav() {
  return (
    <nav className="sticky top-0 z-20 border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
        {miniNavItems.map(([label, id]) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="min-h-10 shrink-0 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-teal-300 hover:bg-teal-50"
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function DemoProgressCard({
  activeStepIndex,
  onPrev,
  onNext,
  onEnd,
}: {
  activeStepIndex: number | null;
  onPrev: () => void;
  onNext: () => void;
  onEnd: () => void;
}) {
  if (activeStepIndex === null) {
    return null;
  }

  const current = demoSteps[activeStepIndex];

  return (
    <section className="sticky top-[66px] z-10 border-b border-teal-200 bg-teal-900 px-4 py-3 text-white shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100">
            現在のステップ：{activeStepIndex + 1} / {demoSteps.length}
          </p>
          <p className="mt-1 text-sm leading-6 text-white">現在：{current.message}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={activeStepIndex === 0}
            className="min-h-10 rounded-lg border border-white/30 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={activeStepIndex === demoSteps.length - 1}
            className="min-h-10 rounded-lg bg-white px-4 text-sm font-semibold text-teal-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            次へ
          </button>
          <button
            type="button"
            onClick={onEnd}
            className="min-h-10 rounded-lg border border-white/30 px-4 text-sm font-semibold text-white"
          >
            デモ終了
          </button>
        </div>
      </div>
    </section>
  );
}

function SharedContentBar({ content, demoActive = false }: { content: SharedContent; demoActive?: boolean }) {
  return (
    <section
      className={`border-b px-4 py-4 transition-all sm:px-6 lg:px-8 ${
        demoActive
          ? "border-amber-300 bg-amber-50 shadow-[inset_0_-1px_0_rgba(217,119,6,0.25)]"
          : "border-teal-200 bg-teal-50"
      }`}
    >
      <div className="mx-auto grid max-w-6xl gap-3 lg:grid-cols-[1.1fr_0.8fr_1.2fr] lg:items-center">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${demoActive ? "text-amber-700" : "text-teal-700"}`}>
            {demoActive ? "デモ中の基幹コンテンツ" : "共有中の基幹コンテンツ"}
          </p>
          <p className="mt-1 text-lg font-semibold leading-7 text-slate-950">{content.title}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500">{demoActive ? "現在のフェーズ" : "関連フェーズ"}</p>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-700">{content.phases}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500">{demoActive ? "現在の媒体" : "展開中メディア"}</p>
          <MediaChips media={content.media} className="mt-2" />
        </div>
      </div>
    </section>
  );
}

function DemoGuide({ onStartDemo }: { onStartDemo: () => void }) {
  return (
    <section id="demo-area" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Demo Guide</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              デモで見る：職員説明から、患者の見返し、改善ループまで
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
              職員がタブレットで退院前説明に使い、患者・家族が同じ基幹コンテンツをスマホで見返します。
              説明時に看護師が感じた違和感は、RA-SSで改善候補として整理し、LINE入口やバックヤード確認を経て、次の基幹コンテンツ改善へ戻します。
            </p>
          </div>
          <button
            type="button"
            onClick={onStartDemo}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            退院前デモを開始
          </button>
        </div>
        <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-3 lg:grid-cols-7">
          {[
            "職員タブレットで退院前フェーズの説明ポイントを見る",
            "患者スマホ画面で「退院前」を選び、家族と確認する内容を見返す",
            "看護師の違和感入力で「家族に共有されていない」を選ぶ",
            "RA-SS改善プレビューで、不足している情報・説明機能と改善先候補を見る",
            "LINE入口で「退院前チェック」をあとから見返す",
            "バックヤードで「退院前 × 家族共有不足」が改善候補になっていることを確認する",
            "改善ループで、基幹コンテンツがFAQ、QR付きA4資料、LINE入口、職員説明メモへ再展開される流れを見る",
          ].map((item, index) => (
            <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DischargeRouteSummary() {
  const routeItems = [
    {
      title: "退院前フェーズの確認項目",
      body: "段差、夜間トイレ、履物、手すり、介助範囲、相談先を基幹コンテンツとして整理する。",
      icon: ClipboardList,
    },
    {
      title: "職員タブレット説明画面",
      body: "職員が同じ基幹コンテンツを開き、説明ポイントと家族共有の確認に使う。",
      icon: Tablet,
    },
    {
      title: "QR付きA4資料",
      body: "退院前説明時に、現場配布用・アクセス導線付きの要約資料として渡す。",
      icon: QrCode,
    },
    {
      title: "スマホで見返す",
      body: "患者・家族が退院後も、QRやLINE入口から基幹コンテンツへ戻れるようにする。",
      icon: Smartphone,
    },
  ];

  const coreItems = ["WordPress記事", "FAQ", "PDF", "QR付きA4資料"];
  const mediaItems = ["LINE入口", "タブレット説明画面", "広報誌", "PPT"];

  return (
    <Section id="discharge-route" eyebrow="Discharge Route" title="退院前フェーズから、QR付きA4資料とスマホ見返し導線へ">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm leading-7 text-slate-700">
            大腿骨頸部骨折の退院前支援では、退院前フェーズの確認項目を基幹コンテンツとして整理します。
            職員は同じ内容をタブレット説明画面で確認し、患者・家族にはQR付きA4資料を渡します。
            患者・家族は退院後もスマホで情報を見返すことができます。
            この流れは、疾患別IC支援モジュールを統合コンテンツ設計単位として扱うための代表事例です。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">基幹コンテンツ</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                患者・家族が見返し、職員が説明に使う情報の本体。
              </p>
              <MediaChips media={coreItems} className="mt-3" />
            </div>
            <div className="rounded-lg border border-sky-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">接続メディア</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                基幹コンテンツへ戻る、説明に使う、共有するための媒体。
              </p>
              <MediaChips media={mediaItems} className="mt-3" />
            </div>
          </div>
        </div>

        <ol className="grid gap-3">
          {routeItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={item.title} className="relative rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-teal-700">STEP {index + 1}</p>
                    <h3 className="mt-1 text-base font-semibold leading-6 text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                </div>
                {index < routeItems.length - 1 ? (
                  <div className="mt-3 text-center text-sm font-semibold text-teal-600" aria-hidden="true">
                    ↓
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

function DemoSummaryCard({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }

  return (
    <section className="border-b border-amber-200 bg-amber-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-lg border border-amber-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Demo Summary</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">今回のデモで確認した流れ</h2>
        <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          {[
            "患者スマホで退院前を確認",
            "職員タブレットで退院前の説明ポイントを確認",
            "看護師が家族に共有されていないという違和感を記録",
            "RA-SSで家族共有 / 不安整理 / 行動支援の不足として整理",
            "退院前に家族と確認したいことを改善候補に設定",
            "QR付きA4資料、PDF、FAQ、LINE入口、職員説明メモへ再展開",
            "LINEからの再閲覧がバックヤードで確認される",
          ].map((item, index) => (
            <li key={item} className="rounded-lg bg-amber-50 p-3">
              <span className="font-semibold text-amber-800">{index + 1}. </span>
              {item}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          違和感を集めて終わりではなく、基幹コンテンツと接続メディアの改善に戻します。
        </p>
      </div>
    </section>
  );
}

function ConceptFormula() {
  return (
    <Section id="concept" eyebrow="Structure" title="全体構造">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-7">
        <div className="grid gap-3 text-center text-base font-semibold text-slate-950 sm:grid-cols-[1.2fr_0.55fr_1fr_0.9fr] sm:items-stretch">
          {["（診療科 × 疾患群 × フェーズ）", "RA-SS", "情報・説明機能", "接続メディア"].map((item, index) => (
            <div key={item} className="flex min-h-20 items-center justify-center rounded-lg border border-slate-200 bg-white px-4">
              {index > 0 && <span className="mr-3 text-teal-700">×</span>}
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
          疾患とフェーズに沿って、患者・家族・職員の違和感を拾い、必要な情報・説明機能へ変換し、最適なメディアへ展開する。
        </p>
      </div>
    </Section>
  );
}

function PatientPhoneMock({
  selectedPhase,
  onSelectPhase,
  highlighted = false,
}: {
  selectedPhase: PatientPhase;
  onSelectPhase: (phase: PatientPhase) => void;
  highlighted?: boolean;
}) {
  const preview = patientPhasePreviews[selectedPhase];

  return (
    <Section id="patient" eyebrow="Patient Mobile" title="患者・家族用スマホ画面" highlighted={highlighted}>
      <div className="mx-auto max-w-[390px] rounded-[32px] border-8 border-slate-900 bg-slate-900 p-2 shadow-xl">
        <div className="rounded-[24px] bg-white">
          <div className="flex justify-center pt-3">
            <div className="h-1.5 w-20 rounded-full bg-slate-300" />
          </div>
          <div className="px-4 pb-5 pt-4">
            <div className="rounded-lg bg-teal-700 p-4 text-white">
              <p className="text-xs font-semibold opacity-85">整形外科サポート</p>
              <h3 className="mt-2 text-xl font-semibold leading-7">大腿骨頸部骨折で入院された方・ご家族へ</h3>
              <p className="mt-3 text-sm leading-6 opacity-95">今の段階に近いものを選んでください。</p>
            </div>
            <div className="mt-4 space-y-3">
              {patientPhases.map((phase, index) => (
                <button
                  key={phase.title}
                  type="button"
                  onClick={() => onSelectPhase(phase.title)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left shadow-sm transition hover:border-teal-300 hover:bg-teal-50 ${
                    phase.title === selectedPhase ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-950">{phase.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{phase.body}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-teal-200 bg-teal-50 p-4">
              <p className="text-xs font-semibold text-teal-800">選択中：{selectedPhase}</p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                <PreviewLine label="この段階で見返せる情報" value={preview.info} />
                <PreviewLine label="家族と確認すること" value={preview.familyCheck} />
                <div>
                  <p className="text-xs font-semibold text-slate-500">関連する基幹コンテンツ</p>
                  <ul className="mt-1 space-y-1">
                    {preview.contents.map((item) => (
                      <li key={item}>・{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">利用できるメディア</p>
                  <MediaChips media={preview.media} className="mt-2" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">入口</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {["QRから開いたページ", "LINEであとから見返す", "家族に共有する", "PDFを開く"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="min-h-9 rounded-lg border border-teal-200 bg-white px-2 text-xs font-semibold text-teal-800"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-[390px] rounded-lg border border-teal-200 bg-white p-4">
        <p className="text-sm leading-6 text-slate-700">
          患者さんが見返す情報と、職員が説明に使う情報は、同じ基幹コンテンツをもとにしています。
        </p>
      </div>
      <div className="mx-auto mt-4 max-w-[390px]">
        <SafetyNotice>{safetyNotes.patient}</SafetyNotice>
      </div>
    </Section>
  );
}

function PreviewLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-800">{value}</p>
    </div>
  );
}

function LineEntryMock({
  selectedMenu,
  onSelectMenu,
  highlighted = false,
}: {
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
  highlighted?: boolean;
}) {
  const preview = lineMenuPreviews[selectedMenu] ?? lineMenuPreviews["退院前チェック"];

  return (
    <Section id="line-entry" eyebrow="LINE Entry" title="LINE入口イメージ" highlighted={highlighted}>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-base leading-8 text-slate-700">
            LINEは医療情報そのものを置く場所ではなく、患者さん・ご家族が必要な情報へ戻るためのスマホ入口として設計します。
            医療情報の本体はWeb記事・PDF・FAQなどの中心コンテンツ側に置きます。
          </p>
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm leading-6 text-amber-900">{safetyNotes.line}</p>
          </div>
          <div className="mt-4 rounded-lg border border-teal-200 bg-white p-4">
            <p className="text-sm font-semibold leading-6 text-teal-900">
              LINE入口は、医療情報そのものを置く場所ではなく、医療者が確認した中心コンテンツへ戻るための入口として扱います。
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[390px] rounded-[28px] border-8 border-slate-900 bg-slate-900 p-2 shadow-xl">
          <div className="overflow-hidden rounded-[20px] bg-[#f2f7f3]">
            <div className="bg-[#06c755] px-4 py-3 text-white">
              <p className="text-xs font-semibold opacity-90">病院情報入口</p>
              <h3 className="mt-1 text-lg font-semibold">LINEリッチメニュー</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {lineMenuItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onSelectMenu(item)}
                    className={`min-h-12 rounded-lg border px-2 text-sm font-semibold leading-5 transition ${
                      item === selectedMenu
                        ? "border-[#06c755] bg-white text-[#047a35] shadow-sm"
                        : "border-slate-200 bg-white/80 text-slate-700 hover:border-[#06c755]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-[#047a35]">選択中：{selectedMenu}</p>
                <h4 className="mt-2 text-lg font-semibold leading-7 text-slate-950">{preview.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{preview.body}</p>
                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-500">戻り先</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {preview.returnTargets.map((target) => (
                      <span
                        key={target}
                        className="inline-flex min-h-7 items-center rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700"
                      >
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {preview.actions.map((action) => (
                    <button
                      key={action}
                      type="button"
                      className={`min-h-10 rounded-lg border px-2 text-xs font-semibold text-teal-900 ${
                        highlighted && action.includes("FAQ")
                          ? "border-amber-300 bg-amber-100"
                          : "border-teal-200 bg-teal-50"
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function StaffTabletMock({
  selectedPhase,
  onSelectPhase,
  onOpenPatientPage,
  highlighted = false,
}: {
  selectedPhase: StaffPhase;
  onSelectPhase: (phase: StaffPhase) => void;
  onOpenPatientPage: (phase: PatientPhase) => void;
  highlighted?: boolean;
}) {
  const [showA4Preview, setShowA4Preview] = useState(false);
  const selectedDetails = staffPhaseDetails[selectedPhase];

  return (
    <Section id="staff" eyebrow="Staff Tablet" title="職員用タブレット画面" highlighted={highlighted}>
      <div className="rounded-[26px] border-8 border-slate-800 bg-slate-800 p-2 shadow-xl">
        <div className="rounded-[16px] bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">説明支援</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">職員用 説明支援ダッシュボード</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
              <Stethoscope aria-hidden className="h-4 w-4" />
              選択中：{selectedPhase}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {staffPhases.map((phase) => (
              <button
                key={phase}
                type="button"
                onClick={() => onSelectPhase(phase)}
                className={`min-h-10 rounded-lg border px-3 text-sm font-semibold ${
                  phase === selectedPhase
                    ? "border-teal-700 bg-teal-700 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {phase}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-950">説明に使う基幹コンテンツ</h4>
              <div className="mt-3 space-y-3">
                {selectedDetails.contents.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
                    <FileText aria-hidden className="h-5 w-5 shrink-0 text-teal-700" />
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="font-semibold text-slate-950">説明ポイント</h4>
              <ul className="mt-3 space-y-3">
                {selectedDetails.points.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h4 className="font-semibold text-amber-950">よくある違和感</h4>
              <ul className="mt-3 space-y-2">
                {selectedDetails.insights.map((item) => (
                  <li key={item} className="text-sm leading-6 text-amber-900">
                    ・{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
              <h4 className="font-semibold text-teal-950">推奨される接続メディア</h4>
              <MediaChips media={selectedDetails.media} className="mt-3" />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowA4Preview((current) => !current)}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <FileText aria-hidden className="h-4 w-4" />
              A4資料を表示
            </button>
            <button
              type="button"
              onClick={() => onOpenPatientPage(staffToPatientPhase[selectedPhase])}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Smartphone aria-hidden className="h-4 w-4" />
              患者用ページを開く
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("insight")}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ClipboardList aria-hidden className="h-4 w-4" />
              違和感を記録する
            </button>
          </div>
          {showA4Preview && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-100 p-4">
              <div className="mx-auto max-w-2xl rounded-sm border border-slate-300 bg-white p-6 shadow-sm">
                <div className="border-b border-slate-200 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">QR付きA4資料</p>
                  <h4 className="mt-2 text-2xl font-semibold leading-8 text-slate-950">退院前に家族と確認したいこと</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">大腿骨頸部骨折で入院された方・ご家族へ</p>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_9rem]">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">確認すること</p>
                    <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                      {[
                        "家の中の段差",
                        "夜間トイレ",
                        "履物",
                        "手すり",
                        "杖・歩行器",
                        "介助する家族の負担",
                        "困ったときの相談先",
                      ].map((item) => (
                        <li key={item} className="rounded border border-slate-200 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center">
                    <DummyQr />
                    <p className="mt-2 text-xs font-semibold text-slate-700">スマホで見返す</p>
                  </div>
                </div>
                <p className="mt-5 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                  この資料は説明内容を見返すための補助資料です。実際の判断は、医師・医療機関の説明を前提とします。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function DummyQr() {
  const cells = [
    1, 1, 1, 0, 1, 0, 1, 1,
    1, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 0, 1, 0, 1,
    0, 0, 0, 1, 1, 0, 1, 0,
    1, 1, 0, 1, 0, 0, 1, 1,
    0, 1, 1, 0, 1, 1, 0, 0,
    1, 0, 0, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 0, 0, 1,
  ];

  return (
    <div className="mx-auto grid h-24 w-24 grid-cols-8 gap-0.5 rounded bg-white p-1">
      {cells.map((filled, index) => (
        <span key={index} className={filled ? "bg-slate-900" : "bg-white"} />
      ))}
    </div>
  );
}

function ContentMediaFlow({ highlighted = false }: { highlighted?: boolean }) {
  const media = ["Web記事", "PDF", "QR付きA4資料", "LINE入口", "FAQ", "職員説明メモ", "タブレット説明画面"];

  return (
    <Section id="media-flow" eyebrow="Media Expansion" title="基幹コンテンツから接続メディアへの展開図" highlighted={highlighted}>
      <div className={`rounded-lg border p-5 sm:p-7 ${highlighted ? "border-teal-400 bg-white" : "border-slate-200 bg-slate-50"}`}>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_0.2fr_1.2fr] lg:items-center">
          <div className="rounded-lg border border-teal-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Core Content</p>
            <h3 className="mt-3 text-xl font-semibold leading-8 text-slate-950">退院前に家族と確認したいこと</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              1本の基幹コンテンツを、患者・家族が見返す入口と、職員が説明に使う接続メディアへ展開する。
            </p>
          </div>
          <div className="flex justify-center text-2xl font-semibold text-teal-700">↓</div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Expansion</p>
            <MediaChips media={media} className="mt-4" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContentCardList({ onSelectSharedContent }: { onSelectSharedContent: (content: SharedContent) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(contentCards.length - 1);
  const selected = contentCards[selectedIndex];
  const selectedExpansion =
    selected.title === "退院前に家族と確認したいこと"
      ? {
          phase: "退院前／退院後の生活／家族支援",
          functions: "家族共有／不安整理／行動支援／職員説明支援",
          media: ["Web記事", "PDF", "QR付きA4資料", "LINE入口", "FAQ", "職員説明メモ", "タブレット説明画面"],
        }
      : {
          phase: selected.phase,
          functions: selected.functionLabel,
          media: [...selected.media, "タブレット説明画面"],
        };

  return (
    <Section id="contents" eyebrow="Core Contents" title="基幹コンテンツ一覧">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contentCards.map((content, index) => (
          <button
            key={content.title}
            type="button"
            onClick={() => {
              setSelectedIndex(index);
              onSelectSharedContent({
                title: content.title,
                phases: content.phase,
                media: [...content.media, "患者スマホ", "職員タブレット"],
              });
            }}
            className={`rounded-lg border p-5 text-left shadow-sm transition hover:border-teal-300 hover:bg-teal-50 ${
              index === selectedIndex ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-xs font-semibold text-teal-700">0{index + 1}</p>
            <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-950">{content.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{content.body}</p>
            <div className="mt-5 space-y-2 text-sm">
              <LabelRow label="フェーズ" value={content.phase} />
              <LabelRow label="情報・説明機能" value={content.functionLabel} />
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs font-semibold text-slate-500">接続メディア</span>
                <MediaChips media={content.media} className="mt-2" />
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Expansion Preview</p>
        <h3 className="mt-2 text-xl font-semibold leading-8 text-slate-950">{selected.title}</h3>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <PreviewItem label="対応フェーズ" value={selectedExpansion.phase} />
          <PreviewItem label="情報・説明機能" value={selectedExpansion.functions} />
        </div>
        <div className="mt-4 rounded-lg border border-teal-200 bg-white p-4">
          <p className="text-xs font-semibold text-slate-500">接続メディア</p>
          <MediaChips media={selectedExpansion.media} className="mt-3" />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          1本の基幹コンテンツを、患者・家族が見返す入口と、職員が説明に使う接続メディアへ展開します。
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-950">職員説明メモ</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">退院前説明時の確認ポイント</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>家族が退院後の生活を具体的に想像できているか</li>
              <li>夜間トイレ、段差、履物、手すりを確認したか</li>
              <li>本人が「大丈夫」と思い込みすぎていないか</li>
              <li>困ったときの相談先を家族が把握しているか</li>
              <li>QR付きA4資料を家族に共有したか</li>
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-950">FAQ例</p>
            <div className="mt-3 space-y-4 text-sm leading-6 text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Q. 退院後、夜間トイレが不安な場合はどうすればよいですか？</p>
                <p className="mt-1">
                  A. まずは退院時に説明された内容を確認し、不安がある場合は医療機関や担当者に相談してください。夜間の動線、照明、履物、手すりなども家族と確認しておくことが大切です。
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Q. 家族が確認しておくことは何ですか？</p>
                <p className="mt-1">
                  A. 段差、トイレ、入浴、歩行補助具、相談先、再診予定などを確認します。個別の介助方法は医療者の説明を前提にしてください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MediaChips({ media, className = "" }: { media: readonly string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {media.map((item) => (
        <span
          key={item}
          className="inline-flex min-h-7 items-center rounded-full border border-teal-200 bg-white px-3 text-xs font-semibold text-teal-800"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function LabelRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-lg bg-slate-50 p-3 sm:grid-cols-[7.5rem_1fr]">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className="font-medium leading-6 text-slate-800">{value}</span>
    </div>
  );
}

function InsightFormMock({
  selectedPhase,
  selectedInsight,
  selectedTarget,
  onPhaseChange,
  onInsightChange,
  onTargetChange,
  highlighted = false,
}: {
  selectedPhase: StaffPhase;
  selectedInsight: InsightType;
  selectedTarget: ImprovementTarget;
  onPhaseChange: (phase: StaffPhase) => void;
  onInsightChange: (insight: InsightType) => void;
  onTargetChange: (target: ImprovementTarget) => void;
  highlighted?: boolean;
}) {
  return (
    <Section id="insight" eyebrow="Nurse Insight" title="看護師の違和感・気づき入力画面" highlighted={highlighted}>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="mb-5">
          <SafetyNotice>{safetyNotes.insight}</SafetyNotice>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-2xl font-semibold text-slate-950">看護師の違和感・気づきメモ</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="フェーズを選ぶ">
              <select
                className="field-control"
                value={selectedPhase}
                onChange={(event) => onPhaseChange(event.target.value as StaffPhase)}
              >
                {staffPhases.map((phase) => (
                  <option key={phase}>{phase}</option>
                ))}
              </select>
            </Field>
            <Field label="対象者を選ぶ">
              <select className="field-control" defaultValue="家族">
                {["患者本人", "家族", "患者本人と家族", "職員"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="違和感の種類を選ぶ">
              <select
                className="field-control"
                value={selectedInsight}
                onChange={(event) => onInsightChange(event.target.value as InsightType)}
              >
                {insightTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field label="改善先候補を選ぶ">
              <select
                className="field-control"
                value={selectedTarget}
                onChange={(event) => onTargetChange(event.target.value as ImprovementTarget)}
              >
                {improvementTargets.map((target) => (
                  <option key={target}>{target}</option>
                ))}
              </select>
            </Field>
            <Field label="具体的な内容を書く" wide>
              <textarea
                className="field-control min-h-28"
                defaultValue="退院後の夜間トイレについて、ご家族が具体的な場面を想像できていない様子があった。"
              />
            </Field>
            <Field label="不足していそうな情報を書く" wide>
              <textarea
                className="field-control min-h-28"
                defaultValue="段差、履物、手すり、介助者の負担をまとめて確認できる短い資料があると説明しやすい。"
              />
            </Field>
          </div>
          <div className="mt-5 flex justify-end">
            <button type="button" className="min-h-11 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white">
              メモを仮保存
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ImprovementPreviewSection({
  selectedPhase,
  selectedInsight,
  selectedTarget,
  preview,
  highlighted = false,
}: {
  selectedPhase: StaffPhase;
  selectedInsight: InsightType;
  selectedTarget: ImprovementTarget;
  preview: InsightPreview;
  highlighted?: boolean;
}) {
  return (
    <Section id="improvement-preview" eyebrow="RA-SS / Improvement Preview" title="RA-SS改善プレビュー" highlighted={highlighted}>
      <div className="rounded-lg border border-teal-200 bg-white p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Preview</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">この違和感から想定される改善候補</h3>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            入力後プレビュー
          </span>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
          看護師の違和感を診断や判定に使うのではなく、説明支援に必要な情報・説明機能の不足として一次整理します。
        </p>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">選択中の入力例</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {selectedPhase} / {selectedInsight} / 改善先：{selectedTarget}
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <PreviewItem label="RA-SS整理" value={preview.rass} />
          <PreviewItem label="不足している情報・説明機能" value={preview.missingFunctions} />
          <PreviewItem label="改善先候補" value={preview.candidates.join("／")} />
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">接続メディア候補</p>
            <MediaChips media={preview.media} className="mt-3" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ImprovementLoop({ highlighted = false }: { highlighted?: boolean }) {
  return (
    <Section id="loop" eyebrow="Improvement Loop" title="改善ループ" highlighted={highlighted}>
      <div className="grid gap-3">
        {loopSteps.map((step, index) => (
          <div key={step} className="grid gap-3">
            <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p className="font-semibold leading-6 text-slate-900">{step}</p>
            </div>
            {index < loopSteps.length - 1 && (
              <div className="ml-4 flex h-6 items-center">
                <div className="h-full border-l-2 border-dashed border-teal-300" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Before / After</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-950">改善前後の比較</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-rose-200 bg-white p-4">
            <p className="font-semibold text-rose-900">改善前</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>同じ質問が多い</li>
              <li>家族共有が弱い</li>
              <li>退院後の生活がイメージできない</li>
              <li>説明資料が読まれていない</li>
            </ul>
          </div>
          <div className="rounded-lg border border-teal-200 bg-white p-4">
            <p className="font-semibold text-teal-900">改善後</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li>FAQを追加</li>
              <li>QR付きA4資料を改善</li>
              <li>職員説明メモを補足</li>
              <li>LINE入口から見返せる</li>
              <li>基幹コンテンツを更新</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          違和感を集めて終わりではなく、基幹コンテンツと接続メディアの改善に戻します。
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          違和感から改善された基幹コンテンツは、Web記事・PDF・FAQとして更新され、LINE入口から患者・家族があとから見返せる導線へ再展開されます。
        </p>
      </div>
    </Section>
  );
}

function BackyardDashboard({
  selectedPhase,
  selectedInsight,
  selectedTarget,
  preview,
  highlighted = false,
}: {
  selectedPhase: StaffPhase;
  selectedInsight: InsightType;
  selectedTarget: ImprovementTarget;
  preview: InsightPreview;
  highlighted?: boolean;
}) {
  return (
    <Section id="backyard" eyebrow="Backyard Monitor" title="運用モニター画面" highlighted={highlighted}>
      <div className="rounded-lg border border-slate-200 bg-slate-950 p-4 text-white sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">Dashboard</p>
            <h3 className="mt-2 text-2xl font-semibold">運用モニター</h3>
          </div>
          <RefreshCcw aria-hidden className="h-6 w-6 text-teal-200" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard icon={Activity} title="よく見られたフェーズ">
            <ol className="space-y-2 text-sm">
              <li>1. 退院前</li>
              <li>2. リハビリ</li>
              <li>3. 退院後の生活</li>
            </ol>
          </MetricCard>
          <MetricCard icon={FileText} title="よく開かれた基幹コンテンツ">
            <p>退院前資料、リハビリ説明、相談先FAQ</p>
          </MetricCard>
          <MetricCard icon={QrCode} title="QR利用状況">
            <p className="text-3xl font-semibold text-white">128</p>
            <p className="mt-1">退院前資料からのアクセス</p>
          </MetricCard>
          <MetricCard icon={MessageCircle} title="LINE入口利用状況">
            <p className="text-3xl font-semibold text-white">42</p>
            <p className="mt-1">相談先確認ページへの流入</p>
          </MetricCard>
          <MetricCard icon={ClipboardList} title="看護師の違和感件数">
            <p className="text-3xl font-semibold text-white">17</p>
            <p className="mt-1">今月の改善候補メモ</p>
          </MetricCard>
          <MetricCard icon={Users} title="改善候補コンテンツ">
            <ul className="space-y-2 text-sm">
              <li>退院前に家族と確認したいこと</li>
              <li>リハビリはなぜ必要か</li>
              <li>困ったときの相談先</li>
            </ul>
          </MetricCard>
          <MetricCard icon={BarChart3} title="違和感集計">
            <ul className="space-y-2 text-sm">
              <li className={highlighted ? "rounded bg-amber-300/20 px-2 py-1 text-amber-100" : ""}>
                退院前 × 家族共有不足：仮反映中 +1
              </li>
              <li>リハビリ × 理解支援不足：11件</li>
              <li>発症時 × 行動迷い：8件</li>
            </ul>
          </MetricCard>
          <MetricCard icon={MessageCircle} title="LINEからの再閲覧">
            <ul className="space-y-2 text-sm">
              <li className={highlighted ? "rounded bg-amber-300/20 px-2 py-1 text-amber-100" : ""}>
                退院前チェック：42件
              </li>
              <li>困ったときの相談先：18件</li>
              <li>リハビリはなぜ必要か：15件</li>
              <li>家族と確認すること：13件</li>
            </ul>
          </MetricCard>
        </div>
        <div className={`mt-4 rounded-lg border p-4 ${highlighted ? "border-amber-200 bg-amber-300/20" : "border-white/10 bg-white/8"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-100">Draft Reflection</p>
          <h4 className="mt-2 text-xl font-semibold text-white">仮反映中の改善候補</h4>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-100 md:grid-cols-2">
            <p>
              <span className="font-semibold text-white">フェーズ：</span>
              {selectedPhase}
            </p>
            <p>
              <span className="font-semibold text-white">違和感：</span>
              {selectedInsight}
            </p>
            <p>
              <span className="font-semibold text-white">不足している情報・説明機能：</span>
              {preview.missingFunctions}
            </p>
            <p>
              <span className="font-semibold text-white">改善候補：</span>
              {preview.candidates[0]}
            </p>
            <p className="md:col-span-2">
              <span className="font-semibold text-white">推奨メディア：</span>
              {selectedTarget === "QR付き資料" ? "QR付きA4資料／LINE入口／職員説明メモ" : preview.media.join("／")}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg border border-amber-300/50 bg-amber-300/10 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">Next Action</p>
              <h4 className="mt-2 text-xl font-semibold text-white">次の改善アクション</h4>
            </div>
            <span className="inline-flex w-fit rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-slate-950">
              改善優先度：高
            </span>
          </div>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-100 md:grid-cols-2">
            <p>
              <span className="font-semibold text-white">対象：</span>
              退院前に家族と確認したいこと
            </p>
            <p>
              <span className="font-semibold text-white">理由：</span>
              退院前フェーズの閲覧数、家族共有不足の違和感件数、LINEからの再閲覧数が多い
            </p>
            <p className="md:col-span-2">
              <span className="font-semibold text-white">次の対応：</span>
              FAQ追加、QR付きA4資料の改善、職員説明ポイントの補足
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MetricCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Activity;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/8 p-4">
      <div className="flex items-center gap-2 text-teal-100">
        <Icon aria-hidden className="h-4 w-4" />
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <div className="mt-4 text-sm leading-6 text-slate-200">{children}</div>
    </div>
  );
}

function DecisionSupportSections() {
  return (
    <>
      <SafetyDesignSection />
      <PocMetricsSection />
      <StakeholderValueSection />
      <NextPocPlanSection />
      <ExpansionImageSection />
      <DemoScriptSection />
      <OperationRolesSection />
      <PocImplementationPackageSection />
    </>
  );
}

function SafetyDesignSection() {
  const cards = [
    {
      title: "LINEには医療情報そのものを置かない",
      body: "LINEは、医療情報そのものを置く場所ではなく、Web記事・PDF・FAQなどの中心コンテンツへ戻るための入口として扱う。医療情報の本体は、医療機関が確認・管理できる場所に置く。",
    },
    {
      title: "診断・治療判断は扱わない",
      body: "本PoCは、症状判断、診断、治療方針、緊急度判定を行わない。個別の判断は、医師・医療機関の説明を前提とする。",
    },
    {
      title: "基幹コンテンツは医療者確認前提",
      body: "疾患説明、手術、リハビリ、退院後の注意点など、医療的正確性が必要な内容は、医師・看護師・専門職の確認を前提とする。",
    },
    {
      title: "個人情報は扱わない",
      body: "PoC段階では、患者個人情報、診療情報、個別症状は入力しない。看護師の違和感も、個人が特定されない形で扱う。",
    },
  ];

  return (
    <Section id="safety-design" eyebrow="Safety Design" title="医療情報安全設計">
      <p className="max-w-3xl text-base leading-8 text-slate-700">
        このPoCは、医療判断や診断を行うものではありません。
        患者さん・ご家族が説明内容を見返し、職員が説明に使いやすくするための情報導線を検討するものです。
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((card, index) => (
          <div key={card.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold text-teal-700">0{index + 1}</p>
            <h3 className="mt-3 text-lg font-semibold leading-7 text-slate-950">{card.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{card.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-slate-950">広報モジュール開発に含まれないこと</h3>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <li>完成システム開発</li>
          <li>LINE API本番連携</li>
          <li>WP実装の無制限対応</li>
          <li>医療監修の代行</li>
          <li>院内承認フローの代行</li>
          <li>患者個人情報を扱う仕組み</li>
          <li>継続運用代行</li>
        </ul>
      </div>
    </Section>
  );
}

function PocMetricsSection() {
  const groups = [
    {
      title: "患者・家族側",
      items: ["退院前ページ閲覧数", "QR付きA4資料の利用数", "LINE入口からの再閲覧数", "FAQ閲覧数", "家族共有導線の利用状況"],
    },
    {
      title: "職員側",
      items: ["看護師の違和感メモ件数", "同じ質問の減少感", "説明時に使われた基幹コンテンツ数", "職員説明メモの利用状況"],
    },
    {
      title: "改善側",
      items: ["改善候補になった基幹コンテンツ数", "FAQ追加数", "QR付きA4資料の改善数", "LINE入口の見直し数", "職員説明ポイントの補足数"],
    },
  ];
  const samples = [
    ["退院前ページ閲覧数", "128"],
    ["LINEからの再閲覧", "42"],
    ["看護師の違和感メモ", "17"],
    ["FAQ追加候補", "5"],
    ["改善反映数", "3"],
  ];

  return (
    <Section id="poc-metrics" eyebrow="PoC Metrics" title="PoCで検証する指標">
      <p className="max-w-3xl text-base leading-8 text-slate-700">
        このPoCでは、完成システムの導入ではなく、患者・家族・職員が使える情報導線として成立するかを確認します。
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-950">{group.title}</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Sample Metrics</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {samples.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-teal-200 bg-white p-4">
              <p className="text-3xl font-semibold text-slate-950">{value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">数値はPoC表示用のサンプルです。</p>
      </div>
    </Section>
  );
}

function StakeholderValueSection() {
  const values = [
    {
      title: "患者・家族",
      body: "自分の疾患と現在のフェーズに沿って、必要な情報をスマホで見返せる。退院後もQRやLINE入口から確認できる。",
    },
    {
      title: "看護師",
      body: "説明に使う基幹コンテンツ、QR付きA4資料、職員説明メモを参照できる。現場で感じた違和感を、改善候補として残せる。",
    },
    {
      title: "医師・リハ職",
      body: "医療的な説明の補助情報や、リハビリ理解支援コンテンツを確認できる。患者・家族に伝える内容の土台を共有できる。",
    },
    {
      title: "広報・事務",
      body: "Web記事、PDF、FAQ、LINE入口、QR導線を、基幹コンテンツ単位で整理できる。媒体別にバラバラな情報管理を減らせる。",
    },
    {
      title: "病院全体",
      body: "医療接触前の不安を小さくし、入院中の説明ズレを抑え、退院後の不安を早期に回収する情報導線を整えられる。",
    },
  ];

  return (
    <Section id="stakeholder-value" eyebrow="Stakeholder Value" title="関係者別に見た価値">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-950">{value.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{value.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function NextPocPlanSection() {
  const steps = [
    {
      title: "整形外科 1疾患で検証",
      body: "対象：大腿骨頸部骨折／大腿骨近位部骨折",
    },
    {
      title: "退院前フェーズに集中",
      body: "家族共有、転倒予防、相談先、退院後の生活の見通しを重点確認する",
    },
    {
      title: "QR資料・LINE入口・職員メモを試す",
      body: "患者・家族はスマホで見返し、職員はタブレットで説明に使う",
    },
    {
      title: "違和感から改善サイクルを見る",
      body: "看護師の違和感をRA-SS的に整理し、FAQ、PDF、LINE入口、職員説明メモの改善候補にする",
    },
    {
      title: "他疾患へ横展開する",
      body: "整形外科内の人工関節・脊椎疾患、さらに心不全、脳卒中、糖尿病教育などへ展開可能性を確認する",
    },
  ];

  return (
    <Section id="next-poc-plan" eyebrow="Next PoC Plan" title="次のPoC計画">
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div key={step.title} className="grid gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <span className="inline-flex h-9 w-fit shrink-0 items-center rounded-full bg-teal-700 px-3 text-sm font-semibold text-white">
                  Step {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{step.body}</p>
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-4 flex h-5 items-center">
                <div className="h-full border-l-2 border-dashed border-teal-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function ExpansionImageSection() {
  const candidates = ["人工股関節・人工膝関節", "脊椎疾患", "脳卒中", "心不全", "糖尿病教育", "がん術後生活支援", "退院支援全般"];

  return (
    <Section id="expansion-image" eyebrow="Expansion Image" title="横展開イメージ">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">First PoC</p>
          <div className="mt-4 space-y-3">
            {["整形外科", "大腿骨頸部骨折", "退院前・退院後の生活支援"].map((item, index, items) => (
              <div key={item}>
                <div className="rounded-lg border border-teal-200 bg-white p-4 text-center font-semibold text-slate-950">
                  {item}
                </div>
                {index < items.length - 1 && <div className="py-2 text-center text-xl font-semibold text-teal-700">↓</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-950">横展開候補</h3>
          <MediaChips media={candidates} className="mt-4" />
          <p className="mt-5 text-sm leading-7 text-slate-700">
            1疾患群で型を検証し、診療科・疾患群ごとの包括患者支援モジュールとして横展開します。
          </p>
        </div>
      </div>
    </Section>
  );
}

function DemoScriptSection() {
  const script = `このPoCは、大腿骨頸部骨折の患者さんとご家族を、発症から退院後の生活まで支える情報導線の試作です。

まず職員は、同じ基幹コンテンツをタブレットで開き、退院前フェーズの説明ポイントやQR付きA4資料を使って説明します。
患者さん・ご家族は、説明後にスマホで退院前の情報を見返します。

説明の中で、看護師が『家族に共有されていないかもしれない』『退院後に困りそう』と感じた違和感を入力します。
その違和感はRA-SS的に整理され、不足している情報・説明機能として見える化されます。

改善候補になった基幹コンテンツは、Web記事、PDF、QR、LINE入口、FAQ、職員説明メモへ再展開されます。
退院後には、患者さんやご家族がLINE入口やQRからもう一度見返すことができます。

このPoCでは、医療判断ではなく、患者・家族の理解支援と職員の説明支援、そして情報改善の流れを検証します。`;

  return (
    <Section id="demo-script" eyebrow="One Minute Script" title="1分デモ台本">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <p className="whitespace-pre-line text-base leading-8 text-slate-800">「{script}」</p>
      </div>
    </Section>
  );
}

function OperationRolesSection() {
  const roles = [
    ["看護師", "違和感メモ、説明時の利用、FAQ候補の発見"],
    ["広報・事務", "Web記事、PDF、QR、LINE入口の反映"],
    ["医師・専門職", "疾患説明、治療説明、リハビリ内容の確認"],
    ["現場責任者", "改善優先度の確認、導入範囲の判断"],
    ["管理者", "バックヤード指標の確認、更新状況の管理"],
  ];

  return (
    <Section id="operation-roles" eyebrow="Operation Roles" title="想定する運用ロール">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="grid grid-cols-[8rem_1fr] border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 sm:grid-cols-[12rem_1fr]">
          <div className="p-4">役割</div>
          <div className="border-l border-slate-200 p-4">主な担当</div>
        </div>
        {roles.map(([role, duty]) => (
          <div key={role} className="grid grid-cols-[8rem_1fr] border-b border-slate-200 last:border-b-0 sm:grid-cols-[12rem_1fr]">
            <div className="p-4 text-sm font-semibold text-slate-950">{role}</div>
            <div className="border-l border-slate-200 p-4 text-sm leading-6 text-slate-700">{duty}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PocImplementationPackageSection() {
  return (
    <Section id="poc-package" eyebrow="PoC Package" title="PoC実施パッケージ">
      <p className="max-w-3xl text-base leading-8 text-slate-700">
        このPoCは、完成システムを一括導入するものではありません。
        まずは整形外科の1疾患・1フェーズに絞り、患者・家族が見返せる情報導線、職員が説明に使える資料、看護師の違和感を改善に戻す流れを小さく検証します。
      </p>
      <div className="mt-7 space-y-6">
        <TrialScopeCard />
        <PreStartChecklistCard />
        <WeeklyOperationCard />
        <RiskCountermeasureCard />
        <PostPocDecisionCard />
        <FinalSlideCard />
      </div>
    </Section>
  );
}

function PocDesignLinkSection() {
  return (
    <section id="decision-area" className="scroll-mt-24 border-t border-slate-200 bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-lg border border-white/10 bg-white/8 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">PoC Design</p>
          <h2 className="mt-2 text-xl font-semibold">PoCの設計・安全性・実施範囲を確認する</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-200">
            このページは、大腿骨頸部骨折PoCの画面デモに絞っています。PoCの目的、安全設計、実施範囲、検証指標、医療者確認・監修の考え方は、PoC設計ページで確認できます。
          </p>
        </div>
        <a
          href="/rass-ic-module-poc"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          PoC設計を見る
        </a>
      </div>
    </section>
  );
}

function TrialScopeCard() {
  const materials = ["退院前に家族と確認したいこと", "QR付きA4資料", "LINE入口", "FAQ", "職員説明メモ"];
  const roles = ["看護師", "リハビリ職", "医師または専門職確認者", "広報・事務担当", "現場責任者"];

  return (
    <div className="rounded-lg border border-teal-200 bg-teal-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Trial Scope</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">まず小さく試す範囲</h3>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <ScopeRow label="対象病棟" value="整形外科病棟、または大腿骨頸部骨折の退院支援に関わる病棟" />
          <ScopeRow label="対象疾患" value="大腿骨頸部骨折／大腿骨近位部骨折" />
          <ScopeRow
            label="対象フェーズ"
            value="退院前フェーズに集中。退院後の生活、家族共有、転倒予防、相談先確認を重点対象にする"
          />
          <ScopeRow label="試行期間" value="まずは1〜2週間" />
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-teal-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">対象資料</p>
            <MediaChips media={materials} className="mt-3" />
          </div>
          <div className="rounded-lg border border-teal-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">使う職種</p>
            <MediaChips media={roles} className="mt-3" />
          </div>
        </div>
      </div>
      <p className="mt-5 rounded-lg border border-teal-200 bg-white p-4 text-sm leading-7 text-slate-700">
        最初から全疾患・全病棟に広げず、1疾患・1フェーズ・少数資料で検証します。
      </p>
    </div>
  );
}

function ScopeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-teal-200 bg-white p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-7 text-slate-800">{value}</p>
    </div>
  );
}

function PreStartChecklistCard() {
  const checklist = [
    "医師または専門職が確認した基幹コンテンツがある",
    "QR付きA4資料を病棟・外来で配布できる",
    "患者・家族がスマホで見返せるURLがある",
    "LINE入口はリンク集として運用する",
    "LINEには医療情報そのものを置かない",
    "看護師が違和感メモを残せる",
    "違和感メモに個人情報を入力しない",
    "改善候補を週1回確認する担当者がいる",
    "FAQや資料の修正判断をする人が決まっている",
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Pre Check</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">開始前チェックリスト</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {checklist.map((item) => (
          <div key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
            <p className="text-sm font-medium leading-6 text-slate-800">{item}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-700">
        すべてを完全に整えてから始めるのではなく、安全に試すための最低条件を確認します。
      </p>
    </div>
  );
}

function WeeklyOperationCard() {
  const operations = [
    {
      day: "月曜",
      body: "退院前説明で使うQR付きA4資料と職員説明メモを確認する",
    },
    {
      day: "火曜〜木曜",
      body: "退院前説明時に、患者・家族へQR付きA4資料を案内する。必要に応じてLINE入口から見返せることを説明する",
    },
    {
      day: "随時",
      body: "看護師が「家族に共有されていない」「退院後に困りそう」などの違和感を選択式で記録する",
    },
    {
      day: "金曜",
      body: "違和感メモ、LINE再閲覧、FAQ閲覧、同じ質問の傾向を確認する",
    },
    {
      day: "翌週",
      body: "FAQ、QR付きA4資料、職員説明メモの改善候補を1〜2件だけ反映する",
    },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Weekly Operation</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">PoC期間中の1週間運用イメージ</h3>
      <div className="mt-5 grid gap-3">
        {operations.map((operation, index) => (
          <div key={operation.day} className="grid gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                <span className="inline-flex w-fit shrink-0 rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
                  {operation.day}
                </span>
                <p className="text-sm font-medium leading-7 text-slate-800">{operation.body}</p>
              </div>
            </div>
            {index < operations.length - 1 && (
              <div className="ml-4 flex h-4 items-center">
                <div className="h-full border-l-2 border-dashed border-teal-300" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-700">
        毎日大きな作業をするのではなく、説明時に使い、違和感を少し残し、週1回だけ改善候補を見る運用を想定します。
      </p>
    </div>
  );
}

function RiskCountermeasureCard() {
  const risks = [
    {
      title: "医療情報の誤解",
      body: "基幹コンテンツは医療者確認を前提とする。医療判断、診断、治療方針は扱わない。患者向け画面には注意書きを表示する。",
    },
    {
      title: "LINEへの過信",
      body: "LINEは医療情報そのものを置く場所ではなく、Web記事・PDF・FAQへ戻る入口として扱う。個別医療相談や緊急判断には使わない。",
    },
    {
      title: "入力負担の増加",
      body: "違和感メモは自由記述中心ではなく、選択式を基本にする。1件30秒程度で残せる形にする。",
    },
    {
      title: "更新が止まる",
      body: "バックヤードで改善候補を可視化する。週1回、1〜2件だけ改善候補を確認する。",
    },
    {
      title: "個人情報の混入",
      body: "PoC段階では患者名、ID、個別症状、診療情報を入力しない。違和感は個人が特定されない形で扱う。",
    },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Risk Control</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">想定リスクと対策</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {risks.map((risk) => (
          <div key={risk.title} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h4 className="font-semibold text-amber-950">{risk.title}</h4>
            <p className="mt-2 text-xs font-semibold text-amber-800">対策</p>
            <p className="mt-1 text-sm leading-7 text-slate-700">{risk.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostPocDecisionCard() {
  const decisions = [
    {
      title: "継続",
      body: "患者・家族の再閲覧、職員の説明利用、違和感メモの蓄積が確認できた場合、同じ疾患・同じフェーズで継続する。",
    },
    {
      title: "一部改善して再試行",
      body: "資料が使いにくい、LINE入口がわかりにくい、入力負担が大きい場合、対象を絞って再試行する。",
    },
    {
      title: "他疾患へ横展開",
      body: "退院前フェーズで型が確認できた場合、人工関節、脊椎疾患、脳卒中、心不全、糖尿病教育などへ横展開を検討する。",
    },
    {
      title: "中止・保留",
      body: "現場負担が大きい、確認体制が整わない、医療情報管理に不安が残る場合は中止または保留する。",
    },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Decision Criteria</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-950">PoC後の判断基準</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {decisions.map((decision) => (
          <div key={decision.title} className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="font-semibold text-slate-950">{decision.title}</h4>
            <p className="mt-2 text-sm leading-7 text-slate-700">{decision.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-700">
        PoCは成功前提ではなく、続ける・直す・広げる・止めるを判断するための小さな検証です。
      </p>
    </div>
  );
}

function FinalSlideCard() {
  const items = [
    {
      label: "何を検証するか",
      value: "患者・家族が退院前情報を見返せるか。職員が説明に使えるか。看護師の違和感を改善候補に戻せるか。",
    },
    {
      label: "何をしないか",
      value: "診断、治療判断、個別医療相談、LINE上での医療情報管理は行わない。",
    },
    {
      label: "最初の対象",
      value: "整形外科 × 大腿骨頸部骨折 × 退院前フェーズ",
    },
    {
      label: "使うもの",
      value: "Web記事、QR付きA4資料、LINE入口、FAQ、職員説明メモ、違和感メモ",
    },
    {
      label: "見る指標",
      value: "退院前ページ閲覧数、QR利用数、LINE再閲覧数、違和感メモ件数、FAQ追加候補、改善反映数",
    },
    {
      label: "次の判断",
      value: "継続、一部改善、横展開、中止・保留",
    },
  ];

  return (
    <div className="rounded-lg border border-slate-900 bg-slate-950 p-5 text-white sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">Closing Slide</p>
      <h3 className="mt-2 text-xl font-semibold">説明会の最後に確認すること</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-white/8 p-4">
            <p className="text-xs font-semibold text-teal-100">{item.label}</p>
            <p className="mt-2 text-sm leading-7 text-slate-100">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-lg border border-amber-200/60 bg-amber-200 px-4 py-3 text-sm font-semibold leading-6 text-slate-950">
        まずは1疾患・1フェーズ・1〜2週間で、小さく安全に試します。
      </p>
    </div>
  );
}

function Disclaimer() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-5">
        <p className="text-sm leading-7 text-slate-700">
          本プロトタイプは、医療判断、診断、治療方針の提示を目的とするものではありません。
          患者さん・ご家族の理解支援、職員の説明支援、情報導線の検討を目的としたPoCです。
          実際の医療情報として利用する場合は、医師・医療機関による確認を前提とします。
        </p>
      </div>
    </section>
  );
}

const hiddenDesignSectionsForReference = [DischargeRouteSummary, ConceptFormula, ContentMediaFlow, ContentCardList, DecisionSupportSections];
void hiddenDesignSectionsForReference;

export default function PocOrthopedicSupportPage() {
  const [selectedPatientPhase, setSelectedPatientPhase] = useState<PatientPhase>("退院前");
  const [selectedLineMenu, setSelectedLineMenu] = useState<string>(patientToLineMenu["退院前"]);
  const [selectedStaffPhase, setSelectedStaffPhase] = useState<StaffPhase>("退院前");
  const [sharedContent, setSharedContent] = useState<SharedContent>(sharedContentByPatientPhase["退院前"]);
  const [selectedInsightPhase, setSelectedInsightPhase] = useState<StaffPhase>("退院前");
  const [selectedInsight, setSelectedInsight] = useState<InsightType>("家族に共有されていない");
  const [selectedTarget, setSelectedTarget] = useState<ImprovementTarget>("QR付き資料");
  const [activeDemoStepIndex, setActiveDemoStepIndex] = useState<number | null>(null);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const insightPreview = getInsightPreview(selectedInsightPhase, selectedInsight, selectedTarget);
  const activeDemoStep = activeDemoStepIndex === null ? null : demoSteps[activeDemoStepIndex].id;

  useEffect(() => {
    document.title = "大腿骨頸部骨折PoCデモ｜疾患別IC支援モジュール代表事例";
  }, []);

  const syncFromPatientPhase = (phase: PatientPhase) => {
    setSelectedPatientPhase(phase);
    setSelectedLineMenu(patientToLineMenu[phase]);
    setSelectedStaffPhase(patientToStaffPhase[phase]);
    setSharedContent(sharedContentByPatientPhase[phase]);
  };

  const syncFromStaffPhase = (phase: StaffPhase) => {
    setSelectedStaffPhase(phase);
    const patientPhase = staffToPatientPhase[phase];
    setSelectedPatientPhase(patientPhase);
    setSelectedLineMenu(patientToLineMenu[patientPhase]);
    setSharedContent(sharedContentByPatientPhase[patientPhase]);
  };

  const syncFromLineMenu = (menu: string) => {
    const patientPhase = lineMenuToPatient[menu] ?? "退院前";
    setSelectedLineMenu(menu);
    setSelectedPatientPhase(patientPhase);
    setSelectedStaffPhase(patientToStaffPhase[patientPhase]);
    setSharedContent(sharedContentByPatientPhase[patientPhase]);
  };

  const openPatientPage = (phase: PatientPhase) => {
    syncFromPatientPhase(phase);
    window.requestAnimationFrame(() => scrollToSection("patient"));
  };

  const prepareDischargeDemo = () => {
    setSelectedPatientPhase("退院前");
    setSelectedStaffPhase("退院前");
    setSelectedLineMenu("退院前チェック");
    setSharedContent(sharedContentByPatientPhase["退院前"]);
    setSelectedInsightPhase("退院前");
    setSelectedInsight("家族に共有されていない");
    setSelectedTarget("QR付き資料");
  };

  const moveDemoTo = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, demoSteps.length - 1));
    prepareDischargeDemo();
    setActiveDemoStepIndex(safeIndex);
    setDemoCompleted(safeIndex === demoSteps.length - 1);
    window.requestAnimationFrame(() => scrollToSection(demoSteps[safeIndex].targetId));
  };

  const startDemo = () => {
    setDemoCompleted(false);
    moveDemoTo(0);
  };
  const endDemo = () => setActiveDemoStepIndex(null);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <style>{`
        .field-control {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(203 213 225);
          background: white;
          padding: 0.75rem 0.875rem;
          color: rgb(15 23 42);
          font-size: 0.95rem;
          line-height: 1.5rem;
          outline: none;
        }
        .field-control:focus {
          border-color: rgb(15 118 110);
          box-shadow: 0 0 0 3px rgb(20 184 166 / 0.18);
        }
      `}</style>
      <PocHero />
      <MiniNav />
      <DemoProgressCard
        activeStepIndex={activeDemoStepIndex}
        onPrev={() => activeDemoStepIndex !== null && moveDemoTo(activeDemoStepIndex - 1)}
        onNext={() => activeDemoStepIndex !== null && moveDemoTo(activeDemoStepIndex + 1)}
        onEnd={endDemo}
      />
      <SharedContentBar content={sharedContent} demoActive={activeDemoStepIndex !== null} />
      <DemoGuide onStartDemo={startDemo} />
      <StaffTabletMock
        selectedPhase={selectedStaffPhase}
        onSelectPhase={syncFromStaffPhase}
        onOpenPatientPage={openPatientPage}
        highlighted={activeDemoStep === "staff"}
      />
      <PatientPhoneMock
        selectedPhase={selectedPatientPhase}
        onSelectPhase={syncFromPatientPhase}
        highlighted={activeDemoStep === "patient"}
      />
      <InsightFormMock
        selectedPhase={selectedInsightPhase}
        selectedInsight={selectedInsight}
        selectedTarget={selectedTarget}
        onPhaseChange={setSelectedInsightPhase}
        onInsightChange={setSelectedInsight}
        onTargetChange={setSelectedTarget}
        highlighted={activeDemoStep === "insight"}
      />
      <ImprovementPreviewSection
        selectedPhase={selectedInsightPhase}
        selectedInsight={selectedInsight}
        selectedTarget={selectedTarget}
        preview={insightPreview}
        highlighted={activeDemoStep === "preview"}
      />
      <LineEntryMock
        selectedMenu={selectedLineMenu}
        onSelectMenu={syncFromLineMenu}
        highlighted={activeDemoStep === "line-entry"}
      />
      <BackyardDashboard
        selectedPhase={selectedInsightPhase}
        selectedInsight={selectedInsight}
        selectedTarget={selectedTarget}
        preview={insightPreview}
        highlighted={activeDemoStep === "backyard"}
      />
      <ImprovementLoop highlighted={activeDemoStep === "loop"} />
      <DemoSummaryCard visible={demoCompleted} />
      <DemoScriptSection />
      <PocDesignLinkSection />
      <Disclaimer />
    </main>
  );
}
