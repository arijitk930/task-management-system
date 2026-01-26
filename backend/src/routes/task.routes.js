import { Router } from "express";
import {
  createTask,
  getProjectTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// tasks
router.post("/project/:projectId", verifyJWT, createTask);
router.get("/project/:projectId", verifyJWT, getProjectTasks);

router.patch("/:taskId", verifyJWT, updateTask);
router.patch("/:taskId/status", verifyJWT, updateTaskStatus);
router.delete("/:taskId", verifyJWT, deleteTask);

export default router;
