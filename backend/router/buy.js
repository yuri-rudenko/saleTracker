import { Router } from "express";
import buyController from "../controllers/buyController.js";

const router = new Router()

// Get all buys 
router.get("/", buyController.getAll);

// Get all buy products 
router.get("/products", buyController.getAllProduct);

// Get a single buy 
router.get("/:_id", buyController.get);

// Create a new buy
router.post("/", buyController.create);

export default router;