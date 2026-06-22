import { useMemo } from "react";
import { useComplaints } from "../context/useComplaints.js";
import {
  countBy,
  buildPriorityBandSummary,
} from "../services/clusterService.js";

import CategoryPieChart from "../components/charts/CategoryPieChart.jsx";
import DepartmentBarChart from "../components/charts/DepartmentBarChart.jsx";
import PriorityBandChart from "../components/charts/PriorityBandChart.jsx";
import RegionDistributionChart from "../components/charts/RegionDistributionChart.jsx";
import StatusSplitChart from "../components/charts/StatusSplitChart.jsx";

function InsightCard({ title, body }) {
  return (
    <section
      style={{
        padding: "1rem",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ margin: 0, lineHeight: 1.75, opacity: 0.88 }}>{body}</p>
    </section>
  );
}

function Insights() {
  const { complaints, hotspots } = useComplaints();

  const categoryData = useMemo(
    () => countBy(complaints, "category", "UNASSIGNED"),
    [complaints]
  );

  const departmentData = useMemo(
    () => countBy(complaints, "department", "UNASSIGNED"),
    [complaints]
  );

  const regionData = useMemo(
    () => countBy(complaints, "region", "UNCLASSIFIED"),
    [complaints]
  );

  const statusData = useMemo(
    () => countBy(complaints, "status", "NEW"),
    [complaints]
  );

  const priorityBandData = useMemo(
    () => buildPriorityBandSummary(complaints),
    [complaints]
  );

  const topHotspot = hotspots?.[0];

  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
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
        <div style={{ fontSize: "0.9rem", opacity: 0.78 }}>Insights</div>
        <h1 style={{ margin: "0.35rem 0 0.55rem" }}>
          Visual Analytics & Operational Intelligence
        </h1>
        <p style={{ margin: 0, opacity: 0.88, lineHeight: 1.8 }}>
          A higher-level view of complaint distribution, priority patterns, department
          load, and regional concentration.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <InsightCard
          title="Top hotspot insight"
          body={
            topHotspot
              ? `${topHotspot.locality} in ${topHotspot.region} is currently the highest pressure hotspot with ${topHotspot.complaintCount} complaints and intensity score ${topHotspot.intensityScore}.`
              : "No hotspot insight available yet."
          }
        />
        <InsightCard
          title="Operational interpretation"
          body="Use these charts to identify repeated issue categories, overloaded departments, high-priority complaint clusters, and zones that require faster field response."
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
    </div>
  );
}

export default Insights;