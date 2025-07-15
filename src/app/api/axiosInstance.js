import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ca388046c631.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default axiosInstance;
