import { Route, Routes } from "react-router-dom";

import Navbar from "./components/NAVBAR.jsx";
import Footer from "./components/FOOTER.jsx";

import Home from "./pages/HOME.jsx";
import About from "./pages/ABOUT.jsx";
import SubmitComplaint from "./pages/SUBMIT_COMPLAINT.jsx";
import TrackComplaints from "./pages/TRACK_COMPLAINTS.jsx";
import AdminDashboard from "./pages/ADMIN_DASHBOARD.jsx";
import ComplaintDetails from "./pages/COMPLAINT_DETAILS.jsx";
import Insights from "./pages/INSIGHTS.jsx";
import Login from "./pages/LOGIN.jsx";

import "./styles/theme.css";

function AppShell({ children }) {
  return (
    <div
      className="fade-up"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          padding: "1.4rem 1.25rem 3rem",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/submit" element={<SubmitComplaint />} />
        <Route path="/track" element={<TrackComplaints />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
      </Routes>
    </AppShell>
  );
}

export default App;