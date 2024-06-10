import axios from './axiosConfig'

export const getMovies = async (currentPage = 1) => {
  try {
    const response = await axios.get('/movies?page=' + currentPage)
    return response.data
  } catch (error) {
    throw new Error('Error fetching movies')
  }
}

export const getMovie = async (movieId) => {
  const response = await axios.get('/movies/' + movieId)
  return response.data
}

export const storeMovie = async (data) => {
  const response = await axios.post('/movies', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

export const deleteMovie = async (movieId) => {
  const response = await axios.delete('/movies/' + movieId)
  return response.data
}
