import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { todoService } from '../services/todoService';
import { PriorityBadge } from '../components/PriorityBadge';
import { Button } from '../components/Button';
import { TodoModal } from '../components/TodoModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { NotFoundPage } from '../components/NotFoundPage';
import { useTodoContext } from '../context/TodoContext';

export const TodoDetailPage = () => {
  const [searchParams] = useSearchParams();
  const todoId = searchParams.get('id');
  const navigate = useNavigate();
  const { toggleComplete, deleteTodo } = useTodoContext();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSingleTodo = async () => {
    if (!todoId) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const res = await todoService.getTodo(todoId);
      if (res.success && res.data) {
        setTodo(res.data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleTodo();
  }, [todoId]);

  const handleToggleStatus = async () => {
    if (!todo) return;
    await toggleComplete(todo);
    setTodo((prev) => ({ ...prev, completed: !prev.completed }));
  };

  const handleDelete = async () => {
    if (!todo) return;
    try {
      setIsDeleting(true);
      await deleteTodo(todo.id || todo._id);
      navigate('/');
    } catch (err) {
      // Toast handles error message
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-pulse px-1">
        <div className="h-9 bg-slate-200 rounded-lg w-32" />
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <div className="h-7 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !todo) {
    return (
      <NotFoundPage
        message="Todo Task Not Found"
        submessage="The task ID provided in the URL parameter is invalid or does not exist."
      />
    );
  }

  const formattedDueDate = new Date(todo.dueDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedCreatedAt = new Date(todo.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedUpdatedAt = new Date(todo.updatedAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6 overflow-x-hidden">
      {/* Top Action Bar: Responsive stack on mobile (< sm) */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="secondary" size="sm" className="w-full sm:w-auto min-h-[42px] sm:min-h-[36px]">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1 sm:flex-initial min-h-[42px] sm:min-h-[36px]"
          >
            <Edit2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span>Edit</span>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex-1 sm:flex-initial min-h-[42px] sm:min-h-[36px]"
          >
            <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Detail Card Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-8 space-y-6 overflow-hidden">
        {/* Title & Priority */}
        <div className="space-y-3.5 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <PriorityBadge priority={todo.priority} />
            <button
              type="button"
              onClick={handleToggleStatus}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[36px] focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                todo.completed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
              }`}
              aria-label={todo.completed ? 'Mark as Pending' : 'Mark as Completed'}
            >
              {todo.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status: Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Status: Pending</span>
                </>
              )}
            </button>
          </div>

          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug break-words ${
              todo.completed ? 'line-through text-slate-400' : ''
            }`}
          >
            {todo.title}
          </h1>
        </div>

        {/* Detailed Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Task Description</h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            {todo.description}
          </p>
        </div>

        {/* Timestamps & Due Date Metadata Grid: Stacks vertically on mobile (< sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Due Date</span>
              <span className="font-semibold text-slate-800 text-sm mt-0.5 block">{formattedDueDate}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Activity Timestamps</span>
              <span className="block text-slate-700 font-medium">Created: {formattedCreatedAt}</span>
              <span className="block text-slate-500 text-[11px]">Last Updated: {formattedUpdatedAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TodoModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          fetchSingleTodo(); // Refresh details on update
        }}
        initialData={todo}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
