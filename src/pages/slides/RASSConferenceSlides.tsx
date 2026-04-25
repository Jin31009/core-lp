import { useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  body: string[];
  emphasis: string;
  note: string;
  panelLead?: string;
  detailPanels?: {
    title: string;
    eyebrow?: string;
    stats?: string[];
    note?: string;
    content?: string;
  }[];
};

export default function RASSConferenceSlides() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "01",
        kind: "hero",
        title: "ナラティブは“感想”ではない",
        subtitle: "―― 構造として扱える対象である",
        body: [
          "302件の患者ナラティブを同一条件で分析",
          "ズレを“構造”として記述可能にする",
          "主観 → 再現可能な理解対象へ転換",
        ],
        emphasis: "主観 → 構造（扱える）",
        note: "本研究は、これまで主観的で扱いにくいとされてきたナラティブを、再現可能な構造として捉え直すことを目的とする。患者の語りを単なる感想として消費するのではなく、分析可能な対象として再定義することで、関係のズレを構造として理解し、その理解を次の設計や介入へと接続する可能性を開く。",
      },
      {
        id: "02",
        kind: "standard",
        title: "なぜナラティブは扱いにくいのか",
        subtitle: "従来の限界",
        body: [
          "主観的で再現性が低い",
          "比較・蓄積ができない",
          "行動設計につながらない",
        ],
        emphasis: "重要だが使えない",
        note: "問題を“構造的に”認識させる。",
      },
      {
        id: "03",
        kind: "question",
        title: "構造として扱えないのか？",
        subtitle: "研究の問い",
        body: [
          "ナラティブを構造として記述できるか",
          "記述できれば介入設計に使えるか",
        ],
        emphasis: "ここから研究が始まる",
        note: "問いを一文で理解させる。",
        detailPanels: [
          {
            eyebrow: "STRUCTURE",
            title: "構造として扱えるか",
            stats: [
              "個別記述ではなく構造として扱えるか",
              "同一フィルターで比較可能か",
              "状態として記述できるか",
            ],
            note:
              "本研究の第一の問いは、ナラティブを感想ではなく、構造として記述しうる対象として扱えるかにある。",
          },
          {
            eyebrow: "APPLICABILITY",
            title: "接点に接続できるか",
            stats: [
              "接点に還元できるか",
              "行為設計に接続できるか",
              "介入判断に利用できるか",
            ],
            note:
              "構造として記述できた場合、それが接点での判断や介入設計にどのように接続されうるかが次の問いとなる。",
          },
        ],
      },
      {
        id: "04",
        kind: "standard",
        title: "観測設計",
        subtitle: "患者ナラティブ302件を、同一条件・同一フィルターで観測する。",
        body: [
          "対象：投書データを母集団として扱う",
          "条件：個別事例ではなく同一条件で比較する",
          "方法：同一フィルターで構造を読む",
        ],
        emphasis: "ここから観測設計",
        note: "ナラティブを構造として扱うためには、観測条件を統一することが前提となる。本章では、分析対象と観測条件を意図的に揃えることで、個別の印象や偶然性に依存しない比較を可能にし、その後の構造・変異・欠損の把握が一貫して成立する基盤を整える。",
      },
      {
        id: "05",
        kind: "standard",
        title: "フィルターの採用",
        subtitle: "―― 構造を記述するための視角",
        body: [
          "配置として把握する｜AKフィルター",
          "変異を把握する｜Δ / e / Triggerフィルター",
          "接点欠損を把握する｜APCE_Missフィルター",
        ],
        emphasis: "フィルターによる構造記述",
        note: "分析フレーム＝フィルターとして明確化する。",
        detailPanels: [
          {
            eyebrow: "AK / SRPL",
            title: "配置をみるための視点",
            stats: [
              "S｜安全",
              "R｜尊厳",
              "P｜見通し",
              "L｜役割",
            ],
            note:
              "AKは、患者側で未充足として知覚された条件を、SRPLの配置として記述するための観測視点である。本研究では、SRPLを未充足条件として読む操作的定義を採用する。",
          },
          {
            eyebrow: "DELTA / EVENT / TRIGGER",
            title: "変異をみるための視点",
            stats: [
              "Δ：ズレ強度",
              "e：イベント段階",
              "Trigger｜転換点",
            ],
            note:
              "これらはズレの強度や転換局面を記述するための観測指標である。",
          },
          {
            eyebrow: "APCE-MISS",
            title: "欠損をみるための視点",
            stats: [
              "A：認識",
              "P：見通し提示",
              "C：状況接続",
              "E：感情処理",
            ],
            note:
              "APCE_Missは、接点において何が欠けていたかを記述するための観測視点である。",
          },
        ],
      },
      {
        id: "06",
        kind: "standard",
        title: "構造の把握",
        subtitle: "―― ズレを未充足条件として読む",
        body: [
          "SRPLとして配置される",
          "複数条件の組み合わせとして現れる",
          "単一原因ではない構造として観測される",
        ],
        emphasis: "ズレ＝構造",
        note: "状態＝構造として読むことを強調。",
        detailPanels: [
          {
            eyebrow: "SRPL DISTRIBUTION",
            title: "未充足条件の配置構造",
            stats: [
              "S｜安全　114件（37.7%）",
              "L｜役割　85件（28.1%）",
              "P｜見通し　51件（16.9%）",
              "R｜尊厳　49件（16.2%）",
            ],
            note:
              "ズレは単一原因ではなく、SRPLの配置として観測される。",
          },
          {
            eyebrow: "COMBINATION",
            title: "複数条件の組み合わせ",
            stats: [
              "単独｜SRPL単独　186件",
              "複合｜SRPL複合　81件",
              "P＋R｜見通し＋尊厳　26件",
              "P＋S｜見通し＋安全　21件",
            ],
            note:
              "未充足条件は単独要素だけでなく、複数条件の重なりとして観測される。",
          },
          {
            eyebrow: "INTERPRETATION",
            title: "配置として読む",
            stats: [
              "単独の条件だけでは現れない",
              "複数条件の重なりが見られる",
              "原因ではなく配置として記述する",
            ],
            note:
              "観測上、ズレは単独の条件だけでなく複数条件の重なりとして現れるため、単一原因へ還元せず、未充足条件の配置として記述する。",
          },
        ],
      },
      {
        id: "07",
        kind: "diagram",
        title: "変異の把握",
        subtitle: "―― 転換はジャンプとして観測される",
        body: [
          "Δ指標として観測される",
          "非連続的な変異として現れる",
          "転換は条件別に観測される",
        ],
        emphasis: "変異としてのズレ",
        note: "進行ではなく“変異”として理解させる。時間的進行を直接示すものではなく、条件別に観測される指標である。",
        detailPanels: [
          {
            eyebrow: "DELTA DISTRIBUTION",
            title: "ズレの観測範囲",
            stats: [
              "Δ0：54件（17.9%）",
              "Δ1以上：248件（82.1%）",
            ],
            note:
              "ズレは特定の例外ではなく、広く観測される現象である。",
          },
          {
            eyebrow: "EVENT / TRIGGER",
            title: "観測される状態の広がり",
            stats: [
              "e2継続：162件（53.6%）",
              "Trigger：67件（22.2%）",
              "e3：59件（19.5%）",
            ],
            note:
              "これらは進行過程を示すものではなく、同一母集団に対する条件別の観測指標である。したがって時間的遷移として解釈されるものではない。",
          },
          {
            eyebrow: "DELTA JUMP",
            title: "非連続的な変異",
            stats: [
              "Δ0〜Δ2：転換なし",
              "Δ3以上：転換が観測される",
              "連続変化ではない",
            ],
            note:
              "転換は段階的に進むのではなく、Δ2からΔ3への非連続的な変化として観測される。",
          },
        ],
      },
      {
        id: "08",
        kind: "diagram",
        title: "欠損の把握",
        subtitle: "―― 接点の問題は重なり構造を持つ",
        body: [
          "接点欠損として観測される",
          "分散と集中の構造を持つ",
          "複数欠損の重なりとして現れる",
        ],
        emphasis: "欠損構造",
        note: "接点の問題＝欠損として統一的に理解させる。",
        detailPanels: [
          {
            eyebrow: "PRIMARY MISS",
            title: "主として認識される欠損",
            stats: [
              "A｜認識不足　52.3%",
              "E｜見通し不足　10.3%",
              "C｜説明不足　8.9%",
              "P｜手順不明　4.6%",
            ],
            note:
              "個別事例では、欠損は一つの主欠損として焦点化される。",
          },
          {
            eyebrow: "APCE DISTRIBUTION",
            title: "接点欠損の分布",
            stats: [
              "E｜共感　41.1%",
              "C｜接続　40.1%",
              "A｜認識　12.3%",
              "P｜見通し提示　6.6%",
            ],
            note:
              "接点欠損は単一要素ではなく、広く分散して観測される。",
          },
          {
            eyebrow: "STRUCTURE",
            title: "欠損の二層構造",
            stats: [
              "集中（Primary）",
              "分散（All）",
              "同時に存在する",
            ],
            note:
              "接点欠損は、広がりと集中の二層構造として観測される。本分析は原因を特定するものではなく、欠損の構造を記述するものである。",
          },
        ],
      },
      {
        id: "09",
        kind: "insight",
        title: "ナラティブは（構造・変異・欠損）として記述可能",
        subtitle: "—— 構造として把握できる対象であり、次に個別事例で確認する",
        body: [
          "構造：状態（AK）として把握される",
          "変異：Δジャンプとして観測される",
          "欠損：接点において重なりとして現れる",
        ],
        emphasis: "ナラティブ＝構造・変異・欠損（記述可能）",
        note: "ナラティブは単なる主観的記述ではなく、構造・変異・欠損という観点から一貫して記述できる。本研究ではこれを操作的定義として提示し、関係のズレを再現可能な形で捉えるとともに、異なる事例間でも比較可能な枠組みとして扱うことを目指す。この観測枠組みが個別事例においてどのように機能するかを、次にCASEで確認する。",
      },
      {
        id: "09b",
        kind: "case",
        title: "CASE①：ナラティブの構造分解（不満化ケース）",
        subtitle: "―― CONTEXTとフィルターで読む",
        body: [
          "文脈を整理する",
          "配置として読む",
          "変異として観測する",
          "欠損として特定する",
        ],
        emphasis: "フィルターで分解できる",
        note: "実際の発話を起点に構造へ展開する。",
        detailPanels: [
          {
            eyebrow: "CONTEXT",
            title: "状況の記述",
            content:
              "説明がなく、次に何をすればよいのか分からなかった。呼んでも返事がなく、自分の状況がきちんと伝わっているのかも分からず、不安だけが残った。",
          },
          {
            eyebrow: "AK / SRPL",
            title: "配置として読む",
            stats: [
              "P｜見通し",
              "R｜尊厳",
            ],
            note:
              "この記述では、先の見通しが持てないことと、適切に扱われていないと感じることが同時に現れている。したがって、未充足条件は単独ではなく、複数要素の配置として観測される。",
          },
          {
            eyebrow: "DELTA / EVENT / TRIGGER",
            title: "変異として観測する",
            stats: [
              "Δ｜3",
              "Trigger｜Yes",
              "e｜3",
            ],
            note:
              "この事例ではズレが強く観測され、転換点が発火している状態として読める。e3はその結果として現れている局面であり、連続的な進行ではなく転換として把握する。",
          },
          {
            eyebrow: "APCE-MISS",
            title: "欠損として特定する",
            stats: [
              "A｜認識不足",
            ],
            note:
              "患者側には、自分の状況が十分に認識されていないという感覚が残っている。ここでは、何が欠けていたかを接点欠損として特定する。",
          },
        ],
      },
      {
        id: "09c",
        kind: "case",
        title: "CASE②：ナラティブの構造分解（継続ズレケース）",
        subtitle: "—— CONTEXTとフィルターで読む",
        body: [
          "文脈を整理する",
          "配置として読む",
          "変異として観測する",
          "欠損として特定する",
        ],
        emphasis: "フィルターで分解できる",
        note:
          "ズレは必ずしも転換として現れるとは限らない。継続的な不安や取り残される感覚も、同じ観測フレームで把握することができる。",
        detailPanels: [
          {
            eyebrow: "CONTEXT",
            title: "状況の記述",
            content:
              "検査の順番や待ち時間の説明がなく、どれくらい待つのか分からなかった。周囲の患者は進んでいるように見えるのに、自分だけ取り残されているように感じた。",
          },
          {
            eyebrow: "AK / SRPL",
            title: "配置として読む",
            stats: [
              "P｜見通し",
              "S｜安全",
            ],
            note:
              "先の見通しが立たない状態に加え、自分だけ取り残されているという感覚が重なっている。未充足条件は複数要素の配置として観測される。",
          },
          {
            eyebrow: "DELTA / EVENT / TRIGGER",
            title: "変異として観測する",
            stats: [
              "Δ｜2",
              "Trigger｜No",
              "e｜2",
            ],
            note:
              "ズレは観測されているが、転換点は発火していない状態として読める。継続的な不安が持続している局面である。",
          },
          {
            eyebrow: "APCE-MISS",
            title: "欠損として特定する",
            stats: [
              "P｜見通し提示不足",
            ],
            note:
              "どのくらい待つのか、何が起きているのかという見通しが提示されていない。ここでは、接点における見通し提示の欠損として特定される。",
          },
        ],
      },
      {
        id: "case3",
        kind: "case",
        title: "CASE③：ナラティブの構造分解（臨界局面ケース）",
        subtitle: "—— 医学的状況と関係のズレを同時に読む",
        body: [
          "文脈を整理する",
          "配置として読む",
          "変異として観測する",
          "欠損として特定する",
        ],
        emphasis: "臨界局面でも分解できる",
        note:
          "深刻な臨床局面においても、ズレは同じ観測フレームで把握することができる。だからこそ、より早い段階での把握可能性が問われる。",
        detailPanels: [
          {
            eyebrow: "CONTEXT",
            title: "状況の記述",
            content:
              "症状が強く、本人も家族も不安を訴えていたが、状態がどう見られているのか、次に何が行われるのかの説明が十分になかった。訴えに対する応答も乏しく、危機的な状況の中で取り残されたように感じた。",
          },
          {
            eyebrow: "AK / SRPL",
            title: "配置として読む",
            stats: [
              "S｜安全",
              "P｜見通し",
              "R｜尊厳",
            ],
            note:
              "安全への不安、先の見通しの欠如、そして適切に扱われていないと感じる経験が重なっている。未充足条件は複数要素の配置として観測される。",
          },
          {
            eyebrow: "DELTA / EVENT / TRIGGER",
            title: "変異として観測する",
            stats: [
              "Δ｜4",
              "Trigger｜Yes",
              "e｜3",
            ],
            note:
              "この事例では、ズレは臨界的な水準で観測され、転換点が発火している状態として読める。ここで示すのは時間進行ではなく、強度と局面の観測結果である。",
          },
          {
            eyebrow: "APCE-MISS",
            title: "欠損として特定する",
            stats: [
              "A｜認識不足",
              "P｜見通し提示不足",
            ],
            note:
              "本人や家族の状況が十分に認識されず、次に何が行われるのかという見通しも提示されていない。ここでは、認識と見通し提示の欠損が重なった状態として特定される。",
          },
        ],
      },
      {
        id: "10",
        kind: "turn",
        title: "可能性への転換",
        subtitle: "—— 構造を踏まえ、関係の状態にどこまで介入可能かを考える",
        body: [
          "ACE-X｜予防的介入への機能拡張",
          "RA-SS｜現場適応への最適化",
        ],
        emphasis: "ここから実践可能性が開く",
        note: "構造（状態・変異・欠損）を把握できても、それ自体を直接制御することはできない。本スライドでは、その制約を前提に、関係の状態に対してどこに実践可能な余地が残されているかを再定位する。すなわち、接点における行為設計に着目することで、関係の悪化に先立つ段階で介入可能な領域を仮説的に位置づける転換点である。この可能性は、関係の状態に作用しうる接点行為（ACE-X）と、その運用枠組み（RA-SS）として展開される。",
      },
      {
        id: "10b",
        kind: "insight",
        title: "ナラティブを把握すると何が変わるのか",
        subtitle: "―― 広報は、関係を見えないまま扱う営みではなくなる",
        body: [
          "可視化｜関係状態を把握できる",
          "介入｜関係補正を設計できる",
          "内製化｜仕組みとして運用できる",
        ],
        emphasis: "可視化 → 介入 → 内製化",
        note: "",
        detailPanels: [
          {
            eyebrow: "VISUALIZE",
            title: "可視化",
            content:
              "見えなかった関係状態が、構造として把握できる。",
            note:
              "患者の語りを構造として読むことで、組織とステークホルダーのあいだにある関係状態を見える化できる。",
          },
          {
            eyebrow: "INTERVENE",
            title: "介入",
            content:
              "ズレの位置が見えれば、補正すべき接点が分かる。",
            note:
              "見えたズレに応じて、どの接点にどのような補正を加えるべきかを設計できる。",
          },
          {
            eyebrow: "INTERNALIZE",
            title: "内製化",
            content:
              "補正方法を共有できれば、広報は仕組みとして運用できる。",
            note:
              "補正方法を共有可能な形に整理することで、属人的対応ではなく継続運用可能な実践へ変えられる。",
          },
        ],
      },
      {
        id: "11",
        kind: "value",
        title: "ACE-X：予防的介入への機能拡張",
        subtitle: "―― 関係の状態に働きかける接点行為の設計",
        body: [
          "観測構造から介入可能性を抽出する",
          "行為として実装する",
          "環境によって成立させる",
        ],
        emphasis: "予防的介入の可能性",
        note: "ACE-Xは、関係の状態に対して接点でどのような行為が作用しうるかを整理するための設計概念である。確定的な解ではなく、観測された構造から導かれる介入の可能性として位置づける。",
        detailPanels: [
          {
            eyebrow: "ACE-X",
            title: "介入可能性の抽出",
            stats: [
              "観測された構造から介入可能性を抽出する",
              "ズレの構造に対応する行為を導出する",
            ],
            note:
              "ACE-Xは、観測された構造（状態・変異・欠損）から、接点において作用しうる介入可能性を抽出するための設計概念である。ここで扱うのは原因の特定ではなく、関係の状態に対してどのような行為が作用しうるかという可能性である。",
          },
          {
            eyebrow: "ACE-X",
            title: "行為として実装する",
            stats: [
              "認識を補完する（A）",
              "状況を接続する（C）",
              "感情を処理する（E）",
            ],
            note:
              "抽出された介入可能性は、接点における具体的な行為として実装される。これにより、ズレは単なる観測対象ではなく、接点で作用しうる変化の対象へと転換される。",
          },
          {
            eyebrow: "ACE-X",
            title: "環境によって成立させる",
            stats: [
              "見通しを提示する（P）",
              "行為が機能する条件を整える",
            ],
            note:
              "これらの行為は単独では成立せず、見通しという環境条件によって初めて機能する。ACE-Xは、行為と環境を組み合わせることで、介入を実際の接点で成立させる枠組みである。",
          },
        ],
      },
      {
        id: "12",
        kind: "cta",
        title: "RA-SS：現場への最適化",
        subtitle: "—— 関係状態の観測と接点運用をつなぐ",
        body: [
          "構造指標を接点で扱うPoCとして構想する",
          "転換点に至る前段階で関係変化を把握する",
          "予防的介入の可能性を現場で検討する",
        ],
        emphasis: "現場適応の可能性",
        note: "RA-SSは、関係の状態を観測し、ACE-Xによる接点行為の設計と運用を現場で扱いうる形に接続するための枠組みである。理論として捉えた構造や変化を、日常業務の中で扱える形に落とし込み、観測と介入を接点レベルで接続しうる枠組みとして提示する。",
        detailPanels: [
          {
            eyebrow: "POSITIONING",
            title: "PoCとしての位置づけ",
            stats: [
              "観測フレームの拡張",
              "接点への適用",
              "実装前段階の検討",
            ],
            note:
              "RA-SSは、観測された構造を接点で扱いうる形に変換し、現場で継続的に参照可能にするための運用枠組みである。ここで重要なのは、構造を一度理解して終わるのではなく、接点の中で繰り返し扱える状態にすることである。",
          },
          {
            eyebrow: "PRE-TRIGGER",
            title: "転換前段階の把握",
            stats: [
              "Δ2領域での観測",
              "Trigger前の兆候把握",
              "非連続変化の前段階",
            ],
            note:
              "RA-SSでは、関係状態を一回限りで判断するのではなく、変化の兆候や転換点に至る前段階を継続的に観測する。これにより、ズレは事後的に説明される対象ではなく、接点の中で早期に把握されうる対象へと変わる。",
          },
          {
            eyebrow: "FIELD LOOP",
            title: "現場での運用ループ",
            stats: [
              "観測 → 判断 → 介入",
              "日常業務への組み込み",
              "継続的な調整",
            ],
            note:
              "RA-SSは、観測・判断・介入を一方向の処理としてではなく、循環として運用することで現場適応を可能にする。つまり、介入は一回の実施で終わるのではなく、その結果を再び観測し、次の判断へ接続する枠組みとして成立する。",
          },
        ],
      },
      {
        id: "13",
        kind: "conclusion",
        title: "結論",
        subtitle: "—— 広報は、情報伝達ではなく関係の状態に働きかける営みである",
        body: [
          "ナラティブは、関係の状態を構造として記述しうる",
          "広報は、情報ではなく関係の状態に働きかけている",
          "ACE-XとRA-SSにより、その理解は接点設計と運用へ接続される",
        ],
        emphasis: "広報は「関係」を扱う領域として再定義される",
        note: "本研究は、ナラティブを構造として記述することで、接点に現れる関係の状態を再現可能に把握しうることを示した。この前提に立つと、広報は単なる情報伝達ではなく、関係の状態に働きかける営みとして捉え直される。ACE-Xはその行為設計、RA-SSはその観測と運用の枠組みとして位置づけられる。",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});
  const [fade, setFade] = useState(true);
  const [focusIndex, setFocusIndex] = useState(0);

  const slide = slides[current];

  const roleMap: Record<string, string> = {
    "02": "PROBLEM",
    "03": "QUESTION",
    "04": "SECTION",
    "05": "OBSERVATION",
    "06": "OBSERVATION",
    "07": "OBSERVATION",
    "08": "OBSERVATION",
    "09": "INSIGHT",
    "10": "TURN",
    "10b": "INSIGHT",
    "11": "VALUE",
    "12": "CTA",
    "13": "CONCLUSION",
  };

  const roleColorMap: Record<string, string> = {
    PROBLEM: "bg-gray-200 text-gray-800",
    QUESTION: "bg-blue-100 text-blue-800",
    SECTION: "bg-purple-100 text-purple-800",
    OBSERVATION: "bg-amber-100 text-amber-800",
    INSIGHT: "bg-green-100 text-green-800",
    TURN: "bg-indigo-100 text-indigo-800",
    VALUE: "bg-red-100 text-red-800",
    CTA: "bg-black text-white",
    CONCLUSION: "bg-neutral-200 text-neutral-800",
  };

  const role = roleMap[slide.id];
  const roleClass = role ? roleColorMap[role] : "";

  const sectionCoverPages = [1, 4, 9, 13];
  const previewPage = current + 1;

  const sectionTitleMap: Record<number, string> = {
    1: "REDEFINITION",
    4: "OBSERVATION DESIGN",
    9: "UNDERSTANDING",
    13: "DEMO / POSSIBILITY",
  };

  const isSpecialSlide = sectionCoverPages.includes(previewPage);
  const isTwoColumnDoor = sectionCoverPages.includes(previewPage);
  const isConclusionPage = previewPage === slides.length || slide.kind === "conclusion";
  const isAcexPage = slide.id === "11";
  const isRassPage = slide.id === "12";
  const isQuestionPage = slide.id === "03";
  const isDetailPanelPage =
    slide.id === "03" ||
    slide.id === "05" ||
    slide.id === "06" ||
    slide.id === "07" ||
    slide.id === "08" ||
    slide.id === "09b" ||
    slide.id === "09c" ||
    slide.id === "case3" ||
    slide.id === "10b" ||
    slide.id === "11" ||
    slide.id === "12";
  const activeDetailPanel =
    isDetailPanelPage && slide.detailPanels ? slide.detailPanels[focusIndex] : null;
  const currentSectionCoverIndex = sectionCoverPages.indexOf(previewPage);
  const nextSectionCoverPage =
    currentSectionCoverIndex >= 0 ? sectionCoverPages[currentSectionCoverIndex + 1] : undefined;
  const chapterPoints = isTwoColumnDoor
    ? slides
        .slice(current, nextSectionCoverPage ? nextSectionCoverPage - 1 : slides.length)
        .filter((sectionSlide) => sectionSlide.id !== slide.id)
        .map((sectionSlide) => sectionSlide.title)
    : slide.body;
  const detailPanelLayoutClass = isAcexPage
    ? "grid gap-4 lg:grid-cols-[minmax(0,0.88fr)_420px]"
    : isRassPage
      ? "grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_360px]"
      : isQuestionPage
        ? "grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_360px]"
        : "grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_360px]";
  const hasStepItems =
    !isTwoColumnDoor &&
    !isConclusionPage &&
    Array.isArray(slide.body) &&
    slide.body.length > 0;
  const itemCount = hasStepItems ? slide.body.length : 0;
  const lastFocusIndex = Math.max(0, itemCount - 1);

  const toggleItem = (index: number) => {
    if (hasStepItems) {
      setFocusIndex(index);
      return;
    }

    setActiveItems((prev) => {
      const key = `${current}-${index}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const clearSlideItems = (slideIndex: number) => {
    setActiveItems((prev) => {
      const next = { ...prev };
      slides[slideIndex].body.forEach((_, i) => {
        delete next[`${slideIndex}-${i}`];
      });
      return next;
    });
  };

  const activateNextItem = () => {
    if (hasStepItems && focusIndex < lastFocusIndex) {
      setFocusIndex((prev) => prev + 1);
      return true;
    }

    const nextIndex = slide.body.findIndex((_, i) => !activeItems[`${current}-${i}`]);
    if (nextIndex !== -1) {
      setActiveItems((prev) => ({ ...prev, [`${current}-${nextIndex}`]: true }));
      return true;
    }
    return false;
  };

  const moveToSlide = (nextIndex: number) => {
    if (nextIndex === current) return;
    setFade(false);
    setTimeout(() => {
      setCurrent(nextIndex);
      clearSlideItems(nextIndex);
      setFade(true);
    }, 120);
  };

  const handleNext = () => {
    if (hasStepItems && focusIndex < lastFocusIndex) {
      setFocusIndex((prev) => prev + 1);
      return;
    }

    if (current < slides.length - 1) {
      moveToSlide(current + 1);
    }
  };

  const handlePrev = () => {
    if (hasStepItems && focusIndex > 0) {
      setFocusIndex((prev) => prev - 1);
      return;
    }

    if (current > 0) {
      moveToSlide(current - 1);
    }
  };

  useEffect(() => {
    setFocusIndex(0);
  }, [current]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " ") {
        e.preventDefault();
        const progressed = activateNextItem();
        if (!progressed) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, activeItems, slide]);

  const progress = (previewPage / slides.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="h-1 bg-neutral-200 rounded mb-4 overflow-hidden">
          <div
            className="h-1 bg-neutral-900 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          className={`bg-white rounded-3xl shadow transition-opacity duration-150 aspect-[16/9] flex flex-col justify-between p-12 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-6">
              <div>
                {role && (
                  <div className={`mb-3 inline-block text-sm px-3 py-1 rounded-full ${roleClass}`}>
                    {role}
                  </div>
                )}

                {isSpecialSlide ? (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-px bg-amber-500/70 mx-auto" />
                    <h1 className="font-bold leading-tight text-3xl md:text-4xl">{slide.title}</h1>
                    <p className="text-lg text-gray-500 max-w-3xl mx-auto">{slide.subtitle}</p>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                    <p className="text-lg text-gray-500">{slide.subtitle}</p>
                  </div>
                )}
              </div>

              {!isTwoColumnDoor && (
                <div className={isSpecialSlide ? "mx-auto text-center" : ""}>
                  <div className="bg-black text-white px-5 py-2.5 rounded-xl inline-block text-lg md:text-lg">
                    {slide.emphasis}
                  </div>
                </div>
              )}

              {isSpecialSlide && (
                <div className="pt-2">
                  <p className="text-[10px] text-neutral-300 text-center">
                    — {sectionTitleMap[previewPage] || "Section Cover"} —
                  </p>
                </div>
              )}

              {isTwoColumnDoor ? (
                <div className="grid grid-cols-2 gap-8 items-start">
                  <div className="space-y-4 text-left">
                    <p className="text-[10px] text-neutral-300">Summary</p>
                    <p className="text-gray-700 text-base leading-relaxed max-w-md">{slide.note}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] text-neutral-300">Chapter Points</p>
                    {chapterPoints.map((item, i) => {
                      const itemKey = `${current}-${i}`;
                      const isActive = !!activeItems[itemKey];
                      return (
                        <div key={itemKey} className="flex items-center gap-3">
                          <button
                            onClick={() => toggleItem(i)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm shrink-0 ${
                              isActive ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-300"
                            }`}
                          >
                            {i + 1}
                          </button>

                          <div
                            className={`transition-all duration-200 rounded-lg border p-3 text-base flex-1 ${
                              isActive ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"
                            }`}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : isConclusionPage ? (
                <div className="max-w-4xl mx-auto space-y-5">
                  <div className="mx-auto text-center">
                    <div className="bg-black text-white px-5 py-2.5 rounded-xl inline-block text-lg">
                      {slide.emphasis}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {slide.body.map((item, i) => {
                      const itemKey = `${current}-${i}`;
                      const isActive = !!activeItems[itemKey];
                      return (
                        <div key={itemKey} className="flex items-stretch gap-3">
                          <button
                            onClick={() => toggleItem(i)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm shrink-0 ${
                              isActive ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-300"
                            }`}
                          >
                            {i + 1}
                          </button>

                          <div
                            className={`transition-all duration-200 rounded-xl border p-4 text-base leading-relaxed flex-1 ${
                              isActive ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200"
                            }`}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    isDetailPanelPage
                      ? detailPanelLayoutClass
                      : isSpecialSlide
                        ? "space-y-3"
                        : "space-y-2"
                  }
                >
                  <div className={isDetailPanelPage ? "space-y-2" : ""}>
                    {slide.body.map((item, i) => {
                      const itemKey = `${current}-${i}`;
                      const isActive = !!activeItems[itemKey];
                      const isFocused = hasStepItems ? focusIndex === i : isActive;
                      return (
                        <div
                          key={itemKey}
                          className={`flex items-center gap-3 ${isSpecialSlide ? "justify-center" : ""}`}
                        >
                          <button
                            onClick={() => toggleItem(i)}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm shrink-0 transition-all duration-300 ease-out ${
                              isFocused
                                ? "bg-neutral-100 text-neutral-900 border-neutral-400"
                                : "bg-white text-gray-500 border-gray-300"
                            }`}
                          >
                            {i + 1}
                          </button>

                          <div
                            className={`transition-all duration-300 ease-out rounded-lg border ${
                              isSpecialSlide ? "max-w-2xl p-4 text-lg w-full" : "p-3 text-lg flex-1"
                            } ${
                              isFocused
                                ? "opacity-100 scale-[1.01] shadow-sm border-neutral-300 bg-white text-gray-900"
                                : "opacity-55 scale-100 shadow-none border-neutral-200 bg-white text-gray-400"
                            }`}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {isDetailPanelPage && activeDetailPanel ? (
                    <aside
                      key={focusIndex}
                      className={`self-start mt-0 rounded-2xl border border-neutral-200 bg-white/90 shadow-sm transition-all duration-300 ease-out ${
                        isQuestionPage ? "lg:-mt-6 p-4" : "lg:-mt-6 p-5"
                      }`}
                    >
                      {activeDetailPanel.eyebrow ? (
                        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                          {activeDetailPanel.eyebrow}
                        </div>
                      ) : null}

                      <h4 className="text-sm font-semibold text-neutral-800">
                        {activeDetailPanel.title}
                      </h4>

                      {slide.panelLead ? (
                        <div className="mt-3 mb-3 inline-flex rounded-md border border-sky-100 bg-sky-50 px-2.5 py-1 text-[11px] font-medium leading-5 text-sky-700">
                          {slide.panelLead}
                        </div>
                      ) : null}

                      {activeDetailPanel.content ? (
                        <p className="mt-4 text-[12px] leading-6 text-neutral-700">
                          {activeDetailPanel.content}
                        </p>
                      ) : null}

                      {activeDetailPanel.stats?.length ? (
                        <div className="mt-4 space-y-2">
                          {activeDetailPanel.stats.map((item, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-neutral-200 px-3 py-2 text-[12px] leading-relaxed text-neutral-700"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {activeDetailPanel.note ? (
                        <p className="mt-4 text-[11px] leading-5 text-neutral-500">
                          {activeDetailPanel.note}
                        </p>
                      ) : null}
                    </aside>
                  ) : null}
                </div>
              )}

              {!isTwoColumnDoor && !isConclusionPage && slide.note.trim() ? (
                <div className="space-y-2 border-t border-neutral-200 pt-4">
                  <div className="text-gray-500 text-base leading-relaxed">{slide.note}</div>
                </div>
              ) : null}
            </div>
        </div>

        <div className="flex justify-between mt-6 items-center">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40"
          >
            ← 前へ
          </button>
          <span className="text-sm text-gray-500">
            {previewPage} / {slides.length}
          </span>
          <button
            onClick={handleNext}
            disabled={current === slides.length - 1}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40"
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  );
}
