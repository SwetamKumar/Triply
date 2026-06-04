import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './assets/components/navbar.jsx'
import Footer from './assets/components/footer.jsx'

import Home from './assets/pages/Home.jsx'
import Destinations from './assets/pages/Destinations.jsx'
import Packages from './assets/pages/Packages.jsx'
import BookingForm from './assets/pages/BookingForm.jsx'
import MyBookings from './assets/pages/MyBookings.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/book/:packageId" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
