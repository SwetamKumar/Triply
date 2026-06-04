import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>✈️ Triply</h3>
          <p>Explore the world with comfort and style. Your journey begins here.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/my-bookings">My Bookings</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📧 support@triply.in</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Patna, Bihar, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Triply. All rights reserved. | Industrial Training Project</p>
      </div>
    </footer>
  )
}

export default Footer
