import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="home-page" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Animated Background Mesh */}
      <div className="hero-ripple-canvas" style={{ position: 'fixed', zIndex: -1, background: 'radial-gradient(circle at 50% -20%, rgba(59, 130, 246, 0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1), transparent 50%)' }} />

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{
          textAlign: "center",
          padding: "6rem 1rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <motion.div variants={fadeInUp}>
          <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', fontWeight: '600', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            ⚡ Live: India Innovates CM Dashboard
          </div>
        </motion.div>
        
        <motion.h1 variants={fadeInUp} style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: "800", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>
          Next-Gen <span style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Digital Governance</span>
        </motion.h1>
        
        <motion.p variants={fadeInUp} style={{ fontSize: "1.25rem", color: "#94a3b8", lineHeight: "1.6", marginBottom: "3rem", maxWidth: "700px", margin: "0 auto 3rem auto" }}>
          Transform citizen grievances into actionable intelligence. 
          Powered by state-of-the-art LLMs, Vector Deduplication, and Real-time Jurisdiction Routing.
        </motion.p>
        
        <motion.div variants={fadeInUp} style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1.2rem 2.5rem", fontSize: "1.1rem", fontWeight: "700", borderRadius: "14px", background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Report an Issue
            </motion.button>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1.2rem 2.5rem", fontSize: "1.1rem", fontWeight: "700", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer", backdropFilter: "blur(10px)" }}
            >
              Command Center
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Live Stats Row */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={staggerContainer}
        style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
      >
        {[
          { label: 'Complaints Processed', value: '12,456' },
          { label: 'Resolution Rate', value: '92%' },
          { label: 'Departments Connected', value: '18' },
          { label: 'Delhi Zones Monitored', value: '4' }
        ].map((stat, i) => (
          <motion.div key={i} variants={fadeInUp} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f8fafc' }}>{stat.value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Feature Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        {[
          { icon: '🧠', title: 'AI Routing Engine', desc: 'Instantly routes complaints to the correct department (TPDDL, MCD, DJB) using Google\'s Gemini models and precise geographic bounding.' },
          { icon: '🧬', title: 'Vector Deduplication', desc: 'Uses pgvector to mathematically cluster duplicate complaints in the same geographic radius, saving thousands of officer hours.' },
          { icon: '🗺️', title: 'Live Heatmaps', desc: 'Dynamic density mapping tracks emerging crisis zones across the city for proactive maintenance and CM-level monitoring.' },
          { icon: '🔐', title: 'Anti-Corruption Loop', desc: 'End-to-end OTP verification prevents unauthorized grievance closures by field officials. If a citizen says NO, it reopens automatically.' }
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ padding: "2.5rem", borderRadius: "24px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)", backdropFilter: "blur(20px)" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>{feature.icon}</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "700" }}>{feature.title}</h3>
            <p style={{ color: "#94a3b8", lineHeight: "1.7" }}>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

export default Home;