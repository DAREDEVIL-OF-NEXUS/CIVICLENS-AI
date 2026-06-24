import React from "react";
import { motion } from "framer-motion";
import CometCursor from "../components/CometCursor";
import Footer from "../components/FOOTER.jsx";
import { Database, Brain, Globe, Layers, ShieldCheck } from "lucide-react";

function Architecture() {
  return (
    <div style={{ minHeight: '100vh', background: '#050B14', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CometCursor />
      
      <header style={{ padding: "8rem 2rem 4rem", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "900", marginBottom: "1.5rem" }}>System Architecture</h1>
        <p style={{ fontSize: "1.3rem", color: "#94a3b8", lineHeight: "1.8" }}>
          Deep dive into the High-Level Design (HLD), Low-Level Design (LLD), and the production tech stack powering CivicLens AI.
        </p>
      </header>

      {/* Tech Stack */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem", textAlign: "center" }}>The Tech Stack</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {[
            { icon: <Globe />, name: "Frontend", desc: "React, Vite, Framer Motion, Leaflet Maps" },
            { icon: <Server />, name: "Backend", desc: "FastAPI, Python 3.11, Uvicorn, SQLAlchemy" },
            { icon: <Database />, name: "Database", desc: "PostgreSQL (Supabase), pgvector, SQLite fallback" },
            { icon: <Brain />, name: "AI/ML Engine", desc: "Google Gemini Models, Sentence-Transformers (all-MiniLM-L6-v2)" },
          ].map((tech, i) => (
            <div key={i} style={{ padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ color: "#3b82f6", marginBottom: "1rem" }}>{tech.icon}</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{tech.name}</h3>
              <p style={{ color: "#94a3b8" }}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High Level Diagram */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>High-Level Design (HLD)</h2>
        <div style={{ padding: "3rem", background: "rgba(59,130,246,0.05)", borderRadius: "24px", border: "1px dashed rgba(59,130,246,0.3)", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={blockStyle}>1. Citizen App<br/><small>React PWA</small></div>
            <div style={arrowStyle}>→</div>
            <div style={blockStyle}>2. FastAPI Gateway<br/><small>Auth & Rate Limit</small></div>
            <div style={arrowStyle}>→</div>
            <div style={blockStyle}>3. AI Intelligence Layer<br/><small>Gemini + Vectors</small></div>
            <div style={arrowStyle}>→</div>
            <div style={blockStyle}>4. Dashboard UI<br/><small>Heatmaps & CM View</small></div>
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <div style={{ ...blockStyle, display: "inline-block", background: "rgba(16,185,129,0.1)" }}>PostgreSQL + pgvector Database</div>
          </div>
        </div>
      </section>

      {/* Low Level Workflow */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Low-Level Workflow (LLD)</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={stepStyle}><strong>Step 1: Ingestion</strong> - User submits raw text & image Base64.</div>
          <div style={stepStyle}><strong>Step 2: Vectorization</strong> - `SentenceTransformers` converts text into a 384-dimension array.</div>
          <div style={stepStyle}><strong>Step 3: Deduplication Search</strong> - `pgvector` Cosine Similarity query runs against existing complaints within 500m radius. If similarity &gt; 85%, marks as duplicate.</div>
          <div style={stepStyle}><strong>Step 4: Classification</strong> - Gemini determines Urgency (Low/Medium/High/Critical) and Target Department.</div>
          <div style={stepStyle}><strong>Step 5: Routing</strong> - Saved to DB. WebSockets/Polling updates the CM Dashboard in real-time.</div>
          <div style={stepStyle}><strong>Step 6: Resolution Loop</strong> - Official marks resolved. OTP sent to Citizen. Citizen confirms OTP to close loop.</div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem", marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Future Advancements</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div style={futureStyle}><Layers color="#8b5cf6" style={{marginBottom: "1rem"}}/> WhatsApp Bot Integration for extreme accessibility.</div>
          <div style={futureStyle}><Globe color="#10b981" style={{marginBottom: "1rem"}}/> Multi-lingual support (Hindi/Regional) natively processed by LLM.</div>
          <div style={futureStyle}><ShieldCheck color="#f43f5e" style={{marginBottom: "1rem"}}/> Blockchain hashing of complaints to prevent tampering by corrupt officials.</div>
          <div style={futureStyle}><Activity color="#3b82f6" style={{marginBottom: "1rem"}}/> Automated Drone inspection triggers for critical infrastructure failures.</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const blockStyle = { padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center", flex: 1, minWidth: "150px" };
const arrowStyle = { color: "#3b82f6", fontSize: "2rem", fontWeight: "bold" };
const stepStyle = { padding: "1.5rem", background: "rgba(255,255,255,0.02)", borderRadius: "12px", borderLeft: "4px solid #3b82f6" };
const futureStyle = { padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" };

export default Architecture;
