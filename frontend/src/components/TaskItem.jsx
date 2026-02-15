import React from 'react';
import '../styles/TaskItem.css';

export const TaskItem = ({ task, onDelete, onToggleComplete, onEdit, isLoading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const isOverdue = () => {
    if (!task.due_date || task.status) return false;
    return new Date(task.due_date) < new Date();
  };

  return (
    <div className={`task-item ${task.status ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => onToggleComplete(task.id)}
            disabled={isLoading}
            className="task-checkbox"
          />
          <h3 className="task-title">{task.title}</h3>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span className="task-date">
            📅 {formatDate(task.due_date)}
          </span>
          <span className="task-status">
            {task.status ? '✅ Completed' : '⏳ Pending'}
          </span>
          <span className="task-created">
            Created: {formatDate(task.created_at)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn btn-edit"
          disabled={isLoading}
          title="Edit task"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-delete"
          disabled={isLoading}
          title="Delete task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};