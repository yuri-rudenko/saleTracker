import { Router } from "express";
import productController from "../controllers/productController.js";


const router = new Router()

// Get all products 
router.get("/", productController.getAll);

// Get a single product 
router.get("/:_id", productController.get);

// Create a new product
router.post("/", productController.create);

// Update an existing product
router.put("/", productController.edit);

// Delete a product by ID
router.delete("/:_id", productController.delete);

export default router;