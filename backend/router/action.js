import { Router } from "express";
import actionController from "../controllers/actionController.js";

const router = new Router();

router.put("/", actionController.undo);

export default router;