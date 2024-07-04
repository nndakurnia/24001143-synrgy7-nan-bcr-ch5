import { Router } from "express";
import auth from "../middlewares/authMiddleware";
import customerRentServices from "../services/customer/rentServices";

const customerRouter = Router();

customerRouter.use(auth.authenticate);
customerRouter.use(auth.authorize(['customer']));

// routes rental for customer
customerRouter.get("/rent/", customerRentServices.getAllRent);
customerRouter.get("/rent/:id", customerRentServices.getRentById);
customerRouter.post("/rent/", customerRentServices.createRent);

export default customerRouter;
