import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPackageById, createBooking } from '../services/api'
import './BookingForm.css'

function BookingForm() {
  const { packageId } = useParams()
  const navigate = useNavigate()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [pageError, setPageError] = useState('')

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    travelDate: '',
    numberOfTravelers: 1,
  })

  useEffect(() => {
    // Guard: catch undefined/null packageId before calling API
    if (!packageId || packageId === 'undefined' || packageId === 'null') {
      setPageError('No package selected. Please go back and click Book Now on a package.')
      setLoading(false)
      return
    }

    getPackageById(packageId)
      .then(res => {
        console.log('Package loaded for booking:', res.data)
        setPkg(res.data)
      })
      .catch(err => {
        console.error('Failed to load package:', err)
        setPageError('Package not found. It may have been removed. Please go back.')
      })
      .finally(() => setLoading(false))
  }, [packageId])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // safely read a field that might be camelCase or snake_case
  const getF = (obj, camel, snake) => obj[camel] ?? obj[snake] ?? ''

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.customerName || !form.customerEmail || !form.travelDate) {
      alert('Please fill all required fields.')
      return
    }
    if (!pkg) {
      alert('Package data not loaded yet. Please wait and try again.')
      return
    }

    setSubmitting(true)

    const pkgId    = pkg.id ?? pkg.ID
    const pkgName  = getF(pkg, 'packageName', 'package_name')
    const pkgPrice = pkg.price ?? 0
    const travelers = parseInt(form.numberOfTravelers)

    const booking = {
      customerName:      form.customerName,
      customerEmail:     form.customerEmail,
      customerPhone:     form.customerPhone,
      travelDate:        form.travelDate,
      numberOfTravelers: travelers,
      packageId:         pkgId,
      packageName:       pkgName,
      totalAmount:       pkgPrice * travelers,
    }

    console.log('Submitting booking payload:', booking)

    createBooking(booking)
      .then(() => setSuccess(true))
      .catch(err => {
        console.error('Booking POST failed:', err)
        alert('Booking failed. Check browser console (F12) for details.')
      })
      .finally(() => setSubmitting(false))
  }

  // ── Loading ──
  if (loading) return <p className="loading">Loading package details...</p>

  // ── Error (bad id or package not found) ──
  if (pageError) return (
    <div className="success-screen">
      <div className="success-card">
        <span className="success-icon">❌</span>
        <h2>Oops!</h2>
        <p>{pageError}</p>
        <button className="btn-primary" onClick={() => navigate('/packages')}>
          Back to Packages
        </button>
      </div>
    </div>
  )

  // ── Success ──
  if (success) {
    const pkgName = getF(pkg, 'packageName', 'package_name')
    return (
      <div className="success-screen">
        <div className="success-card">
          <span className="success-icon">✅</span>
          <h2>Booking Confirmed!</h2>
          <p>
            Thank you, <strong>{form.customerName}</strong>! Your booking for{' '}
            <strong>{pkgName}</strong> has been received.
          </p>
          <p>
            We will contact you at <strong>{form.customerEmail}</strong> with further details.
          </p>
          <button className="btn-primary" onClick={() => navigate('/my-bookings')}>
            View My Bookings
          </button>
        </div>
      </div>
    )
  }

  // ── safe field reads for the form ──
  const pkgName  = getF(pkg, 'packageName',  'package_name')
  const pkgDays  = getF(pkg, 'durationDays', 'duration_days')
  const pkgGroup = getF(pkg, 'maxGroupSize', 'max_group_size')
  const pkgIncl  = getF(pkg, 'inclusions',   'inclusions')
  const pkgPrice = pkg.price ?? 0

  return (
    <main className="page-main">
      <div className="page-header">
        <h1>Book Your Trip</h1>
        <p>Fill in your details to confirm the booking</p>
      </div>

      <div className="container booking-layout">

        {/* Package Summary Panel */}
        <div className="pkg-summary card">
          <div className="card-img-placeholder">🌄</div>
          <div className="card-body">
            <h3>{pkgName}</h3>
            <p className="location">📍 {pkg.destination}</p>
            <div className="summary-details">
              <p>🗓 Duration: <strong>{pkgDays} Days</strong></p>
              <p>👥 Max Group: <strong>{pkgGroup} people</strong></p>
              <p>🎯 Difficulty: <strong>{pkg.difficulty}</strong></p>
              {pkgIncl && <p>✅ Includes: <strong>{pkgIncl}</strong></p>}
            </div>
            <p className="summary-price">
              Rs. {pkgPrice?.toLocaleString()} <span>per person</span>
            </p>
            {form.numberOfTravelers > 1 && (
              <p className="total-price">
                Total: Rs. {(pkgPrice * form.numberOfTravelers).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form className="booking-form card" onSubmit={handleSubmit}>
          <h2>Your Details</h2>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="customerEmail"
              value={form.customerEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="customerPhone"
              value={form.customerPhone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="form-group">
            <label>Travel Date *</label>
            <input
              type="date"
              name="travelDate"
              value={form.travelDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label>Number of Travellers</label>
            <input
              type="number"
              name="numberOfTravelers"
              value={form.numberOfTravelers}
              onChange={handleChange}
              min="1"
              max={pkgGroup || 20}
            />
          </div>

          <button
            type="submit"
            className="btn-primary submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>

      </div>
    </main>
  )
}

export default BookingForm
