import axios from "axios";

const api = axios.create({
  baseURL: "https://travelverse-qqg6.onrender.com/api",
});

export default api;