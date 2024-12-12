Task Management Application (MERN Stack)
This is a simple Task Management Application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to manage tasks by adding, deleting, marking them as complete, and filtering tasks by their status. It also dynamically assigns order numbers to tasks to ensure no duplicates.

Features
Task List: Displays a list of tasks with:
Task Name
Checkbox to mark the task as complete
Task order displayed in ascending order of their assigned order number
Add Task: Users can add new tasks by entering a task name and selecting an available order number.
Delete Task: Each task has a "Delete" button to remove the task and free its order number.
Filter Tasks: Users can filter tasks by:
All
Active
Completed
Order Management: The order number is dynamically updated to prevent duplicate order numbers from being assigned.
Prerequisites
# Task Management Application (MERN Stack)

This is a simple Task Management Application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to manage tasks by adding, deleting, marking them as complete, and filtering tasks by their status. It also dynamically assigns order numbers to tasks to ensure no duplicates.





## Features

- Task List: Displays a list of tasks with: Task Name
- Add Task: Users can add new tasks by entering a task name and selecting an available order number.
- Delete Task: Each task has a "Delete" button to remove the task and free its order number.
- Filter Tasks: Users can filter tasks by: All Active Completed
- Order Management: The order number is dynamically updated to prevent duplicate order numbers from being assigned.




## Prerequisites:

**Node.js (v14+)** 

**MongoDB (Local setup)** 


## Installation:

**Frontend Setup** 
Clone the repository:
git clone https://github.com/akkid7/task_management_app_MERN.git
cd task-management-app
Navigate to the frontend directory and install dependencies:
cd client
npm install
Run the React development server:
npm start
The frontend should be available at http://localhost:3000.


**Backend Setup**
Navigate to the backend directory:
cd server
Install backend dependencies:
npm install
Set up MongoDB (make sure MongoDB is running locally). You can install MongoDB locally or use a cloud provider like MongoDB Atlas.
Start the backend server:
npm start
The backend API will run on http://localhost:5000.



