import { Router } from "express";
import {
  registerNodeController,
  heartbeatNodeController,
  getAvailableNodesController
} from "../controllers/node.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", authMiddleware, registerNodeController);

router.post("/heartbeat", heartbeatNodeController);

router.get("/available", getAvailableNodesController);

export default router;