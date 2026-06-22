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
    <section className="glass-card fade-up delay-2" style={{ padding: "1.5rem" }}>
      <h3 style={{ marginTop: 0, color: "#60a5fa" }}>{title}</h3>
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
    <div className="fade-up" style={{ display: "grid", gap: "1.25rem" }}>
      <section className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ fontSize: "0.9rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px" }}>CM Command Center</div>
        <h1 className="text-gradient" style={{ margin: "0.5rem 0 1rem", fontSize: "2.5rem" }}>
          Predictive Analytics & Heatmap Intelligence
        </h1>
        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.8, fontSize: "1.1rem" }}>
          Live operational view of city-wide complaint distributions, AI-assigned priority clusters, and jurisdictional load.
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