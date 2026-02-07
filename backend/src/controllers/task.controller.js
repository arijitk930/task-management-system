import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";

// Create task
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title?.trim()) {
    throw new ApiError(400, "Task title is required");
  }

  const task = await Task.create({
    title,
    description,
    status,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// Update task
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

// Update task status
const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["todo", "in-progress", "done"].includes(status)) {
    throw new ApiError(400, "Invalid task status");
  }

  const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

// Delete task
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

export { createTask, getTasks, updateTask, updateTaskStatus, deleteTask };
