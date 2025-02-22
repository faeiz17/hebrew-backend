import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if your backend is hosted
  headers: { "Content-Type": "application/json" },
});

export default API;
