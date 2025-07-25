import React, { useState, useContext } from 'react';
import { Check, Clock, Trash2, Edit3, Calendar, AlertTriangle } from 'lucide-react';
import moment from 'moment';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline ? moment(task.deadline).format('YYYY-MM-DDTHH:mm') : ''
    });

    // Safe way to get MongoDB _id
    const getTaskId = () => {
        // Priority: task._id > task.id > id prop
        const taskId = task._id || task.id || id;
        
        // Validate if it's a valid MongoDB ObjectId (24 chars, hex)
        if (!taskId || typeof taskId !== 'string') {
            console.error("Invalid task ID:", taskId);
            return null;
        }
        
        // Check if it's a valid MongoDB ObjectId format
        if (taskId.length !== 24 || !/^[a-fA-F0-9]{24}$/.test(taskId)) {
            console.error("Invalid MongoDB ObjectId format:", taskId);
            return null;
        }
        
        return taskId;
    };

    const handleRemove = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const taskId = getTaskId();
        if (!taskId) {
            alert("Lỗi: Task ID không hợp lệ!");
            return;
        }
        
        try {
            console.log("Deleting task with valid ID:", taskId);
            
            await axios.delete(`/task/removeTask/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            
            dispatch({
                type: "REMOVE_TASK",
                id: taskId
            });
            
            console.log("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
            console.error("Error details:", error.response?.data);
            alert(`Lỗi xóa task: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleMarkDone = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const taskId = getTaskId();
        if (!taskId) {
            alert("Lỗi: Task ID không hợp lệ!");
            return;
        }
        
        try {
            const newCompletedStatus = !task.completed;
            console.log("Updating task status with valid ID:", taskId);
            
            await axios.patch(`/task/updateTaskStatus/${taskId}`, {
                completed: newCompletedStatus
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            });
            
            dispatch({
                type: "MARK_DONE",
                id: taskId
            });
            
            console.log("Task status updated successfully");
        } catch (error) {
            console.error("Error updating task status:", error);
            console.error("Error details:", error.response?.data);
            alert(`Lỗi cập nhật task: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        
        const taskId = getTaskId();
        if (!taskId) {
            alert("Lỗi: Task ID không hợp lệ!");
            return;
        }
        
        try {
            await axios.put(`/task/updateTask/${taskId}`, {
                title: editData.title,
                description: editData.description,
                priority: editData.priority,
                deadline: editData.deadline || null
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            });
            
            // Fetch updated tasks to reflect changes
            const tasksResponse = await axios.get("/task/getTask", {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            dispatch({
                type: "SET_TASK",
                payload: tasksResponse.data
            });
            
            setIsEditing(false);
            console.log("Task updated successfully");
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Không thể cập nhật task. Vui lòng thử lại!");
        }
    };

    const handleCancelEdit = () => {
        setEditData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline ? moment(task.deadline).format('YYYY-MM-DDTHH:mm') : ''
        });
        setIsEditing(false);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'from-red-400 to-red-600';
            case 'medium': return 'from-yellow-400 to-orange-500';
            case 'low': return 'from-green-400 to-green-600';
            default: return 'from-gray-400 to-gray-600';
        }
    };

    const formatTime = (date) => {
        if (!date) return 'just now';
        return moment(date).fromNow();
    };

    const getDeadlineStatus = (deadline) => {
        if (!deadline) return null;
        
        const now = moment();
        const deadlineTime = moment(deadline);
        const diffHours = deadlineTime.diff(now, 'hours');
        
        if (diffHours < 0) {
            return { status: 'overdue', color: 'text-red-600', bgColor: 'bg-red-100' };
        } else if (diffHours < 24) {
            return { status: 'urgent', color: 'text-orange-600', bgColor: 'bg-orange-100' };
        } else if (diffHours < 72) {
            return { status: 'upcoming', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        } else {
            return { status: 'normal', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        }
    };

    const deadlineStatus = getDeadlineStatus(task.deadline);

    // Debug info - remove in production
    const validId = getTaskId();
    console.log("Task render debug:", {
        taskId: validId,
        taskObject: task,
        idProp: id
    });

    if (isEditing) {
        return (
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-xl border-2 border-purple-300 mb-4">
                <div className="space-y-4">
                    <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:border-purple-500"
                        placeholder="Tiêu đề task"
                    />
                    <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({...editData, description: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:border-purple-500"
                        rows="3"
                        placeholder="Mô tả task"
                    />
                    <div className="flex gap-4">
                        <select
                            value={editData.priority}
                            onChange={(e) => setEditData({...editData, priority: e.target.value})}
                            className="px-3 py-2 border rounded-lg focus:border-purple-500"
                        >
                            <option value="low">Thấp</option>
                            <option value="medium">Trung bình</option>
                            <option value="high">Cao</option>
                        </select>
                        <input
                            type="datetime-local"
                            value={editData.deadline}
                            onChange={(e) => setEditData({...editData, deadline: e.target.value})}
                            className="px-3 py-2 border rounded-lg focus:border-purple-500"
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-white/30 mb-4 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                task.completed ? 'opacity-75' : ''
            } ${deadlineStatus?.status === 'overdue' ? 'border-red-300 bg-red-50/80' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Debug info - remove in production */}
            <div className="absolute top-2 right-2 text-xs text-gray-400">
                ID: {validId ? 'Valid' : 'Invalid'}
            </div>
            
            {/* Priority Indicator */}
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${getPriorityColor(task.priority)} rounded-l-2xl`} />
            
            {/* Deadline Warning */}
            {deadlineStatus && deadlineStatus.status === 'overdue' && (
                <div className="absolute top-2 right-8">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
            )}
            
            <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                    onClick={handleMarkDone}
                    disabled={!validId}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        task.completed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                            : 'border-gray-300 hover:border-purple-500'
                    } ${!validId ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                        {task.title}
                    </h3>
                    <p className={`text-sm mb-3 transition-all duration-300 ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-600'
                    }`}>
                        {task.description}
                    </p>
                    
                    {/* Deadline Display */}
                    {task.deadline && (
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${deadlineStatus.color} ${deadlineStatus.bgColor}`}>
                            <Calendar className="w-3 h-3" />
                            <span>
                                {deadlineStatus.status === 'overdue' && 'Quá hạn: '}
                                {moment(task.deadline).format('DD/MM/YYYY HH:mm')}
                                {deadlineStatus.status !== 'overdue' && ` (${moment(task.deadline).fromNow()})`}
                            </span>
                        </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(task.createdAt)}
                        </div>
                        {task.priority && (
                            <div className={`px-2 py-1 rounded-full text-white text-xs font-medium bg-gradient-to-r ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className={`flex items-center gap-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                    <button
                        onClick={handleEdit}
                        disabled={!validId}
                        className={`w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-10 ${!validId ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleRemove}
                        disabled={!validId}
                        className={`w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg z-10 ${!validId ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Task;