import axios from './axiosConfig'

export const getBillboard = async () => {
  try {
    const response = await axios.get('/billboard')
    return response.data
  } catch (error) {
    throw new Error('Error fetching billboard')
  }
}
