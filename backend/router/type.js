import { Router } from "express";
import typeController from "../controllers/typeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router()

// Get all types 
router.get("/", typeController.getAll);

// Get a single type 
router.get("/:_id", typeController.get);

// Create a new type
router.post("/", authMiddleware, typeController.create);

// Update an existing type
router.put("/", authMiddleware, typeController.edit);
 
// Delete a type by ID
router.delete("/:_id", authMiddleware, typeController.delete);

export default router;