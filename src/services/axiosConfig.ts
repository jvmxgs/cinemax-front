import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    const token = authStore.token || localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance;
