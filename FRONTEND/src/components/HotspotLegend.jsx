import React from "react";

function HotspotLegend() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1rem",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ fontWeight: 600, marginRight: "0.5rem" }}>Marker Legend:</div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#ef4444",
            border: "2px solid #fff",
          }}
        />
        <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>High Urgency</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#f59e0b",
            border: "2px solid #fff",
          }}
        />
        <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>Medium Urgency</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#22c55e",
            border: "2px solid #fff",
          }}
        />
        <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>Low Urgency</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#60a5fa",
            border: "2px solid #fff",
          }}
        />
        <span style={{ fontSize: "0.9rem", opacity: 0.9 }}>Duplicate</span>
      </div>
    </div>
  );
}

export default HotspotLegend;
