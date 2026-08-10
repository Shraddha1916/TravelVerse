import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    persons: "",
    travelDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/bookings",
        {
          trip: id,
          fullName: formData.fullName,
          phone: formData.phone,
          persons: formData.persons,
          travelDate: formData.travelDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Booking Successful 🎉");

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Booking Failed"
      );
    }
  };

  return (
    <section className="booking-page">
      <div className="booking-box">

        <span className="booking-tag">
          Reserve Your Trip
        </span>

        <h1>Book Your Destination</h1>

        <p>
          Fill in your details to confirm your travel booking.
        </p>

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