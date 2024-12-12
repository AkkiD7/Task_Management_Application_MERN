const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  orderNumber: {
    type: Number,
    required: true,
    unique: true, 
  },
});

module.exports = mongoose.model('TodoItem', todoItemSchema);
