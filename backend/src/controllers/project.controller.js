import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

//  Create Project
const createProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Project title is required");
  }

  const project = await Project.create({
    title,
    description,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

//  Get all projects of logged-in user
const getUserProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

// Get single project
const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

//  Update project
const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title, description } = req.body;

  const project = await Project.findOneAndUpdate(
    { _id: projectId, owner: req.user._id },
    { $set: { title, description } },
    { new: true },
  );

  if (!project) {
    throw new ApiError(404, "Project not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

//  Delete project (and its tasks)
const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findOneAndDelete({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    throw new ApiError(404, "Project not found or unauthorized");
  }

  await Task.deleteMany({ project: projectId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Project deleted successfully"));
});

export {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
