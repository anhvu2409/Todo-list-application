function taskReducer(tasks, action) {
    console.log("taskReducer action:", action.type, action);
    
    switch (action.type) {
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    title: action.title,
                    description: action.description,
                    priority: action.priority || 'medium',
                    deadline: action.deadline || null,
                    completed: false,
                    // Note: Real _id will come from backend when fetching tasks
                    _id: Date.now() // Temporary id for optimistic update
                }
            ]
        }
        
        case "SET_TASK": {
            return action.payload
        }
        
        case "REMOVE_TASK": {
            console.log("Removing task with id:", action.id);
            console.log("Current tasks:", tasks);
            
            // Use _id instead of index
            const filteredTasks = tasks.filter((task) => {
                const taskId = task._id || task.id;
                return taskId !== action.id;
            });
            
            console.log("Tasks after removal:", filteredTasks);
            return filteredTasks;
        }
        
        case "MARK_DONE": {
            console.log("Marking task done with id:", action.id);
            
            // Use _id instead of index
            return tasks.map((task) => {
                const taskId = task._id || task.id;
                if (taskId === action.id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task;
            })
        }
        
        case "ADD_TASK_BACK": {
            // For rollback functionality (if using optimistic updates)
            return [...tasks, action.task];
        }
        
        default: {
            throw Error("Unknown Action: " + action.type)
        }
    }
}

export default taskReducer;