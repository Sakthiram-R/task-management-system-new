import React, { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import '../styles/TaskList.css';

export const TaskList = ({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
  statistics,
}) => {
  if (isLoading && tasks.length === 0) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-message">📭 No tasks found</p>
        <p className="empty-submessage">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {statistics && (
        <div className="statistics">
          <div className="stat-item">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{statistics.total_tasks}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value completed">{statistics.completed_tasks}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-value pending">{statistics.pending_tasks}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Progress</span>
            <span className="stat-value">{statistics.completion_percentage}%</span>
          </div>
        </div>
      )}

      <div className="tasks-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            isLoading={isLoading}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};