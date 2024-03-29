import express from "express";
import userController from "../controllers/user-controller.js";

export const publicRouter = new express.Router();

publicRouter.post("/api/users/register", userController.register);
publicRouter.post("/api/users/login", userController.login);
