import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, ListTodo } from 'lucide-react';
import { useTodoContext } from '../context/TodoContext';
import { TodoCard } from '../components/TodoCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { SortDropdown } from '../components/SortDropdown';
import { Button } from '../components/Button';
import { TodoModal } from '../components/TodoModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { ErrorComponent } from '../components/ErrorComponent';

export const TodoListPage = () => {
  const {
    todos,
    loading,
    error,
    searchQuery,
    fetchTodos,
    deleteTodo,
  } = useTodoContext();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      await deleteTodo(deletingId);
      setDeletingId(null);
    } catch (err) {
      // Handled in context
    } finally {
      setIsDeleting(false);
    }
  };

  // Stats calculation
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 sm:p-6 rounded-2xl border border-theme shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-theme-primary">Workspace Dashboard</h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            Manage your daily objectives, deadlines, and project tasks cleanly.
          </p>
        </div>

        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto min-h-[44px]">
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </Button>
      </div>

      {/* Overview Metrics - Mobile: 1 per row on < sm, 3 cols on >= sm */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-surface p-4 rounded-xl border border-theme shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-subtle text-theme-primary flex items-center justify-center shrink-0">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-theme-secondary uppercase tracking-wider block">Total Tasks</span>
            <span className="text-lg font-bold text-theme-primary">{totalCount}</span>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-theme shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-theme-secondary uppercase tracking-wider block">Completed</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{completedCount}</span>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-xl border border-theme shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-theme-secondary uppercase tracking-wider block">Pending</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{pendingCount}</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search -> Filters -> Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-surface p-3.5 sm:p-4 rounded-2xl border border-theme shadow-sm">
        <SearchBar />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end gap-3">
          <FilterBar />
          <SortDropdown />
        </div>
      </div>

      {/* Content Section */}
      {error ? (
        <ErrorComponent message={error} onRetry={fetchTodos} />
      ) : loading ? (
        <SkeletonLoader count={6} />
      ) : todos.length === 0 ? (
        <EmptyState
          onAddClick={() => setIsCreateModalOpen(true)}
          isSearchResult={Boolean(searchQuery)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id || todo._id}
              todo={todo}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <TodoModal
        isOpen={isCreateModalOpen || Boolean(editingTodo)}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingTodo(null);
        }}
        initialData={editingTodo}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
