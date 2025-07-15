import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e22653ff9fd7.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default axiosInstance;



// hey hey hey hey 