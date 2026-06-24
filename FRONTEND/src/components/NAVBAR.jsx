import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("civiclens_user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("civiclens_user");
    localStorage.removeItem("civiclens_token");
    navigate("/login");
  };

  return (
    <nav
      className="glass"
      style={{
        margin: "1rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h3 style={{ margin: 0, fontWeight: "bold", background: "linear-gradient(90deg, #60a5fa, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        CivicLens AI
      </h3>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={{...styles.link, ...(location.pathname === "/about" ? styles.activeLink : {})}}>
          About
        </Link>
        <Link to="/architecture" style={{...styles.link, ...(location.pathname === "/architecture" ? styles.activeLink : {})}}>
          Architecture
        </Link>
        
        {user ? (
          <>
            {user.role === "CITIZEN" && <Link to="/submit" style={styles.link}>Submit Issue</Link>}
            {user.role === "CITIZEN" && <Link to="/track" style={styles.link}>Track</Link>}
            
            {(user.role === "OFFICIAL" || user.role === "CM_ADMIN") && (
              <Link to="/dashboard" style={styles.link}>Command Center</Link>
            )}
            
            {user.role === "CM_ADMIN" && <Link to="/insights" style={styles.link}>Insights Heatmap</Link>}

            <button onClick={handleLogout} style={styles.logoutBtn}>Logout ({user.username})</button>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>Login / Register</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  link: { color: "#e2e8f0", textDecoration: "none", fontWeight: "500", transition: "color 0.2s" },
  loginBtn: { background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", padding: "0.5rem 1rem", borderRadius: "8px", color: "white", textDecoration: "none", fontWeight: "bold" },
  logoutBtn: { background: "rgba(239, 68, 68, 0.2)", border: "1px solid rgba(239, 68, 68, 0.5)", padding: "0.5rem 1rem", borderRadius: "8px", color: "#fca5a5", cursor: "pointer", fontWeight: "bold" }
};

export default Navbar;