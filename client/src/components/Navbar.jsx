import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="logo">
        <h2>TravelVerse</h2>
      </div>

      <ul className="nav-links">

        <li><NavLink to="/">Home</NavLink></li>

        <li><NavLink to="/about">About</NavLink></li>

        <li><NavLink to="/destinations">Destinations</NavLink></li>

        <li><NavLink to="/contact">Contact</NavLink></li>

        {user ? (
          <>
            <li><NavLink to="/my-bookings">Bookings</NavLink></li>

            {user.role === "admin" && (
  <li>
    <NavLink to="/admin">Admin</NavLink>
  </li>
)}

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>

            <li>
              <NavLink className="register-btn" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}

      </ul>

    </header>
  );
}

export default Navbar;