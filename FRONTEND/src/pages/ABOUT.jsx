import GlassCard from "../components/ui/GlassCard.jsx";

function About() {
  return (
    <div style={{ display: "grid", gap: "1.2rem" }}>
      <GlassCard>
        <h2>About CivicLens AI</h2>
        <p>
          Built for civic intelligence using AI + geospatial analytics.
        </p>
      </GlassCard>

      <GlassCard>
        <h3>Features</h3>
        <p>
          • Duplicate detection  
          • AI priority scoring  
          • Location clustering  
          • Real-time dashboard  
        </p>
      </GlassCard>
    </div>
  );
}

export default About;