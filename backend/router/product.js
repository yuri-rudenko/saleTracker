import { Router } from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = new Router()

// Get all products 
router.get("/", productController.getAll);

// Get a single product 
router.get("/:_id", productController.get);

// Create a new product
router.post("/", authMiddleware, productController.create);

// Update an existing product
router.put("/edit", authMiddleware, productController.edit);

// Edit views
router.put("/editViews", authMiddleware, productController.editViews);

// Delete a product by ID
router.delete("/:_id", authMiddleware, productController.delete);

export default router;