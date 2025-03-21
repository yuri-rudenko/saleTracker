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
router.post("/", saleController.create);

// Edit sale
router.put("/", saleController.edit);

// Approve sale
router.put('/approveSale/:_id', saleController.approveSale);

// Delete sale 
router.delete("/:_id", saleController.delete);


export default router;