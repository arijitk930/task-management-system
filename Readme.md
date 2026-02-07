# Task Management Web Application

A full-stack Task Management application where users can create, view, update, and delete tasks. Built for the Full Stack Development Internship - Skill Assessment Assignment.

## Objective

Build a simple Task Management Web Application where users can manage tasks with authentication. Each user has their own set of tasks—tasks are scoped per account.

## Live Demo

**The app is fully functional** — try it by clicking the link below:

👉 **[https://task-management-system-alpha-seven.vercel.app/](https://task-management-system-alpha-seven.vercel.app/)**

- **Frontend:** Deployed on [Vercel](https://vercel.com)
- **Backend:** Deployed on [Render](https://render.com)

## Features

### Core (Assignment Requirements)

- **Task list page** – View all your tasks in a card-based layout
- **Add task form** – Create tasks with Title, Description, and Status
- **Task fields** – Title (required), Description (optional), Status (Todo, In Progress, Done)
- **CRUD operations** – Create, Read, Update, Delete tasks
- **Filter** – Filter by status (All, Todo, In Progress, Done) and search by title

### Bonus (Implemented)

- **Authentication** – Register, Login, Logout using JWT
- **Password hashing** – bcrypt
- **Protected routes** – Frontend and backend routes require authentication
- **User profile** – Update profile and change password
- **Dashboard** – Task statistics (Total, Todo, In Progress, Done) and recent tasks

## Tech Stack

| Layer      | Technologies                          |
| ---------- | ------------------------------------- |
| Frontend   | React, React Router, Vite, TanStack Query, Tailwind CSS |
| Backend    | Node.js, Express.js                   |
| Database   | MongoDB with Mongoose                  |
| Auth       | JWT (access + refresh tokens)         |

## Project Structure

```
task-management-system/
├── backend/          # Express API
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       └── utils/
├── frontend/          # React SPA
│   └── src/
│       ├── api/       # API client, query keys
│       ├── components/
│       ├── hooks/     # React Query hooks
│       ├── pages/
│       └── main.jsx
└── Readme.md
```

## Database Models

### User
- `name`, `email`, `password` (hashed), `role`, `refreshToken`

### Task
- `title`, `description`, `status` (todo | in-progress | done), `owner` (ref: User)

## API Documentation

Base URL: `http://localhost:8000/api/v1` (or your `VITE_API_BASE_URL`)

### Auth (Public)
| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/users/register`  | Register user      |
| POST   | `/users/login`     | Login              |

### Auth (Protected)
| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/users/logout`       | Logout             |
| POST   | `/users/refresh-token`| Refresh access token |
| GET    | `/users/me`           | Get current user  |
| PATCH  | `/users/me`           | Update profile     |
| PATCH  | `/users/change-password` | Change password |

### Tasks (Protected)
| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/tasks`         | Get all tasks (own only) |
| POST   | `/tasks`         | Create task              |
| PATCH  | `/tasks/:taskId` | Update task              |
| PATCH  | `/tasks/:taskId/status` | Update status    |
| DELETE | `/tasks/:taskId` | Delete task              |

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas URI)
- npm or yarn

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` from `.env.example` and set:
   ```env
   PORT=8000
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=your-secret-key
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your-refresh-secret
   REFRESH_TOKEN_EXPIRY=10d
   MONGODB_URI=mongodb://localhost:27017/task-manager
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   Backend runs at `http://localhost:8000`

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` from `.env.example` and set:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

### Build for Production

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

## Environment Variables

### Backend (`.env`)

| Variable              | Description                     |
| --------------------- | ------------------------------- |
| PORT                  | Server port (default: 8000)     |
| CORS_ORIGIN           | Allowed frontend origin         |
| ACCESS_TOKEN_SECRET   | JWT access token secret         |
| ACCESS_TOKEN_EXPIRY  | Access token expiry (e.g. 1d)  |
| REFRESH_TOKEN_SECRET  | JWT refresh token secret        |
| REFRESH_TOKEN_EXPIRY  | Refresh token expiry (e.g. 10d) |
| MONGODB_URI           | MongoDB connection string       |

### Frontend (`.env`)

| Variable           | Description                        |
| ------------------ | ---------------------------------- |
| VITE_API_BASE_URL  | Backend API base URL (incl. /api/v1)|

## Submission Checklist

- [x] GitHub repository link
- [x] README with setup instructions
- [x] API documentation
- [x] Environment variables example (`.env.example` in backend and frontend)
- [x] Deployed link (frontend on Vercel, backend on Render)

---

**Author:** Arijit Karmakar  
**Assignment:** Full Stack Development Internship - Skill Assessment
