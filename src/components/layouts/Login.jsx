import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../../Axios/axios.js"
import TokenContext from '../../context/TokenContext.js';

function Login() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/user/login", formData)
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token })
            userDispatch({ type: "SET_USER", payload: result.data.user })
            localStorage.setItem("authToken",JSON.stringify(result.data.token))
        } catch (error) {
            console.log(error);
            setError({ message: error.response.data.message })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex items-center justify-center px-4 py-8">
            {userToken && <Navigate to="/" />}
            
            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-16 left-16 w-36 h-36 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-32 right-24 w-20 h-20 bg-pink-300/20 rounded-full blur-lg animate-bounce"></div>
                <div className="absolute bottom-24 left-32 w-44 h-44 bg-cyan-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-16 right-16 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-bounce delay-500"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Glass morphism card */}
                <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-y-12 animate-pulse"></div>
                    
                    {/* Header with icon */}
                    <div className="text-center mb-8 relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Chào Mừng Trở Lại</h1>
                    </div>

                    <form method='post' onSubmit={handleSubmit} className="relative z-10">
                        {/* Error message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-red-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-200 text-sm">{error.message}</p>
                                </div>
                            </div>
                        )}

                        {/* Email input */}
                        <div className="mb-6 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name='email'
                                onChange={handleChange}
                                placeholder="Địa chỉ email"
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                id="emailInput"
                            />
                        </div>

                        {/* Password input */}
                        <div className="mb-6 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                placeholder="Mật khẩu"
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                id="passInput"
                            />
                        </div>

                        {/* Forgot password link */}
                        <div className="flex justify-end mb-8">
                            <Link
                                to={"/forgotPassword"}
                                className="text-white/70 hover:text-white text-sm transition-colors duration-200 hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <button 
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-400/50 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative flex items-center justify-center space-x-2">
                                <span>Đăng Nhập</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </span>
                        </button>

                        {/* Register link */}
                        <div className="text-center mt-6">
                            <p className="text-white/70 text-sm">
                                Chưa có tài khoản?{" "}
                                <Link
                                    to={"/register"}
                                    className="text-white hover:text-purple-200 font-semibold transition-colors duration-200 hover:underline"
                                >
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Bottom floating elements */}
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-bounce delay-300"></div>
                <div className="absolute -top-6 -right-6 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70 animate-pulse delay-700"></div>
            </div>
        </div>
    );
}

export default Login;