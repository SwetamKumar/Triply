import axios from 'axios'

const API_BASE = 'http://localhost:8081/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// ---- Destinations ----
export const getAllDestinations = () => api.get('/destinations/viewall')
export const getDestinationById = (id) => api.get(`/destinations/view/${id}`)
export const getDestinationsByCategory = (category) => api.get(`/destinations/category/${category}`)
export const searchDestinations = (name) => api.get(`/destinations/search?name=${name}`)
export const addDestination = (data) => api.post('/destinations/add', data)
export const updateDestination = (id, data) => api.put(`/destinations/update/${id}`, data)
export const deleteDestination = (id) => api.delete(`/destinations/delete/${id}`)

// ---- Tour Packages ----
export const getAllPackages = () => api.get('/packages/viewall')
export const getPackageById = (id) => api.get(`/packages/view/${id}`)
export const searchPackagesByDestination = (dest) => api.get(`/packages/search?destination=${dest}`)
export const filterPackagesByPrice = (maxPrice) => api.get(`/packages/filter?maxPrice=${maxPrice}`)
export const addPackage = (data) => api.post('/packages/add', data)
export const updatePackage = (id, data) => api.put(`/packages/update/${id}`, data)
export const deletePackage = (id) => api.delete(`/packages/delete/${id}`)

// ---- Bookings ----
export const createBooking = (data) => api.post('/bookings/create', data)
export const getAllBookings = () => api.get('/bookings/viewall')
export const getBookingById = (id) => api.get(`/bookings/view/${id}`)

// ✅ FIXED HERE
export const getBookingsByEmail = (email) =>
  api.get(`/bookings/email/${email}`)

export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/status/${id}?status=${status}`)

export const cancelBooking = (id) =>
  api.put(`/bookings/cancel/${id}`)

export default api