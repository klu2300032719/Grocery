import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2028", // backend docker port
});

export default api;
