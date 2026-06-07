import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const EmailVerify = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, sendVeriOtp, verifyEmail } = useAuth();
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(0);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (user?.isAccountVerified) {
            toast.info('Your email is already verified');
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    // Timer for resend OTP
    useEffect(() => {
        if (timer > 0) {
            const interval = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(interval);
        }
    }, [timer]);

    const handleSendOtp = async () => {
        setLoading(true);
        try {
            const result = await sendVeriOtp();
            if (result.success) {
                toast.success('OTP sent to your email');
                setOtpSent(true);
                setTimer(60);
            } else {
                toast.error(result.message || 'Failed to send OTP');
            }
        } catch (error) {
            toast.error('Error sending OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyEmail = async (e) => {
        e.preventDefault();

        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const result = await verifyEmail(otp);
            if (result.success) {
                toast.success('Email verified successfully!');
                navigate('/');
            } else {
                toast.error(result.message || 'Verification failed');
            }
        } catch (error) {
            toast.error('Error verifying email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h1>
                    <p className="text-gray-600">Enter the OTP sent to your email</p>
                    <p className="text-sm text-gray-500 mt-2">{user?.email}</p>
                </div>

                {!otpSent ? (
                    // Send OTP Button
                    <button
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                Sending OTP...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send OTP
                            </>
                        )}
                    </button>
                ) : (
                    // OTP Verification Form
                    <form onSubmit={handleVerifyEmail} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter OTP Code
                            </label>
                            <input
                                type="text"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                placeholder="000000"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-center text-2xl font-bold tracking-widest"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                OTP is valid for 10 minutes
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Verifying...
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                Didn't receive OTP?
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setOtp('');
                                    setOtpSent(false);
                                }}
                                disabled={timer > 0}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 disabled:text-gray-400"
                            >
                                {timer > 0 ? `Resend in ${timer}s` : 'Send Another OTP'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Info Box */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-700">
                        <strong>Why verify?</strong> Email verification helps secure your account and ensures we can contact you if needed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
