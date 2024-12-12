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




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MongoDB


Before you begin, make sure you have the following installed:

Node.js (v14+)
MongoDB (Local setup)
Frontend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd client
npm install
Run the React development server:

bash
Copy code
npm start
The frontend should be available at http://localhost:3000.

Backend Setup
Navigate to the backend directory:

bash
Copy code
cd server
Install backend dependencies:

bash
Copy code
npm install
Set up MongoDB (make sure MongoDB is running locally). You can install MongoDB locally or use a cloud provider like MongoDB Atlas.

Start the backend server:

bash
Copy code
npm start
The backend API will run on http://localhost:5000.

Environment Variables
To connect to the database and configure the backend server, create a .env file in the backend directory and add the following:

bash
Copy code
MONGODB_URI=mongodb://localhost:27017/taskdb
PORT=5000
Replace localhost with your MongoDB connection URL if you are using a remote database.

Running the Application
After setting up both the frontend and backend, follow these steps:

Make sure MongoDB is running locally (or ensure your remote database is connected).
Start the backend API by running npm start in the server directory.
Start the frontend application by running npm start in the client directory.
Visit http://localhost:3000 in your browser to access the task management application.
Implementation Notes
Frontend: Built with React and Vite for fast development. We use functional components and React hooks for managing state and side effects.
Backend: The backend uses Express.js to handle API requests for creating, reading, updating, and deleting tasks. MongoDB is used to persist task data, including task name, order number, and completion status.
Order Number Management: Order numbers are dynamically updated in the frontend to prevent the assignment of duplicate order numbers. The backend enforces uniqueness by checking for existing order numbers before adding new tasks.
Error Handling: Basic error handling is implemented to provide feedback if tasks are not added due to validation issues (e.g., empty task name or duplicate order number).
Styling: TailwindCSS is used for styling the frontend. It provides a clean, responsive design out of the box.
API Endpoints
POST /tasks: Create a new task
Body:
json
Copy code
{
  "taskName": "New Task",
  "orderNumber": 1,
  "status": "pending"
}
GET /tasks: Retrieve a list of all tasks (can filter by status)
Query parameters: status (optional: all, active, completed)
PUT /tasks/:id: Update a task's completion status
Body:
json
Copy code
{
  "status": "completed"
}
DELETE /tasks/:id: Delete a task
Bonus Features
Drag-and-Drop: Tasks can be reordered using react-beautiful-dnd for a better user experience.
Error Handling: Prevent adding empty tasks or duplicate order numbers.
Known Issues
None at the moment, but feel free to report any bugs or issues.
Contributing
Fork the repository.
Create your feature branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
