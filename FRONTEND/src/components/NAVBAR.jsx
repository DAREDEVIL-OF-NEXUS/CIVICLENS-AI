import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="glass"
      style={{
        margin: "1rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h3>CivicLens AI</h3>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/submit">Submit</Link>
        <Link to="/track">Track</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;