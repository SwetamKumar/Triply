import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDestinations, getAllPackages } from '../services/api'
import './Home.css'

function Home() {
  const [featuredDestinations, setFeaturedDestinations] = useState([])
  const [featuredPackages, setFeaturedPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getAllDestinations(), getAllPackages()])
      .then(([destRes, pkgRes]) => {
        console.log('Destinations:', destRes.data)
        console.log('Packages:', pkgRes.data)
        setFeaturedDestinations(destRes.data.slice(0, 3))
        setFeaturedPackages(pkgRes.data.slice(0, 3))
      })
      .catch(err => console.error('Home fetch error:', err))
      .finally(() => setLoading(false))
  }, [])

  // safely read fields regardless of camelCase vs snake_case
  const getField = (obj, camel, snake) => obj?.[camel] ?? obj?.[snake] ?? ''

  const handleBookNow = (pkg) => {
    const id = pkg.id ?? pkg.ID
    if (!id) {
      alert('Package ID not found. Check browser console.')
      return
    }
    navigate(`/book/${id}`)
  }

  return (
    <main>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the World <span>with Triply</span></h1>
          <p>Your trusted travel companion for unforgettable journeys across India and beyond.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/packages')}>
              Explore Packages
            </button>
            <button className="btn-accent" onClick={() => navigate('/destinations')}>
              View Destinations
            </button>
          </div>
        </div>
      </section>

      {/* ── Why Triply ── */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Triply?</h2>
          <p className="section-subtitle">We make every journey special</p>
          <div className="features-grid">
            {[
              { icon: '🏆', title: 'Best Prices',      desc: 'Competitive pricing with no hidden charges.' },
              { icon: '🛡️', title: 'Safe Travel',      desc: 'Verified packages and secure booking process.' },
              { icon: '🌍', title: '100+ Destinations', desc: 'Explore beautiful destinations across India.' },
              { icon: '📞', title: '24/7 Support',      desc: 'Our team is always ready to assist you.' },
            ].map(f => (
              <div className="feature-card" key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Destinations ── */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">Handpicked places you'll love</p>

          {loading ? (
            <p className="loading">Loading destinations...</p>
          ) : featuredDestinations.length === 0 ? (
            <p className="loading">No destinations added yet.</p>
          ) : (
            <div className="cards-grid">
              {featuredDestinations.map((dest, i) => {
                const name     = getField(dest, 'name',            'name')
                const location = getField(dest, 'location',        'location')
                const desc     = getField(dest, 'description',     'description')
                const category = getField(dest, 'category',        'category')
                const rating   = dest.rating ?? ''
                const id       = dest.id ?? dest.ID ?? i

                return (
                  <div className="card dest-card" key={id}>
                    <div className="card-img-placeholder">🏔️</div>
                    <div className="card-body">
                      <span className="category-badge">{category}</span>
                      <h3>{name}</h3>
                      <p className="location">📍 {location}</p>
                      <p className="description">{desc?.substring(0, 80)}...</p>
                      {rating && <p className="rating">⭐ {rating}/5</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="section-cta">
            <button className="btn-primary" onClick={() => navigate('/destinations')}>
              See All Destinations →
            </button>
          </div>
        </div>
      </section>

      {/* ── Featured Packages ── */}
      <section className="featured-section bg-light">
        <div className="container">
          <h2 className="section-title">Top Tour Packages</h2>
          <p className="section-subtitle">Curated experiences for every traveller</p>

          {loading ? (
            <p className="loading">Loading packages...</p>
          ) : featuredPackages.length === 0 ? (
            <p className="loading">No packages added yet.</p>
          ) : (
            <div className="cards-grid">
              {featuredPackages.map((pkg, i) => {
                const pkgId   = pkg.id ?? pkg.ID ?? i
                const pkgName = getField(pkg, 'packageName',  'package_name')
                const dest    = getField(pkg, 'destination',  'destination')
                const desc    = getField(pkg, 'description',  'description')
                const days    = getField(pkg, 'durationDays', 'duration_days')
                const group   = getField(pkg, 'maxGroupSize', 'max_group_size')
                const price   = pkg.price ?? 0

                return (
                  <div className="card pkg-card" key={pkgId}>
                    <div className="card-img-placeholder">🌄</div>
                    <div className="card-body">
                      <h3>{pkgName}</h3>
                      <p className="location">📍 {dest}</p>
                      <p className="description">{desc?.substring(0, 80)}...</p>
                      <div className="pkg-meta">
                        <span>🗓 {days} Days</span>
                        <span>👥 Max {group}</span>
                      </div>
                      <div className="pkg-footer">
                        <span className="price">₹{price?.toLocaleString()}</span>
                        <button
                          className="btn-primary"
                          onClick={() => handleBookNow(pkg)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="section-cta">
            <button className="btn-primary" onClick={() => navigate('/packages')}>
              See All Packages →
            </button>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
