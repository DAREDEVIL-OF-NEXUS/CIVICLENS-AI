import React from "react";
import { motion } from "framer-motion";
import CometCursor from "../components/CometCursor";
import Footer from "../components/FOOTER.jsx";

function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050B14', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CometCursor />
      
      {/* Header */}
      <header style={{ padding: "8rem 2rem 4rem", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "4rem", fontWeight: "900", marginBottom: "1.5rem", background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          The Origin Story
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontSize: "1.3rem", color: "#cbd5e1", lineHeight: "1.8" }}>
          How a lizard in a water cooler inside Delhi Technological University sparked the creation of a GovTech platform recognized nationally at India Innovates 2026.
        </motion.p>
      </header>

      {/* The Journey Timeline */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem" }}>
        {[
          {
            year: "The Spark",
            title: "The DTU Water Cooler Incident",
            desc: "As a first-year B.Tech CSE student at DTU, my friends and I discovered a lizard inside a daily-use water cooler at Pragya Bhawan. We filed a complaint immediately. Days passed. Weeks passed. No action was taken. The complaint was buried.",
            align: "left"
          },
          {
            year: "The Realization",
            title: "A Nationwide Vulnerability",
            desc: "After speaking with seniors and administration, I realized the problem wasn't a lack of intent—it was unstructured data. Authorities were overwhelmed. Duplicate complaints drowned out urgent issues. Wrong department routing caused endless delays. I realized this exact problem plagues municipalities and state governments nationwide.",
            align: "right"
          },
          {
            year: "The Build",
            title: "Architecting CivicLens AI",
            desc: "I set out to build a platform that strips away the chaos. Using AI and Vector embeddings, CivicLens was born. It automatically reads complaints, deduplicates them, assigns priority, and routes them to the correct CM or Department dashboard. Zero human bottlenecks.",
            align: "left"
          },
          {
            year: "The Recognition",
            title: "India Innovates 2026",
            desc: "CivicLens AI was presented on a national stage. Out of 1000+ teams, we secured a spot in the Top 17 and advanced to the evaluation rounds for Delhi Government grievance management initiatives.",
            align: "right"
          }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            style={{ 
              display: "flex", 
              flexDirection: item.align === "left" ? "row" : "row-reverse",
              gap: "3rem",
              marginBottom: "4rem",
              alignItems: "center"
            }}
          >
            <div style={{ flex: 1, textAlign: item.align, padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: "#3b82f6", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.8rem" }}>{item.year}</span>
              <h3 style={{ fontSize: "1.8rem", margin: "0.5rem 0 1rem" }}>{item.title}</h3>
              <p style={{ color: "#94a3b8", lineHeight: "1.7", fontSize: "1.1rem" }}>{item.desc}</p>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              {/* Optional graphic/icon placeholder */}
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 20px #3b82f6" }} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Proof Gallery */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem" }}>India Innovates Journey</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <img src="/images/proof1.png" alt="Proof 1" style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }} />
          <img src="/images/proof2.png" alt="Proof 2" style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }} />
          <img src="/images/proof3.png" alt="Proof 3" style={{ width: "100%", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)" }} />
        </div>
      </section>

      {/* Meet the Builder */}
      <section style={{ padding: "6rem 2rem", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Who built this?</h2>
          <h3 style={{ fontSize: "1.5rem", color: "#60a5fa", marginBottom: "1.5rem" }}>Lakshay Bharti</h3>
          <p style={{ color: "#94a3b8", fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "2rem" }}>
            First-year B.Tech CSE student at Delhi Technological University. I build GovTech solutions and AI/ML applications to solve real-world problems. CivicLens is built on the belief that technology should foster transparency, accountability, and citizen-first governance.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;