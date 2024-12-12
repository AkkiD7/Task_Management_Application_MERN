import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:5000/todos";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [availableOrderNumbers, setAvailableOrderNumbers] = useState([]);

  const refreshTodos = useCallback(async () => {
    try {
      const response = filter
        ? await axios.get(`${API_URL}/filter`, { params: { status: filter } })
        : await axios.get(API_URL);

      const sortedTodos = response.data.sort((a, b) => a.orderNumber - b.orderNumber);
      setTodos(sortedTodos);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch todos");
    }
  }, [filter]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Task description cannot be empty");
      return;
    }
    if (!orderNumber) {
      setError("Order Number is required");
      return;
    }

    try {
      await axios.post(API_URL, { description, orderNumber, status: "pending" });
      resetForm();
      refreshTodos();
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
  };

  const handleEditTodo = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Task description cannot be empty");
      return;
    }
    if (!orderNumber) {
      setError("Order Number is required");
      return;
    }

    try {
      await axios.put(`${API_URL}/${editTodo._id}`, { description, orderNumber });
      resetForm();
      refreshTodos();
    } catch (err) {
      console.error(err);
      setError("Failed to update todo");
    }
  };

  const handleStatusChange = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo._id}`, {
        status: todo.status === "pending" ? "completed" : "pending",
      });
      refreshTodos();
    } catch (err) {
      console.error(err);
      setError("Failed to update todo status");
    }
  };

  const handleDelete = async (id, orderNumber) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setAvailableOrderNumbers((prev) => [...prev, orderNumber]);
      refreshTodos();
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo");
    }
  };

  const resetForm = () => {
    setDescription("");
    setOrderNumber("");
    setEditTodo(null);
    setShowAddTaskForm(false);
    setError("");
  };

  // Create a list of numbers from 1 to 100
  const generateOrderNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 100; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  useEffect(() => {
    refreshTodos();
  }, [filter, refreshTodos]);

  return (
    <div className="container mx-auto p-6 lg:p-32">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-4 w-full text-center">
        Task Management Application
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <button
          onClick={() => setShowAddTaskForm(true)}
          className="p-2 bg-[#626ff1] text-white rounded mb-2 lg:mb-0 lg:w-auto w-full"
        >
          Add Task
        </button>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-full lg:w-auto"
          value={filter}
        >
          <option value="">All</option>
          <option value="pending">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mb-4 p-4" style={{ backgroundColor: "#ececf8" }}>
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks to show here</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="flex flex-col p-4 border rounded mb-2 bg-white">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={todo.status === "completed"}
                  onChange={() => handleStatusChange(todo)}
                  className="mr-2"
                />
                <span className={`flex-1 ${todo.status === "completed" ? "line-through" : ""}`}>
                  {todo.description}
                </span>
                <button
                  onClick={() => {
                    setEditTodo(todo);
                    setDescription(todo.description);
                    setOrderNumber(todo.orderNumber);
                    setShowAddTaskForm(true);
                  }}
                  className="p-1 bg-[#ECECF8] text-black rounded ml-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDelete(todo._id, todo.orderNumber)}
                  className="p-1 bg-[#ECECF8] text-black rounded ml-2"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {showAddTaskForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 lg:w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editTodo ? "Edit Task" : "Add New Task"}
            </h2>
            <form onSubmit={editTodo ? handleEditTodo : handleAddTodo}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">Task Description</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="orderNumber">Order Number</label>
                <select
                  className="p-2 border border-gray-300 rounded w-full"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                >
                  <option value="">Select Order Number</option>
                  {generateOrderNumbers().map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                {editTodo ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;
