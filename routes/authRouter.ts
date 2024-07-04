import { Router } from "express";
import { login } from "../services/authServices";

const authRouter = Router();

authRouter.post("/login", login);

export default authRouter;
