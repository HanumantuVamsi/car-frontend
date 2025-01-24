import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083', // Replace with your backend server URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Bypass the interceptor for login and register routes
    if (config.url.includes('login') || config.url.includes('register')) {
      return config;
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
