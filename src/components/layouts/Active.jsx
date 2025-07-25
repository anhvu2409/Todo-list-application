import React, { useContext } from 'react';
import { Circle } from 'lucide-react';
import Task from '../Task/Task';
import TaskContext from '../../context/TaskContext';

function Active() {
    const { tasks } = useContext(TaskContext);
    
    return (
        <div>
            {
                (tasks.length !== 0) ? (
                    tasks.map((task, index) => {
                        return (
                            !task.completed && <Task
                                key={task.id || index}
                                task={task}
                                id={index}
                            />
                        )
                    })
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Circle className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Không hoạt động nào đang diễn ra</h3>
                        <p className="text-gray-500">Tạo hoạt động mới hoặc kiểm tra hoạt động đã hoàn thành</p>
                    </div>
                )
            }
        </div>
    );
}

export default Active;