import express from "express";
const router = express.Router()
const {
    getCars,
    getCarById,
    addCar,
    updateCar,
    deleteCar
} = require("../controllers/carController")
const cdnUpload = require("../middlewares/cdnUploadHandler");

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", cdnUpload.single("image"), addCar);
router.patch("/:id", cdnUpload.single("image"), updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
