import { useEffect, useState } from "react";
import api from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  return (
    <section className="destinations-page">
      <h1>All Bookings</h1>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{booking.trip?.placeName}</h2>

          <p>👤 {booking.user?.name}</p>

          <p>📧 {booking.user?.email}</p>

          <p>👥 {booking.persons} Persons</p>

          <p>💰 ₹{booking.totalPrice}</p>
        </div>
      ))}
    </section>
  );
}

export default AdminBookings;