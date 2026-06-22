import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function DepartmentBarChart({ data = [] }) {
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
      <h3 style={{ marginTop: 0 }}>Department Distribution</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="name" tick={{ fill: "#f8fafc", fontSize: 11 }} />
          <YAxis tick={{ fill: "#f8fafc", fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#60a5fa" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentBarChart;