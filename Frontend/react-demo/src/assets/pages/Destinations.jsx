import { useEffect, useState } from 'react'
import { getAllDestinations, getDestinationsByCategory, searchDestinations } from '../services/api'
import './Destinations.css'

const CATEGORIES = ['All', 'Beach', 'Hill Station', 'Heritage', 'Adventure', 'Wildlife', 'Pilgrimage']

function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery]   = useState('')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = () => {
    setLoading(true)
    setError('')
    getAllDestinations()
      .then(res => {
        console.log('RAW destinations response:', res.data)
        setDestinations(res.data)
      })
      .catch(err => {
        console.error('Error fetching destinations:', err)
        setError('Could not load destinations. Make sure backend is running on port 8080.')
      })
      .finally(() => setLoading(false))
  }

  const handleCategoryFilter = (cat) => {
    setActiveCategory(cat)
    setLoading(true)
    setError('')
    if (cat === 'All') {
      getAllDestinations()
        .then(res => setDestinations(res.data))
        .catch(() => setError('Failed to load destinations.'))
        .finally(() => setLoading(false))
    } else {
      getDestinationsByCategory(cat)
        .then(res => setDestinations(res.data))
        .catch(() => setError('Failed to filter destinations.'))
        .finally(() => setLoading(false))
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) { fetchAll(); return }
    setLoading(true)
    setError('')
    searchDestinations(searchQuery)
      .then(res => setDestinations(res.data))
      .catch(() => setError('Search failed.'))
      .finally(() => setLoading(false))
  }

  return (
    <main className="page-main">
      <div className="page-header">
        <h1>Explore Destinations</h1>
        <p>Discover amazing places across India and the world</p>
      </div>

      <div className="container">
        {/* Search */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn-primary">Search</button>
        </form>

        {/* Category Filter */}
        <div className="category-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={'filter-btn' + (activeCategory === cat ? ' active' : '')}
              onClick={() => handleCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && <p className="loading">Loading destinations...</p>}

        {/* Error */}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#e53935' }}>
            <p style={{ fontSize: '1.1rem' }}>⚠️ {error}</p>
            <button className="btn-primary" style={{ marginTop: '16px' }} onClick={fetchAll}>
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && destinations.length === 0 && (
          <p className="loading">No destinations found. Try a different search or add data via SQL.</p>
        )}

        {/* Results */}
        {!loading && !error && destinations.length > 0 && (
          <div className="dest-grid">
            {destinations.map((dest, index) => {
              const id              = dest.id
              const name            = dest.name            || 'Unknown'
              const location        = dest.location        || ''
              const description     = dest.description     || ''
              const category        = dest.category        || ''
              const rating          = dest.rating          || null
              const bestTime        = dest.bestTimeToVisit || dest.best_time_to_visit || ''

              return (
                <div className="card dest-card" key={id ?? index}>
                  <div className="card-img-placeholder">🏔️</div>
                  <div className="card-body">
                    <span className="category-badge">{category}</span>
                    <h3>{name}</h3>
                    <p className="location">📍 {location}</p>
                    <p className="description">{description}</p>
                    {rating && <p className="rating">⭐ {rating}/5</p>}
                    {bestTime && <p className="best-time">🗓 Best Time: {bestTime}</p>}
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

export default Destinations
