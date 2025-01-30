import { Router } from "express";
import saleController from "../controllers/saleController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router()

// Get all sales 
router.get("/", saleController.getAll);

// Get all sale products 
router.get("/products", saleController.getAllProduct);

// Get a single sale 
router.get("/:_id", saleController.get);

// Create a new sale
router.post("/", authMiddleware, saleController.create);

// Edit sale
router.put("/", authMiddleware, saleController.edit);

export default router;