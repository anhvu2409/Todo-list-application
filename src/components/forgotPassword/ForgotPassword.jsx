import React, { useState } from 'react';
import { Mail, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Mock axios for demonstration - replace with your actual axios import
const axios = {
  post: async (url, data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (data.email === 'error@test.com') {
      throw { response: { data: { message: 'Email không tồn tại trong hệ thống' } } };
    }
    return { data: { message: 'Link đặt lại mật khẩu đã được gửi đến email của bạn' } };
  }
};

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setMessage("");
            setError("");
            const res = await axios.post("/forgotPassword/forgotPassword", {email});
            console.log(res);
            setMessage(res.data.message);
            console.log(res.data.message);
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
            console.log(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Quên mật khẩu?</h1>
                        <p className="text-indigo-100 text-sm">
                            Nhập email của bạn để nhận link đặt lại mật khẩu
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">
                                    Địa chỉ email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="example@email.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSubmit(e);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <button 
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Đang gửi...</span>
                                    </>
                                ) : (
                                    <span>Gửi link đặt lại</span>
                                )}
                            </button>
                        </div>

                        {/* Success Message */}
                        {message && (
                            <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-green-800 mb-1">
                                            Thành công!
                                        </h3>
                                        <p className="text-sm text-green-700">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mt-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-red-800 mb-1">
                                            Có lỗi xảy ra!
                                        </h3>
                                        <p className="text-sm text-red-700">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 text-center">
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Cần trợ giúp? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Liên hệ hỗ trợ</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;