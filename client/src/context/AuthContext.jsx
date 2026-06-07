import React, { createContext, useState, useEffect } from 'react';
import api from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/api/user/data');
                if (response.data.success) {
                    const userData = response.data.data || response.data.user;
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            if (response.data.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/api/auth/register', { name, email, password });
            if (response.data.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            const response = await api.post('/api/auth/logout');
            if (response.data.success) {
                setUser(null);
                setIsAuthenticated(false);
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            return { success: true, message: 'Logged out' };
        }
    };

    const sendVeriOtp = async () => {
        try {
            const response = await api.post('/api/auth/send-veri-otp');
            return { success: response.data.success, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to send OTP' };
        }
    };

    const verifyEmail = async (otp) => {
        try {
            const response = await api.post('/api/auth/verify-email', { otp });
            if (response.data.success) {
                setUser({ ...user, isAccountVerified: true });
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Verification failed' };
        }
    };

    const sendResetOtp = async (email) => {
        try {
            const response = await api.post('/api/auth/send-reset-otp', { email });
            return { success: response.data.success, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to send reset OTP' };
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            const response = await api.post('/api/auth/reset-password', { email, otp, newPassword });
            return { success: response.data.success, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Password reset failed' };
        }
    };

    const value = {
        user,
        setUser,
        loading,
        isAuthenticated,
        setIsAuthenticated,
        login,
        register,
        logout,
        sendVeriOtp,
        verifyEmail,
        sendResetOtp,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
