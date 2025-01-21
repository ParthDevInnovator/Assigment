# Task Management App

This is a simple Task Management application built with **React** for the frontend and **Express.js** with **Prisma** for the backend. The app allows users to manage tasks with features such as adding, editing, deleting, and toggling the status of tasks.

## Features

- Add tasks with a title and description.
- Mark tasks as completed or pending.
- Edit the task title.
- Delete tasks.
- Display all tasks in a table format.

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Express.js, Prisma ORM, MySQL
- Database: MySQL (via Prisma)

## Installation

Follow the steps below to run the application locally.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
DATABASE_URL="mysql://user:password@localhost:3306/task_manager"
npx prisma migrate dev --name init
then npm run dev in server and then src
