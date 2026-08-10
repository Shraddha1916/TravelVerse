const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  addTrip,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

router.get("/", getAllTrips);
router.post("/", addTrip);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

module.exports = router;