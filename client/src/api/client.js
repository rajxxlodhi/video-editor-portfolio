import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cinematic_admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getProjects = (params) => api.get("/projects", { params });
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (payload) => api.post("/projects", payload);
export const updateProject = (id, payload) => api.put(`/projects/${id}`, payload);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getServices = () => api.get("/services");
export const createService = (payload) => api.post("/services", payload);
export const updateService = (id, payload) => api.put(`/services/${id}`, payload);
export const deleteService = (id) => api.delete(`/services/${id}`);

export const getTestimonials = () => api.get("/testimonials");
export const createTestimonial = (payload) => api.post("/testimonials", payload);
export const updateTestimonial = (id, payload) => api.put(`/testimonials/${id}`, payload);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);

export const submitContact = (payload) => api.post("/contact", payload);
export const getContacts = () => api.get("/contact");

export const loginAdmin = (payload) => api.post("/auth/login", payload);
export const getUploadSignature = (payload) => api.post("/upload/signature", payload);

export default api;
