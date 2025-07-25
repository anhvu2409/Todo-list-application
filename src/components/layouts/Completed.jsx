import React, { useContext } from "react";
import { CheckCircle } from 'lucide-react';
import TaskContext from "../../context/TaskContext";
import CompletedTask from "./CompletedTask";

function Completed() {
    const { tasks } = useContext(TaskContext);
    
    return (
        <div>
            {
                (tasks.length !== 0) ? (
                    tasks.map((task, index) => {
                        return (
                            task.completed && <CompletedTask
                                key={task.id || index}
                                task={task}
                                id={index}
                            />
                        )
                    })
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Không có nhiệm vụ hoàn thành nào đang diễn ra</h3>
                        <p className="text-gray-500">Hoàn thành một số nhiệm vụ để xem chúng ở đây!</p>
                    </div>
                )
            }
        </div>
    );
}

export default Completed;