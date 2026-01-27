# MERN Stack Intermediate Assignment — Task Management System

## Objective
Build a full-stack Task Management app (MERN) that lets users manage projects and tasks with authentication and authorization.

## Core Features (per assignment)
- User authentication (Register, Login, Logout) using JWT
- Password hashing using bcrypt
- Protected routes on both frontend and backend
- User profile management
- Project CRUD (Create, Read, Update, Delete)
- Task CRUD under projects
- Task status management (Todo, In Progress, Done)
- Task priority management (Low, Medium, High)
- Dashboard showing project list and task statistics

## Tech Stack Requirements
- Frontend: React, React Router, Hooks, Axios/Fetch
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- Styling: CSS/Tailwind/Material UI (this project uses Tailwind)

## Database Models
- User: `name`, `email`, `password`, `role`
- Project: `title`, `description`, `owner`, `createdAt`
- Task: `title`, `description`, `status`, `priority`, `dueDate`, `project`, `assignedTo`

## API Entry Point
- Base URL: `http://localhost:8000/api/v1`
  - Users: `/users/register`, `/users/login`, `/users/logout`, `/users/refresh-token`, `/users/me`, `/users/me` (PATCH), `/users/change-password`
  - Projects: `/projects` (POST/GET), `/projects/:projectId` (GET/PATCH/DELETE)
  - Tasks: `/tasks/project/:projectId` (POST/GET), `/tasks/:taskId` (PATCH), `/tasks/:taskId/status` (PATCH), `/tasks/:taskId` (DELETE)

## Project Structure
```
backend/    # Express + MongoDB + JWT
frontend/   # React + Vite + Tailwind + React Router + Axios
```

## Dependencies (from package.json)
- Backend: `express`, `mongoose`, `jsonwebtoken`, `bcrypt`, `cors`, `cookie-parser`, `dotenv`, `nodemon`
- Frontend: `react`, `react-dom`, `react-router-dom`, `axios`, `tailwindcss`, `@tailwindcss/vite`, `vite`

## Environment Variables
Create a `.env` in `backend/` based on `.env.example`.
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/task-manager
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

## Setup & Run
### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Feature Coverage vs Assignment
- Auth with JWT (register/login/logout/refresh) and bcrypt hashing ✅
- Protected routes frontend/backed ✅
- Profile update & change password ✅
- Project CRUD ✅
- Task CRUD + status + priority + due date + assignedTo ✅
- Dashboard stats ✅

## Submission Requirements
- GitHub repository link
- README with setup instructions (this file)
- API documentation (routes listed above)
- Environment variables example file (`backend/.env.example`)

Estimated Time: 8–12 hours
