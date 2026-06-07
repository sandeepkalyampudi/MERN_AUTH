import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Please fill all the fields' });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
        //Send welcome email to user
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to MERN Auth',
            text: `Hi ${name},\n\nWelcome to MERN Auth! We're glad to have you on board.\n\nBest regards,\nMERN Auth Team`
        };
        try {
            console.log('Sending welcome email to:', email);
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Email sending error:', emailError.message);
            // Don't block registration if email fails
        }
        return res.json({ success: true, message: 'User registered successfully', user: { name: user.name, email: user.email, isAccountVerified: user.isAccountVerified, isEmailVerified: user.isAccountVerified } });
    } catch (error) {
        console.error('Register error at:', error.stack || error.message || error);
        return res.json({ success: false, message: 'Error in registering user' });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Please fill all the fields' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.json({ success: true, message: 'User logged in successfully', user: { name: user.name, email: user.email, isAccountVerified: user.isAccountVerified, isEmailVerified: user.isAccountVerified } });
    } catch (error) {
        console.error('Login error:', error.message || error);
        return res.json({ success: false, message: 'Error in logging in user' });
    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' });
        return res.json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error.message || error);
        return res.json({ success: false, message: 'Error in logging out user' });
    }
}

export const sendVeriOtp = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, message: 'User not authenticated' });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.isAccountVerified) {
            return res.json({ success: false, message: 'Account already verified' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifiedOtp = otp;
        user.verifiedOtpExpire = Date.now() + 10 * 60 * 1000;
        await user.save();
        console.log("Email Verification OTP:", otp);

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Email Verification OTP',
            text: `Hi ${user.name},\n\nYour verification OTP is: ${otp}\n\nPlease enter this code to verify your email address.\n\nBest regards,\nMERN Auth Team`
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('Verification email sent successfully.');
        } catch (emailError) {
            console.error('SMTP Email sending error (falling back to console-only):', emailError.message);
        }
        return res.json({ success: true, message: 'OTP sent to email (sent to console/email)' });

    } catch (error) {
        console.error('Send OTP error:', error.message || error);
        return res.json({ success: false, message: 'Error in sending OTP' });
    }
}


export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId || req.body.userId;
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Please provide all the fields' });
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.verifiedOtp === '' || user.verifiedOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }
        if (user.verifiedOtpExpire < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }
        user.isAccountVerified = true;
        user.verifiedOtp = '';
        user.verifiedOtpExpire = 0;
        await user.save();
        return res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        return res.json({ success: false, message: 'Error in verifying email' });
    }

}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: 'User is authenticated' });
    } catch (error) {
        return res.json({ success: false, message: 'Error in authenticating user' });
    }
}


export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: 'Please provide email' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
        await user.save();
        console.log("Password Reset OTP:", otp);
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Hi,\n\nYour password reset OTP is: ${otp}\n\nPlease enter this code to reset your password.\n\nBest regards,\nMERN Auth Team`
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('Reset password email sent successfully.');
        } catch (emailError) {
            console.error('SMTP Email sending error (falling back to console-only):', emailError.message);
        }
        return res.json({ success: true, message: 'Reset OTP sent to email (sent to console/email)' });
    } catch (error) {
        return res.json({ success: false, message: 'Error in sending reset OTP' });
    }
}


export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Please provide all the fields' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }
        if (user.resetOtpExpire < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpire = 0;
        await user.save();
        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        return res.json({ success: false, message: 'Error in resetting password' });
    }
}




export default { register, login, logout, sendVeriOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword };