import "./TripDetails.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="trip-page">

      <div className="trip-container">

        <div className="trip-image-box">
          <img
            src={`/images/${trip.image}`}
            alt={trip.placeName}
            className="trip-image"
          />
        </div>

        <div className="trip-content">

          <span className="trip-tag">
            Best Travel Destination
          </span>

          <h1>{trip.placeName}</h1>

          <h3>📍 {trip.state}</h3>

          <p className="trip-description">
            {trip.description}
          </p>

          <div className="trip-info">

            <div className="info-card">
              <h4>Price</h4>
              <p>₹{trip.price}</p>
            </div>

            <div className="info-card">
              <h4>Duration</h4>
              <p>{trip.days} Days</p>
            </div>

          </div>

          <div className="trip-buttons">

            <Link to={`/booking/${trip._id}`}>
              <button className="book-btn">
                Book Now
              </button>
            </Link>

            <Link to="/destinations">
              <button className="back-btn">
                Back
              </button>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default TripDetails;