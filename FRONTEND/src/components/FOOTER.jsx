import { Link } from "react-router-dom";

const footerLinks = [
  { label: "About", to: "/about" },
  { label: "Submit Complaint", to: "/submit" },
  { label: "Track Complaints", to: "/track" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Insights", to: "/insights" },
];

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem 1.25rem 2rem",
          display: "grid",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>CivicLens AI</div>
          <p
            style={{
              margin: "0.5rem 0 0",
              maxWidth: "760px",
              lineHeight: 1.75,
              opacity: 0.84,
            }}
          >
            Designed to make grievance workflows legible, fast, and accountable.
            Student-built at DTU for civic bodies, institutions, and public systems
            that need better routing, prioritization, and operator-grade visibility.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem" }}>
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ opacity: 0.65, fontSize: "0.9rem" }}>
          © 2026 CivicLens AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;