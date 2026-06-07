import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // userId is set by userAuth middleware
        const userId = req.userId;

        if (!userId) {
            return res.json({ success: false, message: 'User ID not found' });
        }

        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            message: 'User data fetched successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified || false,
                isEmailVerified: user.isAccountVerified || false,
                createdAt: user.createdAt
            },
            data: user // Keep for backward compatibility
        });
    } catch (error) {
        console.error('Get user data error:', error);
        return res.json({ success: false, message: 'Error in getting user data' });
    }
}