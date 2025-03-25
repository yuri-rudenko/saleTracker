import { Router } from "express";
import saleController from "../controllers/saleController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authGetMiddleware from "../middleware/authGetMiddleware.js";

const router = new Router()

// Get all sales 
router.get("/", authGetMiddleware, saleController.getAll);

// Get all sale products 
router.get("/products", authGetMiddleware, saleController.getAllProduct);

// Get a single sale 
router.get("/:_id", authGetMiddleware, saleController.get);

// Create a new sale
router.post("/", authMiddleware, saleController.create);

// Edit sale
router.put("/", authMiddleware, saleController.edit);

// Approve sale
router.put('/approveSale/:_id', authMiddleware, saleController.approveSale);

// Delete sale 
router.delete("/:_id", authMiddleware, saleController.delete);


export default router;