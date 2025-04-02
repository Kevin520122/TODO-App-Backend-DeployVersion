# Todo App Backend

A RESTful API backend for a Todo application built with Express.js and MongoDB.

## Overview

This backend provides authentication and task management functionality through a RESTful API. It supports user registration, login, and CRUD operations for todo tasks with user-specific access control.

## Features

- User authentication (register, login)
- JWT-based authentication
- Task management (create, read, update, delete)
- MongoDB database integration
- CORS support for cross-origin requests

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get authentication token
- `GET /api/auth/me` - Get current user information

### Tasks

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a specific task
- `DELETE /api/tasks/:id` - Delete a specific task

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Kevin520122/TODO-App-Backend-DeployVersion.git
cd TODO-App-Backend-DeployVersion
npm install
```

### Environement Setup

1. Create a .env file in the root directory with the following variables:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-app-deployed-link.app
NODE_ENV=development
```

### Running Locally
Start the development server:
```bash
npm run dev
```
The server will be running at http://localhost:5000.
