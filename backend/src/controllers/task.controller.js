import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { Project } from "../models/project.model.js";
import mongoose from "mongoose";

//  Create task under a project
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, assignedTo } = req.body;
  const { projectId } = req.params;

  if (!title?.trim()) {
    throw new ApiError(400, "Task title is required");
  }

  const project = await Project.findOne({
    _id: projectId,
    owner: req.user._id,
  });

  if (!project) {
    throw new ApiError(404, "Project not found or unauthorized");
  }

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    project: projectId,
    assignedTo,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

//  Get tasks of a project
const getProjectTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

//  Update task
const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndUpdate(
    taskId,
    { $set: req.body },
    { new: true },
  );

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

//  Update task status
const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["todo", "in-progress", "done"].includes(status)) {
    throw new ApiError(400, "Invalid task status");
  }

  const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

//  Delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

export {
  createTask,
  getProjectTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
