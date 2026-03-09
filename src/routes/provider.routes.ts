import { Router } from "express";
import {
  createProvider,
  getMyProvider
} from "../controllers/provider.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", authMiddleware, createProvider);
router.get("/me", authMiddleware, getMyProvider);

export default router;