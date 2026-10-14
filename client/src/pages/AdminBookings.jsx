import { useEffect, useState } from "react";
import api from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api
      .get("/bookings")
      .then((res) => {
        if (isMounted) {
          setBookings(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="destinations-page">
        <h2>Loading Bookings...</h2>
      </section>
    );
  }

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