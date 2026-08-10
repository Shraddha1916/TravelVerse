import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDestinations() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await api.get("/trips");
    setTrips(res.data);
  };

  const deleteTrip = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this destination?"
    );

    if (!confirmDelete) return;

    await api.delete(`/trips/${id}`);

    alert("Destination Deleted");

    setTrips(trips.filter((trip) => trip._id !== id));
  };

  return (
    <section
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Manage Destinations
      </h1>

      {trips.map((trip) => (
        <div
          key={trip._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{trip.placeName}</h2>

          <p>📍 {trip.state}</p>

          <p>💰 ₹{trip.price}</p>

          <button
            onClick={() => deleteTrip(trip._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </section>
  );
}

export default AdminDestinations;