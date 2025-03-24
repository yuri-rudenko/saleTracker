import { Router } from "express";
import buyController from "../controllers/buyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router()

// Get all buys 
router.get("/", buyController.getAll);

// Get all buy products 
router.get("/products", buyController.getAllProduct);

// Get a single buy 
router.get("/:_id", authMiddleware, buyController.get);

// Create a new buy
router.post("/", authMiddleware, buyController.create);

export default router;