import React, { useState, useEffect } from 'react';
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo.png';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // If already authenticated, redirect to dashboard
        if (localStorage.getItem('isAuthenticated') === 'true') {
            navigate('/dashboard');
        }
    }, [navigate]);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Basic Validation
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            let response;
            if (isLogin) {
                response = await api.post('/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
            } else {
                response = await api.post('/auth/register', {
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password
                });
            }

            if (response.status === 200 || response.status === 201) {
                if (isLogin) {
                    const { token, user } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isAuthenticated', 'true');
                    navigate('/dashboard');
                } else {
                    alert("Registration successful! Please sign in.");
                    setIsLogin(true);
                }
            }
        } catch (error) {
            console.error("Authentication error:", error);
            const message = error.response?.data?.message || "Authentication failed. Please check your credentials and try again.";
            alert(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 z-10">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img
                            src={logo}
                            alt="Career Galaxy Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Join Career Galaxy'}
                    </h2>
                    <p className="text-gray-400">
                        {isLogin
                            ? 'Enter your credentials to access your account'
                            : 'Create an account to start your journey'}
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200 outline-none"
                                placeholder="Full Name"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200 outline-none"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200 outline-none"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200 outline-none"
                                placeholder="Confirm Password"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                    <span className="h-px w-full bg-white/10"></span>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <span className="h-px w-full bg-white/10"></span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all duration-200">
                        <FaGoogle className="text-red-500" />
                        <span className="text-sm">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all duration-200">
                        <FaGithub />
                        <span className="text-sm">GitHub</span>
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={toggleAuthMode}
                            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
