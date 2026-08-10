import "./About.css";

function About() {
  return (
    <section className="about-page">

      <div className="about-container">

        <div className="about-left">

          <span>ABOUT TRAVELVERSE</span>

          <h1>
            Making Every Journey
            <br />
            Memorable
          </h1>

          <p>
            TravelVerse is a modern travel booking platform designed to
            help travelers discover beautiful destinations, compare
            travel packages, and book trips with ease.
          </p>

          <p>
            Whether you are planning a family vacation, honeymoon,
            adventure tour, or weekend getaway, TravelVerse provides
            everything you need in one place.
          </p>

          <div className="about-stats">

            <div>
              <h2>100+</h2>
              <p>Destinations</p>
            </div>

            <div>
              <h2>5000+</h2>
              <p>Happy Travelers</p>
            </div>

            <div>
              <h2>24/7</h2>
              <p>Support</p>
            </div>

          </div>

        </div>

        <div className="about-right">

          <img
            src="/images/about.jpg"
            alt="Travel"
          />

        </div>

      </div>

    </section>
  );
}

export default About;