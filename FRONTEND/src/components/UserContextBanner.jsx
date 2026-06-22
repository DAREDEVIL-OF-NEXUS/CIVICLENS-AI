import { useUserSession } from "../context/UserSessionContext.jsx";

function UserContextBanner() {
  const { username, setUsername, clearUsername } = useUserSession();

  return (
    <section
      style={{
        padding: "1rem",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        gap: "0.85rem",
      }}
    >
      <div>
        <div style={{ fontSize: "0.86rem", opacity: 0.75 }}>User context</div>
        <div style={{ marginTop: "0.25rem", fontWeight: 800 }}>
          {username ? `Current username: ${username}` : "No username selected"}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username for dashboard and tracking"
          style={{
            padding: "0.85rem 0.95rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
          }}
        />

        <button
          type="button"
          onClick={() => setUsername(username)}
          style={{
            padding: "0.85rem 1rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Save
        </button>

        <button
          type="button"
          onClick={clearUsername}
          style={{
            padding: "0.85rem 1rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "#f8fafc",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Clear
        </button>
      </div>
    </section>
  );
}

export default UserContextBanner;