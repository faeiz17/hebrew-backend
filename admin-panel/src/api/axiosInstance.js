import axios from "axios";

const API = axios.create({
  baseURL: "https://hebrew-backend-44h3.vercel.app/api", // Update this if your backend is hosted
  headers: { "Content-Type": "application/json" },
});

export default API;
