import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    persons: 1,
    travelDate: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to book a trip");
      navigate("/login");
      return;
    }

    let isMounted = true;
    api
      .get(`/trips/${id}`)
      .then((res) => {
        if (isMounted) {
          setTrip(res.data);
          setLoadingTrip(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load trip:", err);
        if (isMounted) setLoadingTrip(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculatedTotal = trip?.price
    ? trip.price * (Math.max(1, Number(formData.persons) || 1))
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.persons) < 1) {
      alert("Number of members must be at least 1");
      return;
    }

    try {
      await api.post("/bookings", {
        trip: id,
        fullName: formData.fullName,
        phone: formData.phone,
        persons: Number(formData.persons),
        travelDate: formData.travelDate,
      });

      alert("Booking Successful 🎉");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  if (loadingTrip) {
    return (
      <section className="booking-page">
        <div className="booking-box" style={{ textAlign: "center" }}>
          <h2>Loading Trip Details...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-page">
      <div className="booking-box">

        <span className="booking-tag">
          Reserve Your Trip
        </span>

        <h1>Book Your Destination {trip ? `- ${trip.placeName}` : ""}</h1>

        <p>
          Fill in your details to confirm your travel booking.
        </p>

        {trip && (
          <div style={{ background: "#f1f5f9", padding: "12px 18px", borderRadius: "10px", margin: "15px 0", textAlign: "left" }}>
            <p style={{ margin: "4px 0", color: "#334155" }}><strong>📍 Destination:</strong> {trip.placeName}, {trip.state}</p>
            <p style={{ margin: "4px 0", color: "#334155" }}><strong>💵 Price per Person:</strong> ₹{trip.price}</p>
            <p style={{ margin: "4px 0", color: "#16a34a", fontSize: "1.1rem", fontWeight: "bold" }}>
              <strong>💰 Estimated Budget:</strong> ₹{calculatedTotal} ({formData.persons || 1} {Number(formData.persons) === 1 ? "Person" : "Persons"})
            </p>
          </div>
        )}

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="persons"
            placeholder="Number of Members"
            min="1"
            value={formData.persons}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Confirm Booking
          </button>

        </form>

      </div>
    </section>
  );
}

export default Booking;