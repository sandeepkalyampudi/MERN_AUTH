import express from 'express';
import userAuth from '../middelware/userAuth.js';
import { getUserData } from '../controllers/userController.js';

const userRoute = express.Router();

// Get user profile data
userRoute.get("/data", userAuth, getUserData);

// Alias for profile endpoint
userRoute.get("/profile", userAuth, getUserData);

export default userRoute;