import React from "react";
import { Link } from "react-router-dom";
import AnimatedWrapper from "../components/ui/AnimatedWrapper.jsx";

function Home() {
  return (
    <AnimatedWrapper>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div className="fade-up delay-1">
          <h1 style={styles.heroTitle}>
            Next-Gen <span className="text-gradient">Digital Governance</span>
          </h1>
          <p style={styles.heroSubtitle}>
            CivicLens AI transforms citizen grievances into actionable intelligence. 
            Powered by state-of-the-art LLMs, Vector Embeddings, and Real-time Heatmaps.
          </p>
          <div style={styles.buttonGroup}>
            <Link to="/submit">
              <button className="glowing-pulse" style={styles.primaryButton}>Report an Issue</button>
            </Link>
            <Link to="/dashboard">
              <button style={styles.secondaryButton}>Command Center</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section style={styles.gridSection}>
        <div className="glass-card fade-up delay-2" style={styles.featureCard}>
          <div style={styles.iconWrapper}>🤖</div>
          <h3>AI Triage Engine</h3>
          <p>Instantly routes complaints to the correct department with an urgency score using Google's Gemini models.</p>
        </div>

        <div className="glass-card fade-up delay-2" style={styles.featureCard}>
          <div style={styles.iconWrapper}>🧬</div>
          <h3>Vector Deduplication</h3>
          <p>Uses Sentence Transformers to mathematically cluster duplicate complaints in the same 1km radius.</p>
        </div>

        <div className="glass-card fade-up delay-3" style={styles.featureCard}>
          <div style={styles.iconWrapper}>🗺️</div>
          <h3>Predictive Heatmaps</h3>
          <p>Live density mapping tracks emerging crisis zones across the city for proactive maintenance deployment.</p>
        </div>

        <div className="glass-card fade-up delay-3" style={styles.featureCard}>
          <div style={styles.iconWrapper}>🔐</div>
          <h3>Anti-Corruption</h3>
          <p>End-to-end OTP verification prevents unauthorized grievance closures by field officials.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass-card fade-up delay-3" style={styles.statsSection}>
        <div style={styles.statBox}>
          <h2 className="text-gradient">3x</h2>
          <p>Faster Resolution Time</p>
        </div>
        <div style={styles.statBox}>
          <h2 className="text-gradient">98%</h2>
          <p>Duplicate Reduction</p>
        </div>
        <div style={styles.statBox}>
          <h2 className="text-gradient">100%</h2>
          <p>Verifiable Closures</p>
        </div>
      </section>
    </AnimatedWrapper>
  );
}

const styles = {
  heroSection: {
    textAlign: "center",
    padding: "6rem 1rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    lineHeight: "1.2",
    margin: "0 0 1.5rem 0",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    margin: "0 0 2.5rem 0",
  },
  buttonGroup: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
  },
  primaryButton: {
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "700",
    borderRadius: "14px",
    background: "var(--accent-gradient)",
    color: "#fff",
    border: "none",
  },
  secondaryButton: {
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "700",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  },
  gridSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "4rem",
  },
  featureCard: {
    padding: "2rem",
    textAlign: "left",
  },
  iconWrapper: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  statsSection: {
    display: "flex",
    justifyContent: "space-around",
    padding: "3rem 1rem",
    textAlign: "center",
  },
  statBox: {
    flex: 1,
  }
};

export default Home;