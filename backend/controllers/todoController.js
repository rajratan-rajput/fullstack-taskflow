const todoService = require('../services/todoService');
const AppError = require('../utils/appError');

// Helper to catch async errors cleanly without try/catch boilerplate
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await todoService.getAllTodos(req.query);
  res.status(200).json({
    success: true,
    count: todos.length,
    data: todos,
  });
});

exports.getTodoById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  // Validate MongoDB ObjectId format
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new AppError('Invalid Todo ID format', 400));
  }

  const todo = await todoService.getTodoById(id);
  if (!todo) {
    return next(new AppError('Todo not found', 404));
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const { title, description, completed, priority, dueDate } = req.body;

  if (!title || title.trim().length < 3) {
    return next(new AppError('Title is required and must be at least 3 characters long', 400));
  }
  if (!description || description.trim().length === 0) {
    return next(new AppError('Description is required', 400));
  }

  const newTodo = await todoService.createTodo({
    title,
    description,
    completed: completed || false,
    priority: priority || 'Medium',
    dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days from now
  });

  res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo,
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new AppError('Invalid Todo ID format', 400));
  }

  const updatedTodo = await todoService.updateTodo(id, req.body);
  if (!updatedTodo) {
    return next(new AppError('Todo not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Todo updated successfully',
    data: updatedTodo,
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new AppError('Invalid Todo ID format', 400));
  }

  const deletedTodo = await todoService.deleteTodo(id);
  if (!deletedTodo) {
    return next(new AppError('Todo not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Todo deleted successfully',
  });
});
