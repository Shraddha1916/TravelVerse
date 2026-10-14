import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const [trip, setTrip] = useState({
    placeName: "",
    state: "",
    price: "",
    days: "",
    image: "",
    description: "",
  });

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactCount, setContactCount] = useState(0);

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get("/contacts");
      const list = Array.isArray(response.data) ? response.data : [];
      setContacts(list);
      setContactCount(list.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrips = async () => {
    try {
      const response = await api.get("/trips");
      setDestinations(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/trips/${editId}`, trip);
        alert("Destination Updated Successfully");
      } else {
        await api.post("/trips", trip);
        alert("Destination Added Successfully");
      }

      setTrip({
        placeName: "",
        state: "",
        price: "",
        days: "",
        image: "",
        description: "",
      });

      setEditId(null);
      fetchTrips();

    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  const handleEdit = (destination) => {
    setEditId(destination._id);

    setTrip({
      placeName: destination.placeName,
      state: destination.state,
      price: destination.price,
      days: destination.days,
      image: destination.image,
      description: destination.description,
    });

    setActiveMenu("destinations");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/trips/${id}`);

      alert("Destination Deleted Successfully");

      fetchTrips();

    } catch (error) {
      alert("Delete Failed");
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setEditId(null);

    setTrip({
      placeName: "",
      state: "",
      price: "",
      days: "",
      image: "",
      description: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        alert("Access denied. Admin rights required.");
        navigate("/");
        return;
      }
    } catch {
      navigate("/login");
      return;
    }

    const loadAdminData = async () => {
      try {
        await Promise.allSettled([
          fetchBookings(),
          fetchUsers(),
          fetchTrips(),
          fetchContacts(),
        ]);
      } catch (err) {
        console.error("Admin data load error:", err);
      }
    };

    loadAdminData();
  }, [navigate]);

  return (
    <div className="admin-layout">

      {/* Sidebar */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>TravelVerse</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-menu">

          <button
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            🏠 Dashboard
          </button>

          <button
            className={activeMenu === "destinations" ? "active" : ""}
            onClick={() => setActiveMenu("destinations")}
          >
            🌍 Destinations
          </button>

          <button
            className={activeMenu === "bookings" ? "active" : ""}
            onClick={() => setActiveMenu("bookings")}
          >
            📋 Bookings
          </button>

          <button
            className={activeMenu === "users" ? "active" : ""}
            onClick={() => setActiveMenu("users")}
          >
            👥 Users
          </button>

          <button
            className={activeMenu === "contacts" ? "active" : ""}
            onClick={() => setActiveMenu("contacts")}
          >
            ✉️ Messages
          </button>

        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          🚪 Logout
        </button>

      </aside>

      {/* Main Content */}

      <main className="admin-main">

        {/* Dashboard */}

        {activeMenu === "dashboard" && (
          <div>

            <div className="admin-page-header">
              <span>Overview</span>

              <h1>Dashboard</h1>

              <p>
                Welcome to your TravelVerse admin dashboard.
              </p>
            </div>

            <div className="admin-stats">

              <div className="stat-card">
                <span>🌍</span>

                <h3>Destinations</h3>

                <strong>
                  {destinations.length}
                </strong>
              </div>

              <div className="stat-card">
                <span>📋</span>

                <h3>Bookings</h3>

                <strong>
                  {bookings.length}
                </strong>
              </div>

              <div className="stat-card">
                <span>👥</span>

                <h3>Users</h3>

                <strong>
                  {users.length}
                </strong>
              </div>
               <div className="stat-card">
                 <span>✉️</span>

                    <h3>Messages</h3>

                        <strong>
                           {contactCount}
                         </strong>
                     </div>

            </div>

          </div>
        )}

        {/* Destinations */}

        {activeMenu === "destinations" && (
          <div>

            <div className="admin-page-header">

              <span>Management</span>

              <h1>
                {editId
                  ? "Edit Destination"
                  : "Manage Destinations"}
              </h1>

              <p>
                Add and manage TravelVerse destinations.
              </p>

            </div>

            {/* Destination Form */}

            <div className="admin-form-card">

              <form
                className="admin-form"
                onSubmit={handleSubmit}
              >

                <input
                  type="text"
                  name="placeName"
                  placeholder="Place Name"
                  value={trip.placeName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State / Country"
                  value={trip.state}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={trip.price}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="days"
                  placeholder="Number of Days"
                  value={trip.days}
                  onChange={handleChange}
                  required
                />

                <select
                  name="image"
                  value={trip.image}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Destination Image
                  </option>

                  <option value="manali.jpg">
                    Manali
                  </option>

                  <option value="goa.jpg">
                    Goa
                  </option>

                  <option value="ooty.jpg">
                    Ooty
                  </option>

                  <option value="jaipur.jpg">
                    Jaipur
                  </option>

                  <option value="kashmir.jpg">
                    Kashmir
                  </option>

                  <option value="bali.jpg">
                    Bali
                  </option>

                  <option value="dubai.jpg">
                    Dubai
                  </option>

                  <option value="paris.jpg">
                    Paris
                  </option>
                   <option value="shimla.jpg">
                    Shimla
                    </option>

                </select>

                <textarea
                  name="description"
                  placeholder="Destination Description"
                  rows="5"
                  value={trip.description}
                  onChange={handleChange}
                  required
                />

                <button type="submit">
                  {editId
                    ? "Update Destination"
                    : "Add Destination"}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                  >
                    Cancel Edit
                  </button>
                )}

              </form>

            </div>

            {/* Destination List */}

            <div className="booking-table-box">

              <h2>All Destinations</h2>

              {destinations.length === 0 ? (

                <p className="no-bookings">
                  No destinations found.
                </p>

              ) : (

                <div className="booking-table-wrapper">

                  <table className="booking-table">

                    <thead>

                      <tr>
                        <th>Place</th>
                        <th>State</th>
                        <th>Price</th>
                        <th>Days</th>
                        <th>Actions</th>
                      </tr>

                    </thead>

                    <tbody>

                      {destinations.map((destination) => (

                        <tr key={destination._id}>

                          <td>
                            {destination.placeName}
                          </td>

                          <td>
                            {destination.state}
                          </td>

                          <td>
                            ₹{destination.price}
                          </td>

                          <td>
                            {destination.days}
                          </td>

                          <td>

                            <button
                              onClick={() =>
                                handleEdit(destination)
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  destination._id
                                )
                              }
                            >
                              🗑️ Delete
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>
        )}

        {/* Bookings */}

        {activeMenu === "bookings" && (
          <div>

            <div className="admin-page-header">

              <span>TravelVerse</span>

              <h1>Customer Bookings</h1>

              <p>
                View all bookings made by customers.
              </p>

            </div>

            <div className="booking-table-box">

              {bookings.length === 0 ? (

                <p className="no-bookings">
                  No bookings found.
                </p>

              ) : (

                <div className="booking-table-wrapper">

                  <table className="booking-table">

                    <thead>

                      <tr>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Destination</th>
                        <th>Members</th>
                        <th>Travel Date</th>
                        <th>Total Price</th>
                      </tr>

                    </thead>

                    <tbody>

                      {bookings.map((booking) => (

                        <tr key={booking._id}>

                          <td>
                            {booking.fullName}
                          </td>

                          <td>
                            {booking.phone}
                          </td>

                          <td>
                            {booking.trip?.placeName || "N/A"}
                          </td>

                          <td>
                            {booking.persons}
                          </td>

                          <td>
                            {new Date(
                              booking.travelDate
                            ).toLocaleDateString()}
                          </td>

                          <td>
                            ₹{booking.totalPrice}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>
        )}

        {/* Users */}

        {activeMenu === "users" && (
          <div>

            <div className="admin-page-header">

              <span>Management</span>

              <h1>Registered Users</h1>

              <p>
                View all registered TravelVerse users.
              </p>

            </div>

            <div className="booking-table-box">

              {users.length === 0 ? (

                <p className="no-bookings">
                  No users found.
                </p>

              ) : (

                <div className="booking-table-wrapper">

                  <table className="booking-table">

                    <thead>

                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registered On</th>
                      </tr>

                    </thead>

                    <tbody>

                      {users.map((user) => (

                        <tr key={user._id}>

                          <td>
                            {user.name}
                          </td>

                          <td>
                            {user.email}
                          </td>

                          <td>
                            {user.createdAt
                              ? new Date(
                                  user.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>
        )}

        {/* Contact Messages */}

        {activeMenu === "contacts" && (
          <div>

            <div className="admin-page-header">
              <span>Messages</span>

              <h1>Contact Messages</h1>

              <p>
                View messages sent by TravelVerse users.
              </p>
            </div>

            <div className="booking-table-box">

              {contacts.length === 0 ? (

                <p className="no-bookings">
                  No messages found.
                </p>

              ) : (

                <div className="booking-table-wrapper">

                  <table className="booking-table">

                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact._id}>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.subject}</td>
                          <td>{contact.message}</td>
                          <td>
                            {contact.createdAt
                              ? new Date(
                                  contact.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>
        )}

      </main>

    </div>
  );
}

export default Admin;