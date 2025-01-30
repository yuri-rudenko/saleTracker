import { Router } from "express";
import typeController from "../controllers/typeController.js";

const router = new Router()

// Get all types 
router.get("/", typeController.getAll);

// Get a single type 
router.get("/:_id", typeController.get);

// Create a new type
router.post("/", typeController.create);

// Update an existing type
router.put("/", typeController.edit);

// Delete a type by ID
router.delete("/:_id", typeController.delete);

export default router;