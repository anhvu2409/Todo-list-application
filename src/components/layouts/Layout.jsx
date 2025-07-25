import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import TaskIndicator from './TaskIndicator';
import CreateTask from '../createTask/CreateTask';
import TaskContext from '../../context/TaskContext';

// Progress Stats Component
function ProgressStats() {
    const { tasks } = useContext(TaskContext);
    const completedTasks = tasks.filter(task => task.completed);
    const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Tổng quan về tiến trình</h3>
                <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <div className="text-2xl font-bold text-white">{tasks.length}</div>
                    <div className="text-sm text-white/70">Nhiệm vụ</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-blue-300">{tasks.length - completedTasks.length}</div>
                    <div className="text-sm text-white/70">Hoạt động</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-green-300">{completedTasks.length}</div>
                    <div className="text-sm text-white/70">Hoàn thành</div>
                </div>
            </div>
        </div>
    );
}

function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
            {/* Header */}
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        ToDo-List<span className="text-yellow-300">Application</span>
                    </h1>
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Create Task */}
                    <div className="lg:col-span-1">
                        <CreateTask />
                    </div>

                    {/* Right Column - Tasks & Navigation */}
                    <div className="lg:col-span-2 space-y-6">
                        <ProgressStats />
                        <TaskIndicator />
                        
                        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 min-h-96">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;