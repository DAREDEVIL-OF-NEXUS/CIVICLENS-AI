import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function RegionDistributionChart({ data = [] }) {
  const formatted = data.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "340px",
        padding: "1rem",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Region Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="name" tick={{ fill: "#f8fafc", fontSize: 11 }} />
          <YAxis tick={{ fill: "#f8fafc", fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RegionDistributionChart;