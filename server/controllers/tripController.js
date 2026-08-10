const Trip = require("../models/Trip");

// Get All Trips
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Add New Trip
const addTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);

    res.status(201).json({
      message: "Trip Added Successfully",
      trip,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: "Server Error",
    error: error.message,
  });
}
};
// Get Single Trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip Not Found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Update Trip
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({
        message: "Trip Not Found",
      });
    }

    res.status(200).json({
      message: "Trip Updated Successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip Not Found",
      });
    }

    await trip.deleteOne();

    res.status(200).json({
      message: "Trip Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getAllTrips,
  addTrip,
  getTripById,
  updateTrip,
  deleteTrip,
};