import NotFound from "../pages/NotFound";
import AdminDestinations from "../pages/AdminDestinations";
import AdminBookings from "../pages/AdminBookings";
import Admin from "../pages/Admin";
import MyBookings from "../pages/MyBookings";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Destinations from "../pages/Destinations";
import TripDetails from "../pages/TripDetails";
import Booking from "../pages/Booking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<TripDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-bookings" element={<AdminBookings />} />
          <Route path="/admin-destinations" element={<AdminDestinations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;