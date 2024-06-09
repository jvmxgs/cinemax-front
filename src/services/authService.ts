import axios from './axiosConfig'

interface LoginCredentials {
  email: string
  password: string
}

export const login = async (credentials: LoginCredentials) => {
    return await axios.post('/login', credentials)
}
