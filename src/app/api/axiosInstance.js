import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://0b42bb76d672.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
