import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#60a5fa", "#f59e0b", "#22c55e", "#ef4444"];

function StatusSplitChart({ data = [] }) {
  const formatted = data.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "320px",
        padding: "1rem",
        borderRadius: "18px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Status Split</h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={95}
            label
          >
            {formatted.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusSplitChart;