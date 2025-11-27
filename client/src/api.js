import axios from "axios";

const api = axios.create({
  baseURL: "http://backend-service:2026",  // 🟢 correct inside Kubernetes
});

export default api;
