import { Router } from "express";
import userController from '../controllers/userControllers.js'

const userRoutes = Router();

userRoutes.post("/register", userController.register)
userRoutes.post("/login", userController.login)

export { userRoutes } 