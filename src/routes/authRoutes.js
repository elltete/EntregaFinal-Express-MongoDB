import { Router } from "express";
import authController from '../controllers/authControllers.js'

const authRoutes = Router();

authRoutes.post("/register", authController.register)
authRoutes.post("/login", authController.login)

export { authRoutes } 