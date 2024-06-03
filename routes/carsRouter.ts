import express from "express";
const router = express.Router()
const { getCars, addCar, updateCar, deleteCar } = require("../controllers/carController")

router.get("/", getCars);
router.post("/", addCar);
router.patch("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
