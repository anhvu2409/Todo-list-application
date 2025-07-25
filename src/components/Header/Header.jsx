import React from 'react';
import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css"

function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    console.log("user", user);
    
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }

    return (
    <div>
        <nav className='header bg-gradient-to-r from-slate-50 to-gray-100 shadow-lg border-b border-gray-200 flex justify-between items-center px-6 py-4'>
            {/* Logo Section */}
            <div className="logo w-1/4 flex items-center">
                <NavLink to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                    <img src="/logo192.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-md" />
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                        Group 5 todo-list-application
                    </span>
                </NavLink>
            </div>

                {/* Navigation Section */}
                <div className='flex justify-between items-center'>
                    {
                        token ? (
                            <div className='flex items-center justify-center space-x-4'>
                                <div className="flex items-center space-x-3 bg-white rounded-2xl px-4 py-2 shadow-md border border-gray-100">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className='text-sm text-gray-600'>Chào mừng,</p>
                                        <p className='font-semibold text-gray-800 capitalize -mt-1'>{user.name}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={logout} 
                                    className="logout bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                        ) : (
                            <ul className='flex justify-end gap-4 items-center'>
                                <li>
                                    <NavLink 
                                        to="/login"
                                        className={({ isActive }) => 
                                            `px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                                                isActive 
                                                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' 
                                                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                                            }`
                                        }
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Đăng nhập</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/register"
                                        className={({ isActive }) => 
                                            `px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                                                isActive 
                                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                                                    : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-600'
                                            }`
                                        }
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        <span>Đăng ký</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;