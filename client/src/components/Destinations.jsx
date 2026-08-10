import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./Destinations.css";

function Destinations({ showTitle = true }) {
  const [destinations, setDestinations] = useState([]);

  const getImage = (placeName) => {
    switch (placeName.toLowerCase()) {
      case "manali":
        return "/images/manali.jpg";
      case "goa":
        return "/images/goa.jpg";
      case "ooty":
        return "/images/ooty.jpg";
      case "jaipur":
        return "/images/jaipur.jpg";
      case "kashmir":
        return "/images/kashmir.jpg";
      case "bali":
        return "/images/bali.jpg";
      case "dubai":
        return "/images/dubai.jpg";
      case "paris":
        return "/images/paris.jpg";
      default:
        return "/images/manali.jpg";
    }
  };

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await api.get("/trips");
      setDestinations(res.data);
    };

    fetchTrips();
  }, []);

  return (
    <section className="destinations">

      {showTitle && (
        <>
          <h2>Popular Destinations</h2>

          <p className="destination-text">
            Choose your next destination and make unforgettable memories.
          </p>
        </>
      )}

      <div className="destination-container">

        {destinations.map((trip) => (

          <div className="destination-card" key={trip._id}>

            <div className="image-box">

              <img
                src={getImage(trip.placeName)}
                alt={trip.placeName}
              />

              <span className="price-tag">
                ₹{trip.price}
              </span>

            </div>

            <div className="card-content">

              <h3>{trip.placeName}</h3>

              <p className="location">
                📍 {trip.state}
              </p>

              <p className="description">
                {trip.description.substring(0,90)}...
              </p>

              <div className="bottom-row">

                <span>🗓 {trip.days} Days</span>

                <span>⭐ 4.8</span>

              </div>

              <Link to={`/destinations/${trip._id}`}>
                <button>
                  View Details
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Destinations;