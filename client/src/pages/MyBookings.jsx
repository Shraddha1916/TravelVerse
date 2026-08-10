import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await api.get(`/bookings/user/${user._id}`);

    setBookings(response.data);
  };

  const cancelBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    await api.delete(`/bookings/${id}`);

    alert("Booking Cancelled Successfully");

    setBookings(bookings.filter((booking) => booking._id !== id));
  };

  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
          marginBottom: "40px",
        }}
      >
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Bookings Found</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,.1)",
              }}
            >
              <h2 style={{ color: "#2563eb" }}>
                {booking.trip?.placeName || "Trip Deleted"}
              </h2>

              <p>📍 {booking.trip?.state}</p>

              <p>💰 ₹{booking.totalPrice}</p>

              <p>👥 {booking.persons} Persons</p>

              <p>📅 {new Date(booking.travelDate).toLocaleDateString()}</p>

              <button
                onClick={() => cancelBooking(booking._id)}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBookings;