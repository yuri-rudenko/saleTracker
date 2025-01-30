import { Router } from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";

const router = new Router()

router.post("/register", [
    check('username', "Name can't be empty").notEmpty(),
    check('password', "Password can't be empty").notEmpty(),
], authController.register);
router.post("/login", authController.login);
router.get("/", authController.getAll);

export default router;