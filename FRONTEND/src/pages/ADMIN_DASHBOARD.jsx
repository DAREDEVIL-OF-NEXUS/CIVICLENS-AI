import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import MapComponent from "../components/MapComponent.jsx";
import RegionFilter from "../components/RegionFilter.jsx";
import HotspotLegend from "../components/HotspotLegend.jsx";
import QueueToggleBar from "../components/QueueToggleBar.jsx";
import UserContextBanner from "../components/UserContextBanner.jsx";
import { useComplaints } from "../context/useComplaints.js";
import { useUserSession } from "../context/UserSessionContext.jsx";
import {
  buildPriorityBandSummary,
  countBy,
} from "../services/clusterService.js";
import { API_BASE_URL } from "../services/API.js";

import CategoryPieChart from "../components/charts/CategoryPieChart.jsx";
import DepartmentBarChart from "../components/charts/DepartmentBarChart.jsx";
import PriorityBandChart from "../components/charts/PriorityBandChart.jsx";
import RegionDistributionChart from "../components/charts/RegionDistributionChart.jsx";
import StatusSplitChart from "../components/charts/StatusSplitChart.jsx";

function StatCard({ label, value, subtitle }) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ opacity: 0.78, fontSize: "0.9rem" }}>{label}</div>
      <div style={{ fontSize: "1.9rem", fontWeight: 800, marginTop: "0.3rem" }}>
        {value}
      </div>
      {subtitle ? (
        <div style={{ marginTop: "0.25rem", opacity: 0.7, fontSize: "0.85rem" }}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <section
      style={{
        padding: "1rem",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {subtitle ? (
          <p style={{ margin: "0.35rem 0 0", opacity: 0.78 }}>{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function maskContact(contact) {
  if (!contact) return "Hidden";

  const clean = String(contact);

  if (clean.includes("@")) {
    const [name, domain] = clean.split("@");
    const maskedName =
      name.length <= 2 ? `${name[0] || "*"}*` : `${name.slice(0, 2)}***`;
    return `${maskedName}@${domain}`;
  }

  if (clean.length <= 4) return "***";
  return `${clean.slice(0, 2)}******${clean.slice(-2)}`;
}

function AdminDashboard() {
  const { username } = useUserSession();

  const {
    complaints,
    filteredComplaints,
    filteredStats,
    hotspots,
    activePriorityQueue,
    duplicateQueue,
    resolvedComplaints,
    applyUserComplaintPreference,
    loading,
    refreshing,
    error,
    filters,
    setFilters,
    resetFilters,
    filterOptions,
    refreshComplaints,
  } = useComplaints();

  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [forwardingPreview, setForwardingPreview] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [queueMode, setQueueMode] = useState("ACTIVE");
  const [showOnlyMyComplaints, setShowOnlyMyComplaints] = useState(false);

  const categoryData = useMemo(
    () => countBy(filteredComplaints, "category", "UNASSIGNED"),
    [filteredComplaints]
  );

  const departmentData = useMemo(
    () => countBy(filteredComplaints, "department", "UNASSIGNED"),
    [filteredComplaints]
  );

  const regionData = useMemo(
    () => countBy(filteredComplaints, "region", "UNCLASSIFIED"),
    [filteredComplaints]
  );

  const statusData = useMemo(
    () => countBy(filteredComplaints, "status", "NEW"),
    [filteredComplaints]
  );

  const priorityBandData = useMemo(
    () => buildPriorityBandSummary(filteredComplaints),
    [filteredComplaints]
  );

  const queueSource = useMemo(() => {
    if (queueMode === "DUPLICATES") return duplicateQueue;
    if (queueMode === "ALL") return filteredComplaints;
    return activePriorityQueue;
  }, [queueMode, activePriorityQueue, duplicateQueue, filteredComplaints]);

  const displayedQueue = useMemo(
    () => applyUserComplaintPreference(queueSource, username, showOnlyMyComplaints),
    [queueSource, username, showOnlyMyComplaints, applyUserComplaintPreference]
  );

  const topRecentComplaints = useMemo(
    () => displayedQueue.slice(0, 12),
    [displayedQueue]
  );

  const onFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const selectedComplaint = complaints.find(
    (complaint) => String(complaint.id) === String(selectedComplaintId)
  );

  const handleForwardingPreview = async () => {
    if (!selectedComplaint) return;

    const response = await fetch(`${API_BASE_URL}/api/forwarding/prepare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complaint: selectedComplaint }),
    });

    const data = await response.json();

    if (!response.ok) {
      setForwardingPreview({ error: data?.detail || "Failed to prepare forwarding preview." });
      return;
    }

    setForwardingPreview(data);
  };

  const handleNotificationPreview = async () => {
    if (!selectedComplaint) return;

    const fakeEmail =
      selectedComplaint.contact && selectedComplaint.contact.includes("@")
        ? selectedComplaint.contact
        : "demo@example.com";

    const response = await fetch(`${API_BASE_URL}/api/notifications/send-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: fakeEmail,
        complaint: {
          id: selectedComplaint.id,
          title: selectedComplaint.title,
          status: selectedComplaint.status,
          priority_score: selectedComplaint.priority_score,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setNotificationMessage(data?.detail || "Failed to prepare notification.");
      return;
    }

    setNotificationMessage("Notification preview prepared successfully.");
  };

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      <section
        style={{
          padding: "1.25rem",
          borderRadius: "22px",
          background:
            "radial-gradient(circle at top right, rgba(96,165,250,0.18), transparent 28%), linear-gradient(135deg, rgba(15,23,42,0.96), rgba(17,24,39,0.92))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 16px 42px rgba(0,0,0,0.24)",
        }}
      >
        <div style={{ fontSize: "0.9rem", opacity: 0.78 }}>Admin Dashboard</div>
        <h1 style={{ margin: "0.35rem 0 0.5rem" }}>
          Complaint Intelligence Dashboard with Visual Analytics
        </h1>
        <p style={{ margin: 0, opacity: 0.86, lineHeight: 1.75 }}>
          Real-time operational view of complaint queues, hotspots, regional activity,
          department load, priority bands, and status split.
        </p>

        <button
          type="button"
          onClick={() => void refreshComplaints({ silent: true })}
          style={{
            marginTop: "1rem",
            padding: "0.85rem 1rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          {refreshing ? "Refreshing..." : "Refresh Dashboard"}
        </button>
      </section>

      <UserContextBanner />

      <RegionFilter
        filters={filters}
        options={filterOptions}
        onFilterChange={onFilterChange}
        onReset={resetFilters}
      />

      <QueueToggleBar
        queueMode={queueMode}
        setQueueMode={setQueueMode}
        showOnlyMyComplaints={showOnlyMyComplaints}
        setShowOnlyMyComplaints={setShowOnlyMyComplaints}
        currentUsername={username}
      />

      {error ? (
        <div
          style={{
            padding: "0.95rem 1rem",
            borderRadius: "14px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.24)",
          }}
        >
          {error}
        </div>
      ) : null}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "1rem",
        }}
      >
        <StatCard label="Filtered Complaints" value={filteredStats.total_complaints} />
        <StatCard label="New" value={filteredStats.new_complaints} />
        <StatCard label="In Progress" value={filteredStats.in_progress_complaints} />
        <StatCard label="Resolved" value={filteredStats.resolved_complaints} />
        <StatCard
          label="Duplicates Detected"
          value={filteredStats.duplicates_detected}
          subtitle="Repeated reports"
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <CategoryPieChart data={categoryData} />
        <DepartmentBarChart data={departmentData} />
        <PriorityBandChart data={priorityBandData} />
        <StatusSplitChart data={statusData} />
      </section>

      <RegionDistributionChart data={regionData} />

      <HotspotLegend />
      <MapComponent complaints={filteredComplaints} />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <SectionCard
          title="Top Locality Hotspots"
          subtitle="Ranked by volume, duplicate count, and highest priority"
        >
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {hotspots.length ? (
              hotspots.map((hotspot, index) => (
                <div
                  key={`${hotspot.locality}-${hotspot.region}`}
                  style={{
                    padding: "0.95rem",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>
                        #{index + 1} {hotspot.locality}
                      </div>
                      <div style={{ opacity: 0.75, marginTop: "0.2rem" }}>
                        {hotspot.region}
                      </div>
                    </div>
                    <div style={{ fontWeight: 800 }}>
                      Score: {hotspot.intensityScore}
                    </div>
                  </div>

                  <div style={{ marginTop: "0.65rem", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    Complaints: {hotspot.complaintCount} | Duplicates: {hotspot.duplicateCount} |
                    Top Category: {hotspot.topCategory} | Top Urgency: {hotspot.topUrgency}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ margin: 0, opacity: 0.8 }}>
                No hotspot clusters available for the selected filters.
              </p>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Forwarding & Notification Preview"
          subtitle="Select a complaint to prepare authority forwarding and citizen notification preview"
        >
          <div style={{ display: "grid", gap: "1rem" }}>
            <select
              value={selectedComplaintId}
              onChange={(e) => setSelectedComplaintId(e.target.value)}
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "inherit",
              }}
            >
              <option value="">Select complaint</option>
              {complaints.map((complaint) => (
                <option key={complaint.id} value={complaint.id}>
                  #{complaint.id} - {complaint.title}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleForwardingPreview}
                disabled={!selectedComplaint}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Prepare Forwarding Note
              </button>

              <button
                type="button"
                onClick={handleNotificationPreview}
                disabled={!selectedComplaint}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Prepare Notification
              </button>
            </div>

            {forwardingPreview ? (
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.7,
                }}
              >
                <strong>Target Authority:</strong> {forwardingPreview.target_authority}{"\n"}
                <strong>Department:</strong> {forwardingPreview.department}{"\n\n"}
                {forwardingPreview.forwarding_note}
              </div>
            ) : null}

            {notificationMessage ? (
              <div
                style={{
                  padding: "0.95rem 1rem",
                  borderRadius: "14px",
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.24)",
                }}
              >
                {notificationMessage}
              </div>
            ) : null}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title={
          queueMode === "DUPLICATES"
            ? "Duplicate Queue"
            : queueMode === "ALL"
            ? "All Filtered Complaints"
            : "Active Unresolved Priority Queue"
        }
        subtitle={
          queueMode === "DUPLICATES"
            ? "Only unresolved duplicate-linked complaints"
            : queueMode === "ALL"
            ? "All complaints after current filters"
            : "Only unresolved non-duplicate complaints sorted by priority"
        }
      >
        {loading ? (
          <p style={{ opacity: 0.8 }}>Loading complaints...</p>
        ) : topRecentComplaints.length ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Locality</th>
                  <th style={thStyle}>Region</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Priority</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Contact</th>
                  <th style={thStyle}>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {topRecentComplaints.map((complaint) => {
                  const isOwnComplaint =
                    username &&
                    String(complaint.submitted_by || "").trim() === String(username).trim();

                  return (
                    <tr
                      key={complaint.id}
                      style={{
                        background: isOwnComplaint
                          ? "rgba(96,165,250,0.10)"
                          : "transparent",
                      }}
                    >
                      <td style={tdStyle}>{complaint.id}</td>
                      <td style={tdStyle}>
                        <Link to={`/complaint/${complaint.id}`} style={{ color: "#93c5fd" }}>
                          {complaint.title}
                        </Link>
                        {isOwnComplaint ? (
                          <div style={{ fontSize: "0.78rem", color: "#93c5fd", marginTop: "0.2rem" }}>
                            Your complaint
                          </div>
                        ) : null}
                      </td>
                      <td style={tdStyle}>{complaint.locality || "UNKNOWN"}</td>
                      <td style={tdStyle}>{complaint.region || "UNCLASSIFIED"}</td>
                      <td style={tdStyle}>{complaint.category || "UNASSIGNED"}</td>
                      <td style={tdStyle}>{complaint.priority_score ?? "N/A"}</td>
                      <td style={tdStyle}>{complaint.department || "UNASSIGNED"}</td>
                      <td style={tdStyle}>{complaint.status || "NEW"}</td>
                      <td style={tdStyle}>
                        {isOwnComplaint ? complaint.contact || "N/A" : maskContact(complaint.contact)}
                      </td>
                      <td style={tdStyle}>
                        {complaint.created_at
                          ? new Date(complaint.created_at).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ opacity: 0.8 }}>No complaints found for the selected queue/filter mode.</p>
        )}
      </SectionCard>

      <SectionCard
        title="Resolved Complaints"
        subtitle="Resolved complaints are removed from the unresolved queue and shown here separately"
      >
        {resolvedComplaints.length ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Priority</th>
                  <th style={thStyle}>Contact</th>
                  <th style={thStyle}>Resolved At</th>
                </tr>
              </thead>
              <tbody>
                {resolvedComplaints.slice(0, 12).map((complaint) => {
                  const isOwnComplaint =
                    username &&
                    String(complaint.submitted_by || "").trim() === String(username).trim();

                  return (
                    <tr
                      key={complaint.id}
                      style={{
                        background: isOwnComplaint
                          ? "rgba(96,165,250,0.10)"
                          : "transparent",
                      }}
                    >
                      <td style={tdStyle}>{complaint.id}</td>
                      <td style={tdStyle}>{complaint.title}</td>
                      <td style={tdStyle}>{complaint.department || "UNASSIGNED"}</td>
                      <td style={tdStyle}>{complaint.priority_score ?? "N/A"}</td>
                      <td style={tdStyle}>
                        {isOwnComplaint ? complaint.contact || "N/A" : maskContact(complaint.contact)}
                      </td>
                      <td style={tdStyle}>
                        {complaint.resolved_at
                          ? new Date(complaint.resolved_at).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ opacity: 0.8 }}>No resolved complaints yet.</p>
        )}
      </SectionCard>
    </div>
  );
}

function MiniList({ title, items = [] }) {
  return (
    <div>
      <div style={{ fontWeight: 800, marginBottom: "0.45rem" }}>{title}</div>
      <div style={{ display: "grid", gap: "0.45rem" }}>
        {items.length ? (
          items.map((item) => (
            <div
              key={`${title}-${item.label}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "0.7rem 0.8rem",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span>{item.label}</span>
              <strong>{item.count}</strong>
            </div>
          ))
        ) : (
          <p style={{ margin: 0, opacity: 0.75 }}>No data available.</p>
        )}
      </div>
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

export default AdminDashboard;