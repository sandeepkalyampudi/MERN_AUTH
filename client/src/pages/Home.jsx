import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-6 text-lg text-gray-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <Header />

            {/* CTA Section */}
            <div className="w-full px-4 sm:px-24 py-12">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-12 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Ready to Get Started?</h2>
                            <p className="text-blue-100">Explore all the powerful features we offer</p>
                        </div>
                        <div className="flex gap-4">
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => navigate('/register')}
                                        className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    {user && !user.isEmailVerified && (
                                        <button
                                            onClick={() => navigate('/verify-email')}
                                            className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                                        >
                                            <span>⚠️</span> Verify Email
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="w-full px-4 sm:px-24 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Secure</h3>
                        <p className="text-gray-600">Enterprise-grade security with JWT tokens and password hashing</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Fast</h3>
                        <p className="text-gray-600">Lightning-fast authentication and session management</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">📧</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Verified</h3>
                        <p className="text-gray-600">Email verification and password recovery options</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Modern UI</h3>
                        <p className="text-gray-600">Beautiful and responsive interface for all devices</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">🔄</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time</h3>
                        <p className="text-gray-600">Live updates and instant notifications</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-2xl">🌐</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Scalable</h3>
                        <p className="text-gray-600">Built to grow with your application needs</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full px-4 sm:px-24 py-8 border-t border-gray-200 bg-white">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-gray-600">© 2024 MERN Auth System. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
