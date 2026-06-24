import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Shield, Map, Activity } from "lucide-react";

function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#ededed', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Sleek Vercel/Linear Style Hero */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{
          textAlign: "center",
          padding: "10rem 1rem 6rem",
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '6px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', fontWeight: '500', color: '#a1a1aa' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
            Platform is Live
          </div>
        </motion.div>
        
        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: "800", lineHeight: "1", letterSpacing: "-0.05em", margin: "0 0 1.5rem", color: "#fff" }}>
          CivicLens-AI
        </motion.h1>
        
        <motion.p variants={fadeUp} style={{ fontSize: "1.25rem", color: "#a1a1aa", lineHeight: "1.5", maxWidth: "600px", margin: "0 0 3rem" }}>
          Next-Gen Digital Governance. Transform citizen grievances into actionable intelligence with state-of-the-art LLMs and Real-time Jurisdiction Routing.
        </motion.p>
        
        <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <button style={{ padding: "0.875rem 2rem", fontSize: "1rem", fontWeight: "600", borderRadius: "8px", background: "#fff", color: "#000", border: "none", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={(e) => e.target.style.background = "#e4e4e7"}
              onMouseOut={(e) => e.target.style.background = "#fff"}
            >
              Report Issue
            </button>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{ padding: "0.875rem 2rem", fontSize: "1rem", fontWeight: "600", borderRadius: "8px", background: "#18181b", border: "1px solid #27272a", color: "#fff", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={(e) => e.target.style.background = "#27272a"}
              onMouseOut={(e) => e.target.style.background = "#18181b"}
            >
              Command Center
            </button>
          </Link>
        </motion.div>
      </motion.section>

      <hr style={{ border: 'none', borderTop: '1px solid #27272a', margin: '0' }} />

      {/* Clean Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1px", background: "#27272a", borderBottom: '1px solid #27272a' }}
      >
        {[
          { icon: <Zap size={24} color="#a1a1aa"/>, title: 'AI Routing', desc: 'Auto-detects jurisdiction (TPDDL, MCD, DJB) via Gemini Models.' },
          { icon: <Activity size={24} color="#a1a1aa"/>, title: 'Vector Deduplication', desc: 'pgvector mathematical clustering prevents duplicate assignments.' },
          { icon: <Map size={24} color="#a1a1aa"/>, title: 'Live Heatmaps', desc: 'Geospatial density tracking for proactive CM-level maintenance.' },
          { icon: <Shield size={24} color="#a1a1aa"/>, title: 'Anti-Corruption', desc: 'Citizen OTP verification loop prevents unauthorized closures.' }
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp}
            style={{ padding: "4rem 2rem", background: "#000" }}
          >
            <div style={{ marginBottom: "1rem" }}>{feature.icon}</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: "600", color: "#fff" }}>{feature.title}</h3>
            <p style={{ color: "#a1a1aa", fontSize: "0.95rem", lineHeight: "1.6", margin: "0" }}>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

    </div>
  );
}

export default Home;