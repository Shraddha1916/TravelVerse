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

    if (!trip || !fullName || !phone || !persons || !travelDate) {
      return res.status(400).json({
        message: "Please fill in all booking details",
      });
    }

    const personCount = Number(persons);
    if (isNaN(personCount) || personCount < 1) {
      return res.status(400).json({
        message: "Number of persons must be at least 1",
      });
    }

    const selectedTrip = await Trip.findById(trip);

    if (!selectedTrip) {
      return res.status(404).json({
        message: "Trip Not Found",
      });
    }

    const totalPrice = selectedTrip.price * personCount;

    const booking = await Booking.create({
      user: req.user.id,
      trip: trip,
      fullName: fullName.trim(),
      phone: phone.trim(),
      persons: personCount,
      travelDate: travelDate,
      totalPrice: totalPrice,
    });

    res.status(201).json({
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error.message);

    res.status(500).json({
      message: "Server Error while processing booking",
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