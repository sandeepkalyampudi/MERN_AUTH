import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div className="w-full px-4 sm:px-24 py-16 sm:py-24 bg-gradient-to-b from-blue-50 to-transparent">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                {/* Left Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                            Welcome{isAuthenticated && `, ${user?.name?.split(' ')[0]}`}! 👋
                        </h1>
                        <p className="text-xl text-gray-600">
                            {isAuthenticated
                                ? 'Your account is secure and ready to go'
                                : 'Secure authentication made simple'}
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-gray-700">Secure JWT Authentication</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-gray-700">Email Verification</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-gray-700">Password Reset & Recovery</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-gray-700">Modern & Responsive Design</span>
                        </div>
                    </div>
                </div>

                {/* Right Illustration */}
                <div className="flex-1 flex justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                        <div className="text-white text-center p-6">
                            <div className="text-6xl mb-4">🔐</div>
                            <p className="text-lg font-semibold">Enterprise-Grade Security</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Info */}
            {isAuthenticated && user && (
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                        <p className="text-sm text-gray-600">Account Status</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">Active</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500">
                        <p className="text-sm text-gray-600">Email Verified</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">
                            {user.isEmailVerified ? '✓ Yes' : '✗ No'}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
