type MarkerKind =
  | "dot"
  | "square"
  | "double-circle"
  | "lines"
  | "flow"
  | "triangle"
  | "none";

type EditorialSectionHeaderProps = {
  label: string;
  title: React.ReactNode;
  summary: React.ReactNode;
  marker?: MarkerKind;
  hero?: boolean;
};

function Marker({ kind = "dot" }: { kind?: MarkerKind }) {
  if (kind === "none") return null;

  if (kind === "square") {
    return <span style={squareStyle} />;
  }

  if (kind === "double-circle") {
    return (
      <span style={doubleCircleStyle}>
        <span style={innerCircleStyle} />
      </span>
    );
  }

  if (kind === "lines") {
    return (
      <span style={linesStyle}>
        <span style={lineStyle} />
        <span style={lineStyle} />
        <span style={lineStyle} />
      </span>
    );
  }

  if (kind === "flow") {
    return (
      <span style={flowDotsStyle}>
        <span style={flowDotStyle} />
        <span style={flowDotStyle} />
        <span style={flowDotStyle} />
      </span>
    );
  }

  if (kind === "triangle") {
    return <span style={triangleStyle} />;
  }

  return <span style={dotStyle} />;
}

export default function EditorialSectionHeader({
  label,
  title,
  summary,
  marker = "dot",
  hero = false,
}: EditorialSectionHeaderProps) {
  return (
    <div style={wrapStyle}>
      <div style={labelRowStyle}>
        <span style={markerWrapStyle}>
          <Marker kind={marker} />
        </span>
        <span>{label}</span>
      </div>

      <h2 style={hero ? heroTitleStyle : titleStyle}>{title}</h2>

      <p style={summaryStyle}>{summary}</p>
    </div>
  );
}

const wrapStyle: React.CSSProperties = {
  textAlign: "center",
};

const labelRowStyle: React.CSSProperties = {
  marginBottom: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#737373",
};

const markerWrapStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 12,
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.95rem, 4.8vw, 2.75rem)",
  fontWeight: 600,
  lineHeight: 1.32,
  letterSpacing: "-0.02em",
  color: "#171717",
  textWrap: "balance",
};

const heroTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(2.5rem, 7vw, 4.9rem)",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.03em",
  color: "#171717",
  textWrap: "balance",
};

const summaryStyle: React.CSSProperties = {
  maxWidth: 640,
  margin: "24px auto 0",
  fontSize: "clamp(15px, 3.8vw, 17px)",
  lineHeight: 1.85,
  color: "#404040",
  textWrap: "pretty",
};

const dotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "999px",
  background: "#475569",
};

const squareStyle: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 2,
  border: "1px solid #64748b",
  boxSizing: "border-box",
};

const doubleCircleStyle: React.CSSProperties = {
  width: 12,
  height: 12,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  border: "1px solid #047857",
  boxSizing: "border-box",
};

const innerCircleStyle: React.CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: "999px",
  background: "#047857",
};

const linesStyle: React.CSSProperties = {
  display: "inline-flex",
  flexDirection: "column",
  gap: 2,
};

const lineStyle: React.CSSProperties = {
  width: 12,
  height: 1,
  background: "#475569",
};

const flowDotsStyle: React.CSSProperties = {
  display: "inline-flex",
  gap: 3,
};

const flowDotStyle: React.CSSProperties = {
  width: 3,
  height: 3,
  borderRadius: "999px",
  background: "#475569",
};

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderTop: "4px solid transparent",
  borderBottom: "4px solid transparent",
  borderLeft: "6px solid #404040",
};
