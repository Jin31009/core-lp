export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e6e6df",
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "24px 20px 36px",
          fontSize: 13,
          color: "#666666",
          lineHeight: 1.8,
        }}
      >
        <div style={{ marginBottom: 6, fontWeight: 600, color: "#222222" }}>
          CORE
        </div>
        <div>Relational Architecture / Prototype / Editorial Interface</div>
      </div>
    </footer>
  );
}