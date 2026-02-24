export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1510",
        color: "#fff",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 500, padding: 32 }}>
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 300,
            fontStyle: "italic",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Свадебное приглашение
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          Эта страница доступна только по персональной ссылке.
          <br />
          Проверьте ссылку, которую вам прислали.
        </p>
      </div>
    </div>
  );
}
