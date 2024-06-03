import express from "express";
const router = express.Router()
const CarsRouter = require("./carsRouter");

router.use("/cars", CarsRouter);

module.exports = router;
