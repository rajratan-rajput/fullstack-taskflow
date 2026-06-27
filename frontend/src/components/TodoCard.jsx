import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, Circle, Edit2, Trash2 } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import { useTodoContext } from '../context/TodoContext';

export const TodoCard = ({ todo, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { toggleComplete } = useTodoContext();

  const todoId = todo.id || todo._id;

  const formattedDueDate = new Date(todo.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) {
      return;
    }
    navigate(`/todo?id=${todoId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (!e.target.closest('button') && !e.target.closest('input')) {
        e.preventDefault();
        navigate(`/todo?id=${todoId}`);
      }
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleComplete(todo);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(todo);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(todoId);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={`group relative bg-surface p-4.5 rounded-xl border border-theme shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            type="button"
            onClick={handleToggle}
            className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center text-theme-secondary hover:text-emerald-600 hover:bg-emerald-500/10 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            title={todo.completed ? 'Mark as Pending' : 'Mark as Complete'}
            aria-label={todo.completed ? 'Mark as Pending' : 'Mark as Complete'}
          >
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3
              className={`text-sm font-semibold tracking-tight text-theme-primary truncate ${
                todo.completed ? 'line-through opacity-60 font-normal' : ''
              }`}
            >
              {todo.title}
            </h3>
            <p
              className={`text-xs text-theme-secondary mt-1 line-clamp-2 leading-relaxed ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              {todo.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 pt-0.5">
          <PriorityBadge priority={todo.priority} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-theme-subtle text-xs text-theme-secondary mt-0.5">
        <div className="flex items-center gap-1.5 font-medium text-theme-secondary">
          <Calendar className="w-3.5 h-3.5 text-theme-secondary shrink-0" />
          <span>{formattedDueDate}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleEdit}
            className="min-w-[36px] min-h-[36px] sm:min-w-[32px] sm:min-h-[32px] flex items-center justify-center text-theme-secondary hover:text-theme-primary hover:bg-subtle rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="min-w-[36px] min-h-[36px] sm:min-w-[32px] sm:min-h-[32px] flex items-center justify-center text-theme-secondary hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
