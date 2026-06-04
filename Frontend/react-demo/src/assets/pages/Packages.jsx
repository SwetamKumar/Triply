import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPackages, searchPackagesByDestination, filterPackagesByPrice } from '../services/api'
import './Packages.css'

function Packages() {
  const [packages, setPackages]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [searchDest, setSearchDest] = useState('')
  const [maxPrice, setMaxPrice]   = useState('')
  const navigate = useNavigate()

  useEffect(() => { fetchAll() }, [])

  const fetchAll = () => {
    setLoading(true)
    setError('')
    getAllPackages()
      .then(res => {
        console.log('RAW packages response:', res.data)
        setPackages(res.data)
      })
      .catch(err => {
        console.error('Error fetching packages:', err)
        setError('Could not load packages. Make sure the backend is running on port 8080.')
      })
      .finally(() => setLoading(false))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchDest.trim()) { fetchAll(); return }
    setLoading(true)
    searchPackagesByDestination(searchDest)
      .then(res => setPackages(res.data))
      .catch(() => setError('Search failed.'))
      .finally(() => setLoading(false))
  }

  const handlePriceFilter = (e) => {
    e.preventDefault()
    if (!maxPrice) { fetchAll(); return }
    setLoading(true)
    filterPackagesByPrice(maxPrice)
      .then(res => setPackages(res.data))
      .catch(() => setError('Filter failed.'))
      .finally(() => setLoading(false))
  }

  const handleBookNow = (pkg) => {
    // Log the full object so we can see exactly what fields exist
    console.log('Clicked Book Now. Package object:', pkg)
    console.log('Package keys:', Object.keys(pkg))

    const id = pkg.id
    if (id === undefined || id === null) {
      console.error('id is missing! Full object:', JSON.stringify(pkg))
      alert('Package ID is missing. Check F12 Console for details.')
      return
    }
    navigate('/book/' + id)
  }

  return (
    <main className="page-main">
      <div className="page-header">
        <h1>Tour Packages</h1>
        <p>Handcrafted travel experiences for every type of explorer</p>
      </div>

      <div className="container">
        <div className="pkg-filters">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by destination..."
              value={searchDest}
              onChange={e => setSearchDest(e.target.value)}
            />
            <button type="submit" className="btn-primary">Search</button>
          </form>

          <form className="price-filter" onSubmit={handlePriceFilter}>
            <input
              type="number"
              placeholder="Max price (Rs.)..."
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
            <button type="submit" className="btn-accent">Filter</button>
            <button type="button" className="btn-reset" onClick={fetchAll}>Reset</button>
          </form>
        </div>

        {loading && <p className="loading">Loading packages...</p>}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#e53935' }}>
            <p style={{ fontSize: '1.1rem' }}>⚠️ {error}</p>
            <button className="btn-primary" style={{ marginTop: '16px' }} onClick={fetchAll}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && packages.length === 0 && (
          <p className="loading">No packages found. Add some from the database first.</p>
        )}

        {!loading && !error && packages.length > 0 && (
          <div className="pkg-grid">
            {packages.map((pkg, index) => {
              // Lombok + Spring Boot always sends camelCase — use directly
              const pkgId   = pkg.id
              const pkgName = pkg.packageName   || 'Unnamed Package'
              const dest    = pkg.destination   || ''
              const desc    = pkg.description   || ''
              const days    = pkg.durationDays  || ''
              const group   = pkg.maxGroupSize  || ''
              const diff    = pkg.difficulty    || ''
              const incl    = pkg.inclusions    || ''
              const price   = pkg.price         || 0

              return (
                <div className="card pkg-card-full" key={pkgId ?? index}>
                  <div className="card-img-placeholder large">🌄</div>
                  <div className="card-body">
                    <h3>{pkgName}</h3>
                    <p className="location">📍 {dest}</p>
                    <p className="description">{desc}</p>
                    <div className="pkg-details-grid">
                      <span>🗓 {days} Days</span>
                      <span>👥 Max {group} people</span>
                      <span>🎯 {diff}</span>
                      {incl && <span>✅ {incl}</span>}
                    </div>
                    <div className="pkg-footer">
                      <div>
                        <span className="price-label">Starting from</span>
                        <span className="price">Rs. {Number(price).toLocaleString()}</span>
                      </div>
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
      </div>
    </main>
  )
}

export default Packages
