import "./Home.css";
import heroImage from "../assets/images/hero.jpg";
import { Link } from "react-router-dom";
import DestinationCards from "../components/Destinations";

function Home() {
  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${heroImage})`,
        }}
      >
        <div className="hero-content">

          <span className="hero-tag">
            ✈️ Discover Your Dream Destination
          </span>

          <h1>
            Explore The World <br />
            With TravelVerse
          </h1>

          <p>
            Discover breathtaking destinations, book your perfect trip,
            and create unforgettable memories with comfort and confidence.
          </p>

          <div className="hero-buttons">

            <Link to="/destinations">
              <button className="primary-btn">
                Explore Destinations
              </button>
            </Link>

            <Link to="/about">
              <button className="secondary-btn">
                Learn More
              </button>
            </Link>

          </div>

        </div>
      </section>

      <DestinationCards />

    </>
  );
}

export default Home;