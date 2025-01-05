# Task Management System API

## Overview
This repository contains the Task Management System API, a backend application for managing projects, tasks, and user roles. The API is built using Node.js, Express, and MySQL.

---

## Features
- User Management: Create, retrieve, update, and delete users.
- Task Management: Assign tasks, update task details, and filter tasks by status, due date, and assignee.
- Project Management: Manage project details, including creation and updates.
- Role-based access control (Admin/User).
- Email notifications for task assignments.

---

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or above)
- [MySQL](https://www.mysql.com/) database server

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-management-system
```

### 2. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (this file is ignored by Git). Add the following variables:
```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_management
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your-email-password
JWT_SECRET=your-jwt-secret
PORT=3000
```

> **Note:** The `.env` file is not included in the GitHub repository for security reasons. You must create this file locally.

### 4. Initialize the Database
Import the SQL schema provided in `db/schema.sql` into your MySQL server. This will create the necessary tables.

```bash
mysql -u root -p task_management < db/schema.sql
```

### 5. Run the Application
Start the server in development mode:
```bash
npm run dev
```
The server will be accessible at `http://localhost:3000/`.

---

## Routes and Usage

### **User Management**

#### Create User
**POST** `/api/users`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "User"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "userId": 1
  }
  ```

#### Delete User
**DELETE** `/api/users/:id`
- Admin-only route to delete a user by ID.

### **Project Management**

#### Create Project
**POST** `/api/projects`
- **Request Body:**
  ```json
  {
    "name": "New Project",
    "description": "Description of the project"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Project created successfully",
    "projectId": 1
  }
  ```

#### Update Project
**PUT** `/api/projects/:id`
- **Request Body:**
  ```json
  {
    "name": "Updated Project Name",
    "description": "Updated description"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Project updated successfully"
  }
  ```

### **Task Management**

#### Create Task
**POST** `/api/tasks`
- **Request Body:**
  ```json
  {
    "project_id": 1,
    "assigned_to": 2,
    "title": "Task Title",
    "description": "Task Description",
    "due_date": "2025-01-15"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task created successfully",
    "taskId": 1
  }
  ```

#### Fetch Task by ID
**GET** `/api/tasks/:id`
- **Response:**
  ```json
  {
    "task": {
      "task_id": 2,
      "title": "Fix Login Bug",
      "description": "Resolve the login issue",
      "status": "In Progress",
      "due_date": "2025-01-15"
    }
  }
  ```

---

## Testing the API

Use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the endpoints. Example curl commands are provided below:

### Example: Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
  "project_id": 1,
  "assigned_to": 2,
  "title": "New Task",
  "description": "Task description",
  "due_date": "2025-01-15"
}'
```

---

## Debugging Tips
- Ensure the `.env` file is correctly set up.
- Check MySQL database credentials and connection.
- Inspect logs for errors using `console.log` or a logging library.

---

## License
This project is licensed under the MIT License.

