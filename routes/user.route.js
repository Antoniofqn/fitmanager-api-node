import express from "express";
import UserController from "../controllers/user.controller.js";
import { authenticateToken } from '../auth.js';

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/me", authenticateToken, UserController.getCurrentUser);
router.get("/:id", authenticateToken, UserController.getUser);
router.get("/", UserController.getUsers);
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.login)

export default router;
