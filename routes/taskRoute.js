import express from "express"
import { addTask, getTask, removeTask, updateTaskStatus, updateTask} from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/addTask", requireAuth, addTask)
router.get("/getTask", requireAuth, getTask)
router.delete("/removeTask/:id", requireAuth, removeTask)
router.patch("/updateTaskStatus/:id", requireAuth, updateTaskStatus)
router.put("/updateTask/:id", requireAuth, updateTask) // New route for editing

export default router;