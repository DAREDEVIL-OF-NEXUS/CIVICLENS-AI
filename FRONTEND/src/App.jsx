import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NAVBAR.jsx";
import Footer from "./components/FOOTER.jsx";
import Home from "./pages/HOME.jsx";
import About from "./pages/ABOUT.jsx";
import SubmitComplaint from "./pages/SUBMIT_COMPLAINT.jsx";
import AdminDashboard from "./pages/ADMIN_DASHBOARD.jsx";
import ComplaintDetails from "./pages/COMPLAINT_DETAILS.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/submit" element={<SubmitComplaint />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;