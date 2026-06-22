function ToggleButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "0.8rem 1rem",
        borderRadius: "12px",
        border: active
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.08)",
        background: active ? "#f8fafc" : "rgba(255,255,255,0.05)",
        color: active ? "#0f172a" : "#f8fafc",
        cursor: "pointer",
        fontWeight: 800,
      }}
    >
      {children}
    </button>
  );
}

function QueueToggleBar({
  queueMode,
  setQueueMode,
  showOnlyMyComplaints,
  setShowOnlyMyComplaints,
  currentUsername,
}) {
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <ToggleButton
        active={queueMode === "ACTIVE"}
        onClick={() => setQueueMode("ACTIVE")}
      >
        Active Priority Queue
      </ToggleButton>

      <ToggleButton
        active={queueMode === "DUPLICATES"}
        onClick={() => setQueueMode("DUPLICATES")}
      >
        Duplicate Queue
      </ToggleButton>

      <ToggleButton
        active={queueMode === "ALL"}
        onClick={() => setQueueMode("ALL")}
      >
        All Complaints
      </ToggleButton>

      {currentUsername ? (
        <ToggleButton
          active={showOnlyMyComplaints}
          onClick={() => setShowOnlyMyComplaints((current) => !current)}
        >
          {showOnlyMyComplaints
            ? `Showing only ${currentUsername}`
            : `Highlight ${currentUsername}`}
        </ToggleButton>
      ) : null}
    </section>
  );
}

export default QueueToggleBar;