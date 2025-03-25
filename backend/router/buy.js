import { Router } from "express";
import buyController from "../controllers/buyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authGetMiddleware from "../middleware/authGetMiddleware.js";

const router = new Router()

// Get all buys 
router.get("/", authGetMiddleware, buyController.getAll);

// Get all buy products 
router.get("/products", authGetMiddleware, buyController.getAllProduct);

// Get a single buy 
router.get("/:_id", authGetMiddleware, authMiddleware, buyController.get);

// Create a new buy
router.post("/", authMiddleware, buyController.create);

export default router;