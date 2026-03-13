import axios from "axios";

const API = axios.create({
  baseURL: "https://civiclens-ai-35yu.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHealthStatus = () => API.get("/health/");
export const getAllComplaints = () => API.get("/complaints/");
export const getComplaintById = (complaintId) => API.get(`/complaints/${complaintId}`);

export const createComplaint = (payload) =>
  API.post("/complaints/", payload);

export const updateComplaintStatus = (complaintId, payload) =>
  API.patch(`/complaints/${complaintId}/status`, payload);

export const getDashboardStats = () => API.get("/dashboard/stats");

export const analyzeComplaint = (payload) =>
  API.post("/analyze/", payload);

export default API;