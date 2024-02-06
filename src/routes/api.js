import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import userController from "../controllers/user-controller.js";

export const router = new express.Router();
router.use(authMiddleware);

// User API
router.get("/api/users/current", userController.get);
router.patch("/api/users/current", userController.update);
router.delete("/api/users/logout", userController.logout);
