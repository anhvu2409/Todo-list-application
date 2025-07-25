import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'anhvu240904@gmail.com',
        to: email,
        subject: subject,
        html:`<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const addTask = async (req, res) => {
    const { title, description, priority = 'medium', deadline } = req.body; // Add deadline
    const userId = req.user.id;
    const user = await userModel.find({_id: userId});
    const newTask = new taskModel({ 
        title, 
        description, 
        completed: false, 
        priority, 
        deadline: deadline ? new Date(deadline) : null, // Convert to Date if provided
        userId 
    })
    newTask.save()
        .then(() => {
            sendMail(user[0].email, "Task Added", title, description)
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}

// Fixed removeTask - use URL parameter instead of body
const removeTask = (req, res) => {
    const { id } = req.params; // Changed from req.body to req.params
    console.log("Deleting task with id: ", id);
    
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(500).json({ message: error.message })) // Fixed status code
}

// New function to update task status (mark complete/incomplete)
const updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body; // true or false
    
    console.log(`Updating task ${id} to completed: ${completed}`);
    
    taskModel.findByIdAndUpdate(
        id, 
        { completed: completed }, 
        { new: true } // Return updated document
    )
        .then((updatedTask) => {
            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ 
                message: "Task status updated successfully", 
                task: updatedTask 
            });
        })
        .catch((error) => res.status(500).json({ message: error.message }))
}

// New function to update entire task (for editing)
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, priority, deadline } = req.body;
    
    console.log(`Updating task ${id} with data:`, { title, description, priority, deadline });
    
    const updateData = {
        title,
        description,
        priority,
        deadline: deadline ? new Date(deadline) : null
    };
    
    taskModel.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true } // Return updated document
    )
        .then((updatedTask) => {
            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ 
                message: "Task updated successfully", 
                task: updatedTask 
            });
        })
        .catch((error) => res.status(500).json({ message: error.message }))
}

const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .sort({ 
            // Sort by deadline (closest first), then by creation date
            deadline: 1, // Ascending: closest deadline first
            createdAt: -1 // Descending: newest first for tasks without deadline
        })
        .then((data) => {
            // Additional sorting: prioritize tasks with deadline, then by priority
            const sortedData = data.sort((a, b) => {
                // If both have deadline, sort by deadline
                if (a.deadline && b.deadline) {
                    return new Date(a.deadline) - new Date(b.deadline);
                }
                // Tasks with deadline come first
                if (a.deadline && !b.deadline) return -1;
                if (!a.deadline && b.deadline) return 1;
                
                // If no deadline, sort by priority (high > medium > low)
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
            
            res.status(200).json(sortedData);
        })
        .catch((error) => res.status(500).json({ message: error.message }))
}

export { addTask, getTask, removeTask, updateTaskStatus, updateTask }