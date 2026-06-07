import express from 'express';
import { register, login, logout, sendVeriOtp, verifyEmail, sendResetOtp, resetPassword } from '../controllers/authcontroller.js';
import userAuth from '../middelware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-veri-otp', userAuth, sendVeriOtp);
authRouter.post('/verify-email', userAuth, verifyEmail);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);
export default authRouter;