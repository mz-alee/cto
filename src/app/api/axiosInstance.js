import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cto-project-production.up.railway.app/",
  
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default axiosInstance;
