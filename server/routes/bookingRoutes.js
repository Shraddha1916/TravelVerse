const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getAllBookings,
  deleteBooking,
  getMyBookings,
} = require("../controllers/bookingController");

router.post("/", protect, createBooking);

router.get("/", getAllBookings);

router.delete("/:id", deleteBooking);

router.get("/user/:userId", getMyBookings);

module.exports = router;