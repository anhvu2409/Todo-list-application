import React, { useContext } from 'react';
import { List } from 'lucide-react';
import Task from '../Task/Task';
import TaskContext from '../../context/TaskContext';

function AllTask() {
    const { tasks } = useContext(TaskContext);
    
    return (
        <div>
            {tasks.length !== 0 ? (
                tasks.map((task) => (
                        <Task key={task._id} task={task} id={task._id} />
                ))
            ) : (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <List className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Không có kế hoạch nào đang diễn ra</h3>
                    <p className="text-gray-500">Hãy bắt đầu tạo kế hoạch đầu tiên!</p>
                </div>
            )}
        </div>
    );
}

export default AllTask;