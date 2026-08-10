import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>✈ TravelVerse</h2>
          <p>
            Discover beautiful destinations and make your travel
            journey memorable with TravelVerse.
          </p>
        </div>

        <div className="footer-section">
  <h3>Quick Links</h3>

  <p><a href="/">Home</a></p>
  <p><a href="/about">About</a></p>
  <p><a href="/destinations">Destinations</a></p>
  <p><a href="/contact">Contact</a></p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Lucknow, Uttar Pradesh</p>
          <p>📧 travelverse@gmail.com</p>
          <p>📞 +91 9876543210</p>
        </div>

        <div className="footer-section">
  <h3>Connect With Us</h3>

  <p><a href="#">🌐 Facebook</a></p>
  <p><a href="#">📸 Instagram</a></p>
  <p><a href="#">🐦 Twitter</a></p>
  <p><a href="#">💼 LinkedIn</a></p>
</div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 TravelVerse | All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;