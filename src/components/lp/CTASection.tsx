

type Props = {
  setPage: (page: string) => void;
};

export default function CtaSection({ setPage }: Props) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <p style={labelStyle}>CTA</p>

        <h2 style={titleStyle}>
          この構想を、
          <br />
          次の現場で確かめていく
        </h2>

        <div style={textWrapStyle}>
          <p style={textStyle}>
            この構想は、まだ途中にあります。
          </p>

          <p style={textStyle}>
            だからこそ、現場とともに試しながら、
            <br />
            広報を関係の構造として扱うための形を
            <br />
            少しずつ整えていきたいと考えています。
          </p>

          <p style={textStyle}>
            PoCへの参加は、
            <br />
            その最初の入口です。
          </p>
        </div>

        <div style={buttonWrapStyle}>
          <button
            onClick={() => setPage("contact")}
            style={buttonStyle}
          >
            PoCに参加する
          </button>
        </div>
      </div>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "#f7f5f2",
  padding: "140px 48px 160px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: 880,
  margin: "0 auto",
  textAlign: "center",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  opacity: 0.5,
  marginBottom: 24,
};

const titleStyle: React.CSSProperties = {
  fontSize: 40,
  lineHeight: 1.7,
  letterSpacing: "-0.02em",
  marginBottom: 32,
};

const textWrapStyle: React.CSSProperties = {
  maxWidth: 640,
  margin: "0 auto",
};

const textStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 2,
  margin: "0 0 14px",
  opacity: 0.84,
};

const buttonWrapStyle: React.CSSProperties = {
  marginTop: 42,
};

const buttonStyle: React.CSSProperties = {
  padding: "14px 30px",
  border: "1px solid rgba(0,0,0,0.22)",
  background: "transparent",
  cursor: "pointer",
  fontSize: 15,
};