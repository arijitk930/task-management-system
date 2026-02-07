import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Flat task API (no project) – matches frontend
router.get("/", verifyJWT, getTasks);
router.post("/", verifyJWT, createTask);
router.patch("/:taskId", verifyJWT, updateTask);
router.patch("/:taskId/status", verifyJWT, updateTaskStatus);
router.delete("/:taskId", verifyJWT, deleteTask);

export default router;
