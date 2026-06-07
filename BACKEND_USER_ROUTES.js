// ========================
// ADD THIS TO: server/routes/usersRouts.js
// ========================

import express from 'express';
import userModel from '../models/userModel.js';
import userAuth from '../middelware/userAuth.js';

const userRoute = express.Router();

/**
 * GET /api/user/profile
 * Get authenticated user's profile
 * Required: Valid JWT token in cookies
 */
userRoute.get('/profile', userAuth, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isEmailVerified: user.isEmailVerified || false,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return res.json({
            success: false,
            message: 'Error fetching profile'
        });
    }
});

/**
 * GET /api/user/data
 * Alternative endpoint for user data (optional)
 * Required: Valid JWT token in cookies
 */
userRoute.get('/data', userAuth, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('User data fetch error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default userRoute;
