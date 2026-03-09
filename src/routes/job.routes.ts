import { Router } from "express";
import { submitJobController } from "../controllers/job.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/submit", authMiddleware, submitJobController);

export default router;