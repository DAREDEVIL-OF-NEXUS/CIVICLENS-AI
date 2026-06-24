import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Activity, Map, Shield, Server, ArrowRight } from "lucide-react";
import CometCursor from "../components/CometCursor";
import Footer from "../components/FOOTER.jsx";

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
      
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(100px)', zIndex: 0 }} />

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{ position: 'relative', zIndex: 10, textAlign: "center", padding: "12rem 1rem 8rem", maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '8px 24px', borderRadius: '999px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.9rem', fontWeight: 'bold', color: '#60A5FA' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#60A5FA', boxShadow: '0 0 10px #60A5FA' }}></span>
            Transforming Governance Intelligence
          </div>
        </motion.div>
        
        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: "900", lineHeight: "1.1", letterSpacing: "-0.04em", margin: "0 0 1.5rem", textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
          Turning Civic Complaints into <br/>
          <span style={{ background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Structured Action.</span>
        </motion.h1>
        
        <motion.p variants={fadeUp} style={{ fontSize: "1.3rem", color: "#94a3b8", lineHeight: "1.6", maxWidth: "700px", margin: "0 0 3rem" }}>
          CivicLens AI solves the $1B+ governance transparency problem. It ingests messy grievance data, automatically detects duplicates via Vector AI, and routes actionable insights directly to the Chief Minister's Dashboard.
        </motion.p>
        
        <motion.div variants={fadeUp} style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/submit" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 242, 254, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1.2rem 2.5rem", fontSize: "1.1rem", fontWeight: "800", borderRadius: "14px", background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)", color: "#000", border: "none", cursor: "pointer", textTransform: 'uppercase' }}
            >
              Report an Issue
            </motion.button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: "1.2rem 2.5rem", fontSize: "1.1rem", fontWeight: "800", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", backdropFilter: 'blur(10px)' }}
            >
              Our Story
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* The Problem & Solution Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        style={{ position: 'relative', zIndex: 10, padding: "6rem 2rem", background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem" }}>Why Current Systems Fail</h2>
            <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "600px", margin: "0 auto" }}>Authorities are overwhelmed. Citizens are ignored. The gap between complaint registration and actual resolution is broken.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { title: "Duplicates & Noise", desc: "Thousands of citizens report the same pothole, creating massive backlog queues." },
              { title: "Wrong Department Routing", desc: "A water issue gets sent to the electricity board, delaying resolution by weeks." },
              { title: "Zero Accountability", desc: "Field officials close issues without actually fixing them on the ground." }
            ].map((prob, i) => (
              <div key={i} style={{ padding: "2rem", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "16px" }}>
                <h3 style={{ fontSize: "1.3rem", color: "#f87171", marginBottom: "1rem" }}>{prob.title}</h3>
                <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Features Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        style={{ position: 'relative', zIndex: 10, padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem" }}>The CivicLens Solution</h2>
          <p style={{ fontSize: "1.2rem", color: "#94a3b8" }}>Enterprise-grade AI built for National Scale Governance.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            { icon: <Zap size={36} color="#00f2fe"/>, title: 'AI Classification Engine', desc: 'Gemini Models instantly analyze complaint text, determine urgency, and classify the exact department required (e.g. DJB vs PWD).' },
            { icon: <Activity size={36} color="#8b5cf6"/>, title: 'pgvector Deduplication', desc: 'Converts complaints into 384-dimensional mathematical vectors to instantly merge identical reports within a 500m radius.' },
            { icon: <Map size={36} color="#10b981"/>, title: 'CM Heatmap Dashboards', desc: 'Dynamic geographic density mapping tracks emerging crisis zones across the city for proactive administrative maintenance.' },
            { icon: <Shield size={36} color="#f43f5e"/>, title: 'Anti-Corruption OTP Loop', desc: 'End-to-end OTP verification. An official cannot mark a complaint "Resolved" unless the citizen provides the closing OTP.' }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              whileHover={{ y: -10, background: "rgba(255,255,255,0.05)" }}
              style={{ padding: "3rem 2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", backdropFilter: "blur(20px)", transition: 'all 0.3s ease' }}
            >
              <div style={{ marginBottom: "1.5rem" }}>{feature.icon}</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", fontWeight: "700" }}>{feature.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: "1.7", margin: "0" }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <section style={{ padding: "6rem 2rem", textAlign: "center", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(59,130,246,0.1) 100%)" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem" }}>Dive deeper into the architecture.</h2>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/architecture" style={{ textDecoration: 'none' }}>
            <button style={{ padding: "1rem 2rem", fontSize: "1.1rem", borderRadius: "12px", background: "#fff", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              View Implementation <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;