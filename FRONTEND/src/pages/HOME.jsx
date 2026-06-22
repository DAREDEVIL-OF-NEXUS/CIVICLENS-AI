import AnimatedWrapper from "../components/ui/AnimatedWrapper.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";

function Home() {
  return (
    <AnimatedWrapper>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        
        <GlassCard>
          <h1>🚀 CivicLens AI</h1>
          <p>
            AI-powered grievance intelligence platform for smart cities.
            Detect duplicates, prioritize complaints, and optimize civic response.
          </p>
        </GlassCard>

        <GlassCard>
          <h2>💡 What Problem We Solve</h2>
          <p>
            Governments receive thousands of complaints daily — but:
            <br />• duplicates overload system  
            <br />• priority is misjudged  
            <br />• response is slow  
          </p>
        </GlassCard>

        <GlassCard>
          <h2>⚡ Our Solution</h2>
          <p>
            CivicLens AI:
            <br />✔ AI priority scoring  
            <br />✔ Duplicate detection  
            <br />✔ Heatmap clustering  
            <br />✔ Department routing  
          </p>
        </GlassCard>

        <GlassCard>
          <h2>📊 Impact</h2>
          <p>
            Faster response, better governance, and smarter cities.
          </p>
        </GlassCard>

      </div>
    </AnimatedWrapper>
  );
}

export default Home;