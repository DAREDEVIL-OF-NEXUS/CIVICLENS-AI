import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/API.js";
import UserContextBanner from "../components/UserContextBanner.jsx";
import { useUserSession } from "../context/UserSessionContext.jsx";

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ fontSize: "0.85rem", opacity: 0.72 }}>{label}</div>
      <div style={{ marginTop: "0.25rem", fontWeight: 800, fontSize: "1.05rem" }}>
        {value ?? "N/A"}
      </div>
    </div>
  );
}

function TrackComplaints() {
  const { username, setUsername } = useUserSession();

  const [summary, setSummary] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadTrackingData = async (currentUsername) => {
    const cleanUsername = String(currentUsername || "").trim();

    if (!cleanUsername) {
      setSummary(null);
      setComplaints([]);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const [summaryResponse, complaintsResponse] = await Promise.all([
        fetch(
          `${API_BASE_URL}/api/tracking/summary?username=${encodeURIComponent(cleanUsername)}`
        ),
        fetch(
          `${API_BASE_URL}/api/tracking/user?username=${encodeURIComponent(cleanUsername)}`
        ),
      ]);

      const summaryData = await summaryResponse.json();
      const complaintsData = await complaintsResponse.json();

      if (!summaryResponse.ok) {
        throw new Error(summaryData?.detail || "Failed to fetch tracking summary.");
      }

      if (!complaintsResponse.ok) {
        throw new Error(complaintsData?.detail || "Failed to fetch complaints.");
      }

      setSummary(summaryData);
      setComplaints(Array.isArray(complaintsData) ? complaintsData : []);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Tracking failed.");
      setSummary(null);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTrackingData(username);
  }, [username]);

  return (
    <div style={{ display: "grid", gap: "1.4rem" }}>
      <section
        style={{
          borderRadius: "28px",
          padding: "1.6rem",
          background:
            "radial-gradient(circle at top right, rgba(96,165,250,0.18), transparent 28%), linear-gradient(135deg, rgba(15,23,42,0.96), rgba(17,24,39,0.92))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 16px 42px rgba(0,0,0,0.24)",
        }}
      >
        <div style={{ fontSize: "0.9rem", opacity: 0.78 }}>User tracking</div>
        <h1 style={{ margin: "0.35rem 0 0.55rem" }}>
          Track your complaints by username
        </h1>
        <p style={{ margin: 0, opacity: 0.88, lineHeight: 1.8 }}>
          Use the same username you entered during complaint submission to see your
          complaint status, queue position, and history.
        </p>
      </section>

      <UserContextBanner />

      {!username ? (
        <section
          style={{
            padding: "1rem",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Enter a username above to load complaint tracking data.
        </section>
      ) : null}

      {loading ? <p style={{ opacity: 0.8 }}>Loading tracking data...</p> : null}

      {message ? (
        <div
          style={{
            padding: "0.95rem 1rem",
            borderRadius: "14px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.24)",
          }}
        >
          {message}
        </div>
      ) : null}

      {summary ? (
        <>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "1rem",
            }}
          >
            <InfoCard label="Username" value={summary.username} />
            <InfoCard label="Total Complaints" value={summary.total_complaints} />
            <InfoCard label="Open Complaints" value={summary.open_complaints} />
            <InfoCard label="Resolved Complaints" value={summary.resolved_complaints} />
          </section>

          <section
            style={{
              padding: "1rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Highest Priority Complaint</h3>
            <p style={{ margin: "0.35rem 0 0", lineHeight: 1.75 }}>
              <strong>ID:</strong> {summary.highest_priority_complaint?.id} <br />
              <strong>Title:</strong> {summary.highest_priority_complaint?.title} <br />
              <strong>Priority Score:</strong> {summary.highest_priority_complaint?.priority_score} <br />
              <strong>Priority Band:</strong> {summary.highest_priority_complaint?.priority_band} <br />
              <strong>Status:</strong> {summary.highest_priority_complaint?.status} <br />
              <strong>Department:</strong> {summary.highest_priority_complaint?.department} <br />
              <strong>Registered At:</strong>{" "}
              {summary.highest_priority_complaint?.created_at
                ? new Date(summary.highest_priority_complaint.created_at).toLocaleString()
                : "N/A"}
            </p>
          </section>

          <section
            style={{
              padding: "1rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Your Complaints</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Priority</th>
                    <th style={thStyle}>Department</th>
                    <th style={thStyle}>Queue Position</th>
                    <th style={thStyle}>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id}>
                      <td style={tdStyle}>{complaint.id}</td>
                      <td style={tdStyle}>{complaint.title}</td>
                      <td style={tdStyle}>{complaint.status}</td>
                      <td style={tdStyle}>{complaint.priority_score ?? "N/A"}</td>
                      <td style={tdStyle}>{complaint.department || "UNASSIGNED"}</td>
                      <td style={tdStyle}>
                        {summary.queue_positions?.[complaint.id] ?? "Resolved / Not in queue"}
                      </td>
                      <td style={tdStyle}>
                        {complaint.created_at
                          ? new Date(complaint.created_at).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

const thStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
};

export default TrackComplaints;