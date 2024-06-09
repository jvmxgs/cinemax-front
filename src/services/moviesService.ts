import axios from './axiosConfig'

export const getMovies = async (currentPage = 1) => {
  try {
    const response = await axios.get('/movies?page=' + currentPage)
    return response.data
  } catch (error) {
    throw new Error('Error fetching movies')
  }
}

export const deleteMovie = async (movieId) => {
    const response = await axios.delete('/movies/' + movieId)
    return response.data
}
