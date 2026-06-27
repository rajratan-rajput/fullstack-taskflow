import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const todoApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  // Fetch all todos with optional search, filter status, and sort parameters
  getTodos: async (params = {}) => {
    const response = await todoApi.get('/todos', { params });
    return response.data;
  },

  // Fetch single todo by ID
  getTodo: async (id) => {
    const response = await todoApi.get(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData) => {
    const response = await todoApi.post('/todos', todoData);
    return response.data;
  },

  // Update existing todo
  updateTodo: async (id, todoData) => {
    const response = await todoApi.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Delete todo by ID
  deleteTodo: async (id) => {
    const response = await todoApi.delete(`/todos/${id}`);
    return response.data;
  },
};
