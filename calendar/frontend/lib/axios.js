import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});

export default axiosInstance