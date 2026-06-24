import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#020617", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "4rem 2rem", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
        <div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#fff", marginBottom: "1rem" }}>CivicLens AI</h3>
          <p style={{ color: "#64748b", lineHeight: "1.6", fontSize: "0.95rem" }}>
            Next-Gen Digital Governance. Transforming citizen grievances into actionable intelligence with state-of-the-art AI.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: "#f8fafc", fontWeight: "700", marginBottom: "1.2rem" }}>Platform</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li><Link to="/submit" style={linkStyle}>Report Issue</Link></li>
            <li><Link to="/dashboard" style={linkStyle}>CM Dashboard</Link></li>
            <li><Link to="/track" style={linkStyle}>Track Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: "#f8fafc", fontWeight: "700", marginBottom: "1.2rem" }}>Project</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li><Link to="/about" style={linkStyle}>Our Story</Link></li>
            <li><Link to="/architecture" style={linkStyle}>Architecture & Tech</Link></li>
            <li><a href="https://github.com/DAREDEVIL-OF-NEXUS/CIVICLENS-AI" target="_blank" rel="noreferrer" style={linkStyle}>GitHub Repo</a></li>
          </ul>
        </div>
      </div>
      
      <div style={{ maxWidth: "1200px", margin: "3rem auto 0", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center", color: "#475569", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} CivicLens AI by Lakshay Bharti. Built for India Innovates.
      </div>
    </footer>
  );
}

const linkStyle = { color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" };