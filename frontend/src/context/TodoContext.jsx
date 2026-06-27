import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest'

  // Toast notification state
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (statusFilter !== 'all') params.status = statusFilter;
      if (sortBy) params.sort = sortBy;

      const res = await todoService.getTodos(params);
      if (res.success) {
        setTodos(res.data);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to connect to backend server';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, sortBy, showToast]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData) => {
    try {
      const res = await todoService.createTodo(todoData);
      if (res.success) {
        showToast('Task added successfully!', 'success');
        fetchTodos();
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Error creating task';
      showToast(msg, 'error');
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const res = await todoService.updateTodo(id, todoData);
      if (res.success) {
        showToast('Task updated successfully!', 'success');
        fetchTodos();
        return res.data;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Error updating task';
      showToast(msg, 'error');
      throw err;
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const updatedStatus = !todo.completed;
      const res = await todoService.updateTodo(todo.id, { completed: updatedStatus });
      if (res.success) {
        showToast(updatedStatus ? 'Marked as completed' : 'Marked as pending', 'info');
        setTodos((prev) =>
          prev.map((t) => (t.id === todo.id ? { ...t, completed: updatedStatus } : t))
        );
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await todoService.deleteTodo(id);
      if (res.success) {
        showToast('Task deleted successfully', 'info');
        fetchTodos();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Error deleting task';
      showToast(msg, 'error');
      throw err;
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        toast,
        showToast,
        fetchTodos,
        addTodo,
        updateTodo,
        toggleComplete,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
