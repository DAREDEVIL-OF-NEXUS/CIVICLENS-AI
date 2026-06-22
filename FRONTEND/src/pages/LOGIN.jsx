import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "CITIZEN",
    department: "",
    jurisdiction_region: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    
    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("civiclens_token", data.access_token);
        localStorage.setItem("civiclens_user", JSON.stringify(data.user));
        navigate(data.user.role === "CITIZEN" ? "/track" : "/dashboard");
      } else {
        alert(data.detail || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <div className="glass-card" style={styles.card}>
        <h2 style={styles.title}>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p style={styles.subtitle}>CivicLens AI Command Center</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {isRegister && (
            <select 
              style={styles.input}
              value={formData.role} 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="CITIZEN">Citizen (Report Issues)</option>
              <option value="OFFICIAL">Government Official (Resolve Issues)</option>
              <option value="CM_ADMIN">CM Office (Command Center)</option>
            </select>
          )}

          {isRegister && formData.role === "OFFICIAL" && (
            <>
              <input
                style={styles.input}
                type="text"
                placeholder="Department (e.g. WATER_SUPPLY)"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <input
                style={styles.input}
                type="text"
                placeholder="Jurisdiction (e.g. SOUTH_DELHI)"
                value={formData.jurisdiction_region}
                onChange={(e) => setFormData({ ...formData, jurisdiction_region: e.target.value })}
              />
            </>
          )}

          <button type="submit" style={styles.button}>
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isRegister ? "Already have an account? " : "Don't have an account? "}
          <span style={styles.toggleLink} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "2.5rem",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    textAlign: "center"
  },
  title: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#fff"
  },
  subtitle: {
    margin: "0 0 2rem 0",
    color: "#94a3b8",
    fontSize: "0.9rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.2)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem"
  },
  toggleText: {
    marginTop: "1.5rem",
    color: "#94a3b8",
    fontSize: "0.9rem"
  },
  toggleLink: {
    color: "#60a5fa",
    cursor: "pointer",
    textDecoration: "underline"
  }
};
