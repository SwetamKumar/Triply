import { useState } from 'react'
import { getBookingsByEmail, cancelBooking } from '../services/api'
import './MyBookings.css'

const STATUS_COLORS = {
  PENDING:   { bg: '#fff8e1', color: '#f57f17' },
  CONFIRMED: { bg: '#e8f5e9', color: '#2e7d32' },
  CANCELLED: { bg: '#fce4ec', color: '#c62828' },
}

function MyBookings() {
  const [email, setEmail]       = useState('')
  const [bookings, setBookings] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    getBookingsByEmail(email)
      .then(res => {
        console.log('Bookings from backend:', res.data)
        setBookings(res.data)
        setSearched(true)
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err)
        setError('Could not fetch bookings. Make sure the backend is running.')
      })
      .finally(() => setLoading(false))
  }

  const handleCancel = (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    cancelBooking(id)
      .then(() => {
        // update status in UI immediately without re-fetching
        setBookings(prev =>
          prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b)
        )
      })
      .catch((err) => {
        console.error('Cancel error:', err)
        alert('Cancellation failed. Please try again.')
      })
  }

  // safely read fields — handles camelCase and snake_case
  const getField = (obj, camel, snake) => obj[camel] ?? obj[snake] ?? '—'

  return (
    <main className="page-main">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Enter your email to view and manage your bookings</p>
      </div>

      <div className="container">

        {/* Email Search Form */}
        <form className="email-lookup" onSubmit={handleSearch}>
          <input
            type="email"
            placeholder="Enter your registered email address..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Find Bookings'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {searched && !loading && (
          bookings.length === 0 ? (
            <div className="no-bookings">
              <span>🔍</span>
              <h3>No bookings found</h3>
              <p>We couldn't find any bookings for <strong>{email}</strong>.</p>
            </div>
          ) : (
            <div className="bookings-list">
              <p className="results-count">
                {bookings.length} booking(s) found for <strong>{email}</strong>
              </p>

              {bookings.map(b => {
                const status      = b.status ?? 'PENDING'
                const style       = STATUS_COLORS[status] ?? STATUS_COLORS.PENDING
                const bookingId   = b.id ?? b.ID
                const pkgName     = getField(b, 'packageName',       'package_name')
                const custName    = getField(b, 'customerName',      'customer_name')
                const custEmail   = getField(b, 'customerEmail',     'customer_email')
                const custPhone   = getField(b, 'customerPhone',     'customer_phone')
                const travelDate  = getField(b, 'travelDate',        'travel_date')
                const travelers   = getField(b, 'numberOfTravelers', 'number_of_travelers')
                const bookingDate = getField(b, 'bookingDate',       'booking_date')
                const totalAmt    = b.totalAmount ?? b.total_amount ?? 0

                return (
                  <div className="booking-card card" key={bookingId}>

                    <div className="booking-header">
                      <div>
                        <h3>{pkgName}</h3>
                        <p className="booking-id">Booking ID: <strong>#{bookingId}</strong></p>
                      </div>
                      <span
                        className="status-badge"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="booking-details">
                      <div className="detail-item">
                        <span className="detail-label">👤 Name</span>
                        <span>{custName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📧 Email</span>
                        <span>{custEmail}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📞 Phone</span>
                        <span>{custPhone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">🗓 Travel Date</span>
                        <span>{travelDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">👥 Travellers</span>
                        <span>{travelers}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">📅 Booked On</span>
                        <span>{bookingDate}</span>
                      </div>
                    </div>

                    <div className="booking-footer">
                      <span className="total-amount">
                        Total: ₹{Number(totalAmt).toLocaleString()}
                      </span>
                      {status !== 'CANCELLED' && (
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancel(bookingId)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>

                  </div>
                )
              })}
            </div>
          )
        )}
      </div>
    </main>
  )
}

export default MyBookings
