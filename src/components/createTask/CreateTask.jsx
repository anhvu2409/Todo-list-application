import React, { useState, useContext } from 'react';
import { Plus } from 'lucide-react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";

function CreateTask() {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [deadline, setDeadline] = useState(""); // Add deadline state
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        setIsLoading(true);

        try {
            // Call API to add task to database
            const res = await axios.post("/task/addTask", {
                title, 
                description,
                priority,
                deadline: deadline || null // Send deadline if provided
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            // Fetch updated tasks from server instead of just dispatching
            const tasksResponse = await axios.get("/task/getTask", {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            dispatch({
                type: "SET_TASK",
                payload: tasksResponse.data
            });

            // Reset form
            setTitle("");
            setDescription("");
            setPriority("medium");
            setDeadline(""); // Reset deadline
            setIsExpanded(false);
            
            console.log("Task added successfully");

        } catch (error) {
            console.error("Error adding task:", error);
            // Optionally show error message to user
            alert("Có lỗi xảy ra khi thêm task. Vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Tạo Kế Hoạch Mới
                </h2>
            </div>

            <div className="space-y-4">
                <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white/50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white/70 transition-all duration-300 placeholder-gray-500"
                        placeholder="What needs to be done?"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-4 pt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Chú thích</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-white/50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white/70 transition-all duration-300 placeholder-gray-500 resize-none"
                                placeholder="Add more details..."
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mức độ ưu tiên</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white/70 transition-all duration-300"
                                disabled={isLoading}
                            >
                                <option value="low">Thấp</option>
                                <option value="medium">Trung bình</option>
                                <option value="high">Cao</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Tùy chọn)</label>
                            <input
                                type="datetime-local"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white/70 transition-all duration-300"
                                disabled={isLoading}
                                min={new Date().toISOString().slice(0, 16)} // Prevent past dates
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    {!isExpanded ? (
                        <button
                            type="button"
                            onClick={() => setIsExpanded(true)}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            disabled={isLoading}
                        >
                            Thêm chi tiết
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
                                disabled={isLoading}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || !title.trim() || !description.trim()}
                            >
                                {isLoading ? 'Đang tạo...' : 'Tạo kế hoạch'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateTask;