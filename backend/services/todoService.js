const Todo = require('../models/Todo');

class TodoService {
  async getAllTodos(query = {}) {
    const filter = {};

    // Filter by status if provided
    if (query.status === 'completed') {
      filter.completed = true;
    } else if (query.status === 'pending') {
      filter.completed = false;
    }

    // Search query matching title, description, or MongoDB Todo ID
    if (query.search) {
      const searchConditions = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
      // Check if search query is a valid 24-char hex MongoDB ObjectId
      if (query.search.trim().match(/^[0-9a-fA-F]{24}$/)) {
        searchConditions.push({ _id: query.search.trim() });
      }
      filter.$or = searchConditions;
    }

    // Sorting: default latest first (-createdAt)
    let sortOption = { createdAt: -1 };
    if (query.sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    return await Todo.find(filter).sort(sortOption);
  }

  async getTodoById(id) {
    return await Todo.findById(id);
  }

  async createTodo(data) {
    return await Todo.create(data);
  }

  async updateTodo(id, data) {
    return await Todo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = new TodoService();
