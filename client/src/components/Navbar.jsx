import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogoutClick = async () => {
        try {
            const result = await logout();
            if (result.success) {
                toast.success('Logged out successfully');
                setShowDropdown(false);
                navigate('/');
            }
        } catch (error) {
            toast.error('Logout failed');
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 left-0 z-50">
            <div
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate('/')}
            >
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">M</span>
                    </div>
                    <span className="text-white font-bold text-xl hidden sm:inline">MERN Auth</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {!isAuthenticated ? (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-white hover:bg-blue-700 transition px-4 py-2 rounded-lg border border-white"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="text-blue-600 bg-white hover:bg-gray-100 transition px-4 py-2 rounded-lg font-medium"
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-3 text-white hover:bg-blue-700 transition px-4 py-2 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-sm">{user?.name?.[0]?.toUpperCase()}</span>
                            </div>
                            <span className="hidden sm:inline">{user?.name}</span>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-10 border border-gray-100">
                                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <p className="font-bold text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-600 mt-1">{user?.email}</p>
                                    {user?.isEmailVerified && (
                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                            ✓ Email Verified
                                        </p>
                                    )}
                                </div>

                                <div className="py-2">
                                    {!user?.isEmailVerified && (
                                        <button
                                            onClick={() => {
                                                navigate('/verify-email');
                                                setShowDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                                        >
                                            Verify Email
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            navigate('/reset-password');
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                                    >
                                        Change Password
                                    </button>

                                    <hr className="my-2" />

                                    <button
                                        onClick={handleLogoutClick}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
