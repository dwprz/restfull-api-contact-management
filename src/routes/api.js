import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import userController from "../controllers/user-controller.js";
import { contactController } from "../controllers/contact-controller.js";

export const router = new express.Router();
router.use(authMiddleware);

// User API
router.get("/api/users/current", userController.get);
router.patch("/api/users/current", userController.update);
router.delete("/api/users/logout", userController.logout);

// Contact API
router.post("/api/contacts", contactController.create);
router.get("/api/contacts", contactController.search);
router.get("/api/contacts/:contactId", contactController.get);
router.put("/api/contacts/:contactId", contactController.update);
router.delete("/api/contacts/:contactId", contactController.remove);
