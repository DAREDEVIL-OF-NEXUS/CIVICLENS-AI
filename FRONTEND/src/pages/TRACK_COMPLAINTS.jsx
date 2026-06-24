import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/API.js";
import UserContextBanner from "../components/UserContextBanner.jsx";
import { useUserSession } from "../context/UserSessionContext.jsx";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";

function TrackComplaints() {
  const { username } = useUserSession();

  const [summary, setSummary] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verifyingId, setVerifyingId] = useState(null);

  const loadTrackingData = async (currentUsername) => {
    const cleanUsername = String(currentUsername || "").trim();

    if (!cleanUsername) {
      setSummary(null);
      setComplaints([]);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const [summaryResponse, complaintsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/tracking/summary?username=${encodeURIComponent(cleanUsername)}`),
        fetch(`${API_BASE_URL}/api/tracking/user?username=${encodeURIComponent(cleanUsername)}`),
      ]);

      const summaryData = await summaryResponse.json();
      const complaintsData = await complaintsResponse.json();

      if (!summaryResponse.ok) throw new Error(summaryData?.detail || "Failed to fetch summary.");
      if (!complaintsResponse.ok) throw new Error(complaintsData?.detail || "Failed to fetch complaints.");

      setSummary(summaryData);
      setComplaints(Array.isArray(complaintsData) ? complaintsData : []);
    } catch (error) {
      setMessage(error.message || "Tracking failed.");
      setSummary(null);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTrackingData(username);
  }, [username]);

  const handleVerify = async (id, isResolved) => {
    setVerifyingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/complaints/${id}/verify-closure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_resolved: isResolved, otp: "1234" })
      });
      if (res.ok) {
        alert(isResolved ? "Thank you! Complaint permanently closed." : "Complaint reopened and escalated to vigilance!");
        loadTrackingData(username);
      } else {
        alert("Verification failed.");
      }
    } catch (e) {
      alert("Error verifying.");
    } finally {
      setVerifyingId(null);
    }
  };

  const renderTimeline = (status) => {
    const steps = ["NEW", "ASSIGNED", "IN_PROGRESS", "RESOLVED"];
    const currentIndex = steps.indexOf(status) > -1 ? steps.indexOf(status) : 0;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', width: '100%' }}>
        {steps.map((step, idx) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 0 }}>
            <div style={{ 
              width: '24px', height: '24px', borderRadius: '50%', 
              background: idx <= currentIndex ? '#3b82f6' : 'rgba(255,255,255,0.1)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              boxShadow: idx <= currentIndex ? '0 0 10px rgba(59,130,246,0.5)' : 'none'
            }}>
              {idx <= currentIndex && <CheckCircle size={14} color="white" />}
            </div>
            {idx < steps.length - 1 && (
              <div style={{ height: '2px', background: idx < currentIndex ? '#3b82f6' : 'rgba(255,255,255,0.1)', flex: 1, margin: '0 8px' }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: "1.4rem", paddingBottom: '40px' }}>
      <UserContextBanner />

      <section style={{ borderRadius: "24px", padding: "2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
        <h1 style={{ margin: "0 0 0.5rem" }}>Citizen Timeline & Anti-Corruption</h1>
        <p style={{ margin: 0, opacity: 0.88 }}>
          Track the Swiggy-style journey of your complaint. If an officer falsely marks it resolved, reject it to trigger the fraud vigilance system.
        </p>
      </section>

      {loading && <p>Loading tracking data...</p>}
      {message && <div style={{ padding: "1rem", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.24)", borderRadius: "14px" }}>{message}</div>}

      {complaints.map(complaint => (
        <motion.div key={complaint.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: "1.5rem", borderRadius: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem' }}>#{complaint.id} - {complaint.title}</h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                Department: <strong>{complaint.department}</strong> | Status: <strong>{complaint.status}</strong>
              </div>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '4px 12px', borderRadius: '20px', color: '#fca5a5', fontSize: '0.85rem', fontWeight: 'bold' }}>
              Queue Pos: {summary?.queue_positions?.[complaint.id] ?? "N/A"}
            </div>
          </div>

          {renderTimeline(complaint.status)}

          {/* Anti-Corruption Block */}
          {complaint.status === "RESOLVED" && !complaint.otp_verified_closure && !complaint.contested_closure && (
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '16px' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#93c5fd' }}>OTP Verification Required</h4>
              <p style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>The assigned officer has marked this issue as resolved. Please physically verify the site and confirm.</p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button disabled={verifyingId === complaint.id} onClick={() => handleVerify(complaint.id, true)} style={{ padding: '0.8rem 1.5rem', background: '#10b981', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                  Yes, Issue is Fixed (Verify OTP)
                </button>
                <button disabled={verifyingId === complaint.id} onClick={() => handleVerify(complaint.id, false)} style={{ padding: '0.8rem 1.5rem', background: '#ef4444', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={16} /> FAKE CLOSURE - Reopen!
                </button>
              </div>
            </div>
          )}

          {complaint.contested_closure && (
             <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#fca5a5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <AlertTriangle size={18} /> This complaint was contested by the citizen. The priority has been maximized and the officer flagged for vigilance review.
             </div>
          )}

          {complaint.otp_verified_closure && (
             <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', color: '#6ee7b7', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <CheckCircle size={18} /> Resolution verified via Citizen OTP.
             </div>
          )}

        </motion.div>
      ))}
    </div>
  );
}

export default TrackComplaints;