const Booking = require("../models/Booking");
const Trip = require("../models/Trip");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      trip,
      fullName,
      phone,
      persons,
      travelDate,
    } = req.body;

    const selectedTrip = await Trip.findById(trip);

    if (!selectedTrip) {
      return res.status(404).json({
        message: "Trip Not Found",
      });
    }

    const totalPrice = selectedTrip.price * Number(persons);

    const booking = await Booking.create({
      user: req.user.id,
      trip: trip,
      fullName: fullName,
      phone: phone,
      persons: Number(persons),
      travelDate: travelDate,
      totalPrice: totalPrice,
    });

    res.status(201).json({
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    console.log("BOOKING ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("trip", "placeName state price");

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking Cancelled Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.params.userId,
    })
      .populate("trip", "placeName state price days image")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  getMyBookings,
};