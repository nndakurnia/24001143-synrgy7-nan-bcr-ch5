import { Router } from "express";
import authRouter from "./authRouter";
import adminRouter from "./adminRouter";
import customerRouter from "./customerRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/customer", customerRouter);

export default router;
