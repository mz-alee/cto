import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://b98744752438.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default axiosInstance;
