import { Router } from "express";
import actionController from "../controllers/actionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.put("/", authMiddleware, actionController.undo);

export default router;