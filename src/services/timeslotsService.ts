import axios from './axiosConfig'

export const getTimeslots = async (currentPage = 1) => {
  try {
    const response = await axios.get('/time-slots?page=' + currentPage)
    return response.data
  } catch (error) {
    throw new Error('Error fetching movies')
  }
}

export const getTimeslot = async (timeslotId) => {
  const response = await axios.get('/time-slots/' + timeslotId)
  return response.data
}

export const storeTimeslot = async (data) => {
  const response = await axios.post('/time-slots', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

export const updateTimeslot = async (data, timeslotId) => {
  const response = await axios.post('/time-slots/' + timeslotId, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [(data) => data]
  })
  return response
}

export const deleteTimeslot = async (timeslotId) => {
  const response = await axios.delete('/time-slots/' + timeslotId)
  return response.data
}
