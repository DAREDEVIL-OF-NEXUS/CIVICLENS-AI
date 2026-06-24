import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Shield, Map, Activity } from "lucide-react";
import CometCursor from "../components/CometCursor";

function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050B14', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', overflow: 'hidden', position: 'relative' }}>
      <CometCursor />
      
      {/* Flashy Animated Background */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', zIndex: 0, animation: 'pulse 8s infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: 0, animation: 'pulse 10s infinite alternate-reverse' }} />
      <div style={{ position: 'absolute', top: '30%', left: '40%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(90px)', zIndex: 0, animation: 'pulse 12s infinite alternate' }} />

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{
          position: 'relative',
          zIndex: 10,
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
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '8px 20px', borderRadius: '999px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.9rem', fontWeight: 'bold', color: '#60A5FA', boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 10px #60A5FA', animation: 'blink 1.5s infinite' }}></span>
            ⚡ LIVE: India Innovates CM Dashboard
          </div>
        </motion.div>
        
        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", fontWeight: "900", lineHeight: "1.1", letterSpacing: "-0.04em", margin: "0 0 1.5rem", textShadow: '0 0 40px rgba(255,255,255,0.2)' }}>
          CivicLens-AI
        </motion.h1>
        
        <motion.p variants={fadeUp} style={{ fontSize: "1.4rem", color: "#94a3b8", lineHeight: "1.6", maxWidth: "700px", margin: "0 0 3rem" }}>
          <span style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 'bold' }}>Next-Gen Digital Governance.</span> Transform citizen grievances into actionable intelligence with state-of-the-art LLMs and Real-time Jurisdiction Routing.
        </motion.p>
        
        <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 242, 254, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1.2rem 2.5rem", fontSize: "1.1rem", fontWeight: "800", borderRadius: "14px", background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", color: "#000", border: "none", cursor: "pointer", textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              Report Issue
            </motion.button>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)', boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1.2rem 2.5rem", fontSize: "1.1rem", fontWeight: "800", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", backdropFilter: 'blur(10px)', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              Command Center
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Flashy Glassmorphic Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        style={{ position: 'relative', zIndex: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", padding: "4rem 2rem 8rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        {[
          { icon: <Zap size={36} color="#00f2fe"/>, title: 'AI Routing Engine', desc: 'Instantly routes complaints to TPDDL, MCD, or DJB using Gemini Models & precise geographic bounding.' },
          { icon: <Activity size={36} color="#8b5cf6"/>, title: 'Vector Deduplication', desc: 'Uses pgvector to mathematically cluster duplicate complaints in a geographic radius, saving officer hours.' },
          { icon: <Map size={36} color="#10b981"/>, title: 'Live Heatmaps', desc: 'Dynamic density mapping tracks emerging crisis zones across the city for proactive maintenance.' },
          { icon: <Shield size={36} color="#f43f5e"/>, title: 'Anti-Corruption Loop', desc: 'End-to-end OTP verification prevents unauthorized grievance closures by field officials.' }
        ].map((feature, i) => (
          <motion.div 
            key={i} 
            variants={fadeUp}
            whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.2)' }}
            style={{ 
              padding: "3rem 2rem", 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.05)", 
              borderRadius: "24px",
              backdropFilter: "blur(20px)",
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ marginBottom: "1.5rem", filter: 'drop-shadow(0 0 10px currentColor)' }}>{feature.icon}</div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", fontWeight: "700", color: "#fff" }}>{feature.title}</h3>
            <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.7", margin: "0" }}>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export default Home;