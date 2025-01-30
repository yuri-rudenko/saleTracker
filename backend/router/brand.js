import { Router } from "express";
import brandController from "../controllers/brandController.js";

const router = new Router()

// Get all brands 
router.get("/", brandController.getAll);

// Get a single brand 
router.get("/:_id", brandController.get);

// Create a new brand
router.post("/", brandController.create);

// Update an existing brand
router.put("/", brandController.edit);

// Delete a brand by ID
router.delete("/:_id", brandController.delete);

export default router;