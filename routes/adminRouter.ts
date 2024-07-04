import { Router } from "express";
import carServices from "../services/admin/carServices";
import adminRentServices from "../services/admin/rentServices";
import auth from "../middlewares/authMiddleware";
import cdnUpload from "../middlewares/cdnUploadHandler";

const adminRouter = Router();

adminRouter.use(auth.authenticate);
adminRouter.use(auth.authorize(['admin']));

// routes for car services
adminRouter.get("/car/", carServices.getCars);
adminRouter.get("/car/:id", carServices.getCarById);
adminRouter.post("/car/", cdnUpload.single("image"), carServices.addCar);
adminRouter.patch("/car/:id", cdnUpload.single("image"), carServices.updateCar);
adminRouter.delete("/car/:id", cdnUpload.single("image"), carServices.deleteCar);

// routes for rent services
adminRouter.get("/rent/", adminRentServices.getAllRent);
adminRouter.get("/rent/:id", adminRentServices.getRentById);
adminRouter.patch("/rent/status/:id", adminRentServices.updateRentalStatus);
adminRouter.patch("/rent/payment/:id", adminRentServices.updatePaymentStatus);

export default adminRouter;
