import mongoose from "mongoose";

const taskInstance = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    deadline: { 
        type: Date, 
        required: false 
    }
}, { timestamps: true });

const taskModel = mongoose.model("Task", taskInstance);
export default taskModel;