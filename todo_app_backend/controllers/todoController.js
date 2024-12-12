const TodoItem = require("../models/TodoItem");

exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoItem.find().sort({ orderNumber: 1 }); // Sorting by orderNumber in ascending order
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await TodoItem.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { description, status, orderNumber } = req.body;

    // If a specific orderNumber is provided, check if it's already taken
    if (orderNumber) {
      const existingTodo = await TodoItem.findOne({ orderNumber });
      if (existingTodo) {
        return res.status(400).json({ message: "Order Number already exists" });
      }
    } else {
      // If no orderNumber is provided, find the next available number
      const lastTask = await TodoItem.findOne().sort({ orderNumber: -1 }).limit(1);
      const newOrderNumber = lastTask ? lastTask.orderNumber + 1 : 1;

      const newTodo = new TodoItem({
        description,
        status: status || "pending",
        orderNumber: newOrderNumber,
      });

      const savedTodo = await newTodo.save();
      return res.status(201).json(savedTodo);
    }

    const newTodo = new TodoItem({
      description,
      status: status || "pending",
      orderNumber,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { status, orderNumber } = req.body;

    // If orderNumber is updated, ensure it's not already taken
    if (orderNumber) {
      const existingTodo = await TodoItem.findOne({ orderNumber });
      if (existingTodo) {
        return res.status(400).json({ message: "Order Number already exists" });
      }
    }

    const updatedTodo = await TodoItem.findByIdAndUpdate(
      req.params.id,
      { status, orderNumber }, // Updating status and orderNumber
      { new: true }
    );
    if (!updatedTodo)
      return res.status(404).json({ message: "Todo item not found" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await TodoItem.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo item not found" });
    res.status(200).json({ message: "Todo item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterTodos = async (req, res) => {
  const { status } = req.query;
  console.log("Received query:", req.query);
  console.log("Filtering todos by status:", status);
  try {
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status query parameter is required" });
    }

    if (typeof status !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid status query parameter" });
    }

    const todos = await TodoItem.find({ status: status }).sort({ orderNumber: 1 }); // Sorting by orderNumber
    res.status(200).json(todos);
  } catch (error) {
    console.error("Filter Todos Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// New endpoint to fetch available order numbers
exports.getAvailableOrderNumbers = async (req, res) => {
  try {
    const takenOrderNumbers = await TodoItem.find().select('orderNumber');
    const takenNumbers = takenOrderNumbers.map(todo => todo.orderNumber);

    // Assume the maximum order number is the current highest number
    const maxOrderNumber = takenNumbers.length ? Math.max(...takenNumbers) : 0;
    const availableOrderNumbers = [];

    // Get available order numbers
    for (let i = 1; i <= maxOrderNumber + 1; i++) {
      if (!takenNumbers.includes(i)) {
        availableOrderNumbers.push(i);
      }
    }

    res.status(200).json(availableOrderNumbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
