import React, { useEffect, useRef, useState } from "react";
import ComplaintForm from "../components/COMPLAINT_FORM";
import { motion } from "framer-motion";
import { MapPin, Zap, AlertTriangle } from "lucide-react";

function SubmitComplaint() {
  const [mockAI, setMockAI] = useState({ category: "Analyzing...", priority: "Calculating..." });

  useEffect(() => {
    // Simulate AI working while typing
    const timer = setTimeout(() => {
      setMockAI({ category: "Electricity / TPDDL", priority: "High (Urgent)" });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', padding: '0 2rem' }}>
        
        {/* Main Form Area */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <section style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#60a5fa', fontWeight: 'bold' }}>Complaint Intake</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0' }}>Submit Grievance</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
              Add details, upload evidence, and let our 3-Tier AI automate the classification and routing.
            </p>
          </section>

          <ComplaintForm />
        </motion.div>

        {/* AI Preview Panel (Side) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ position: 'sticky', top: '100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(20px)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={20} color="#eab308" /> AI Real-time Analysis
            </h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Detected Category</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#60a5fa', marginTop: '0.2rem' }}>{mockAI.category}</div>
              </div>
              
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Priority Score</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f87171', marginTop: '0.2rem' }}>{mockAI.priority}</div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Geographic Routing</label>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#a78bfa', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> Awaiting Address...
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                <div style={{ display: 'flex', gap: '0.5rem', color: '#eab308', fontWeight: '600', fontSize: '0.9rem' }}>
                  <AlertTriangle size={16} /> Possible Duplicate?
                </div>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#fef08a' }}>Vector embedding will run on submission to check 1km radius.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default SubmitComplaint;
