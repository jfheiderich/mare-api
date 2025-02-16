import { Router } from "express";
import userRoutes from "./user.routes";
import candidateRoutes from "./candidates.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/candidates", candidateRoutes);

export default router;
