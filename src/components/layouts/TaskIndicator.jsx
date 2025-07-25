import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { List, Circle, CheckCircle } from 'lucide-react';
import TaskContext from '../../context/TaskContext';

function TaskIndicator() {
    const { tasks } = useContext(TaskContext);
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    const tabs = [
        { to: '/', label: 'All Tasks', count: tasks.length, icon: List },
        { to: '/active', label: 'Active', count: activeTasks.length, icon: Circle },
        { to: '/completed', label: 'Completed', count: completedTasks.length, icon: CheckCircle }
    ];

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 shadow-xl border border-white/20">
            <nav>
                <ul className="flex gap-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <li key={tab.to} className="flex-1">
                                <NavLink
                                    to={tab.to}
                                    className={({ isActive }) =>
                                        `flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                                            isActive
                                                ? 'bg-white text-purple-600 shadow-lg transform scale-105'
                                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{tab.label}</span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                isActive
                                                    ? 'bg-purple-100 text-purple-600'
                                                    : 'bg-white/20 text-white/80'
                                            }`}>
                                                {tab.count}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default TaskIndicator;