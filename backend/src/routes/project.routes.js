import { Router } from "express";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// projects
router.post("/", verifyJWT, createProject);
router.get("/", verifyJWT, getUserProjects);
router.get("/:projectId", verifyJWT, getProjectById);
router.patch("/:projectId", verifyJWT, updateProject);
router.delete("/:projectId", verifyJWT, deleteProject);

export default router;
