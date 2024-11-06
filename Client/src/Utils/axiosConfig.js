import axios from "axios";

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 10000, // Optional: set a timeout
});

export default Axios;
