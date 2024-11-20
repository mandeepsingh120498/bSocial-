import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SUPABASE_URL + "/graphql/v1",
    headers: {
      apikey: process.env.REACT_APP_SUPABASE_ANON_KEY as string,
      Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });

// Add request interceptors for attaching tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptors for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
