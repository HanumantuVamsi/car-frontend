import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083', // Replace with your backend server URL
});

export default axiosInstance;
