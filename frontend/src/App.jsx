/*
==========================================================
 Task Management System - React Frontend

 Designed & Developed by Sakthiram
 © 2026 Sakthiram. All Rights Reserved.

 Main Application Component:
 - Authentication Handling (JWT)
 - Task CRUD Management
 - Pagination, Filtering, Search
 - Statistics Dashboard Integration
==========================================================
*/

import React, { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { taskAPI } from './services/api';
import authService from './services/authService';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [statistics, setStatistics] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await authService.getCurrentUser();
          setCurrentUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          authService.logout();
          setIsAuthenticated(false);
        }
      }
    };
    checkAuth();
  }, []);

  // Fetch tasks
  const fetchTasks = async (page = 1, status = null, search = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskAPI.getAllTasks(page, status, search);
      setTasks(response.data.results || response.data);
      setTotalPages(Math.ceil(response.data.count / 10) || 1);
      setCurrentPage(page);
      fetchStatistics();
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await taskAPI.getStatistics();
      setStatistics(response.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  // Initial load
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks(1, filterStatus, searchTerm);
    }
  }, [filterStatus, isAuthenticated]);

  // Search debounce
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        fetchTasks(1, filterStatus, searchTerm);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
    fetchTasks();
  };

  // Handle register success
  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
    fetchTasks();
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setTasks([]);
    setStatistics(null);
  };

  // Handle create or update task
  const handleSubmitTask = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask.id, formData);
        setSuccess('Task updated successfully!');
        setEditingTask(null);
      } else {
        await taskAPI.createTask(formData);
        setSuccess('Task created successfully!');
      }
      fetchTasks(currentPage, filterStatus, searchTerm);
      clearMessages();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await taskAPI.deleteTask(taskId);
      setSuccess('Task deleted successfully!');
      fetchTasks(currentPage, filterStatus, searchTerm);
      clearMessages();
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggle task completion
  const handleToggleComplete = async (taskId) => {
    setIsLoading(true);
    setError(null);

    try {
      const task = tasks.find((t) => t.id === taskId);
      if (task.status) {
        await taskAPI.markIncomplete(taskId);
        setSuccess('Task marked as incomplete');
      } else {
        await taskAPI.markComplete(taskId);
        setSuccess('Task marked as completed');
      }
      fetchTasks(currentPage, filterStatus, searchTerm);
      clearMessages();
    } catch (err) {
      setError('Failed to update task status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear editing
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Clear messages
  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (search) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchTasks(newPage, filterStatus, searchTerm);
  };

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return showRegister ? (
      <Register
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  // Show main app if authenticated
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>📋 Task Management System</h1>
            <p className="subtitle">Stay organized and productive</p>
          </div>
          <div className="user-section">
            <span className="user-info">
              👤 {currentUser?.first_name} {currentUser?.last_name}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <section className="form-section">
            <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
            <TaskForm
              onSubmit={handleSubmitTask}
              initialTask={editingTask}
              isLoading={isLoading}
            />
            {editingTask && (
              <button
                onClick={handleCancelEdit}
                className="btn btn-secondary"
                style={{ marginTop: '10px' }}
              >
                Cancel Edit
              </button>
            )}
          </section>

          <FilterBar
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            currentFilter={filterStatus}
            isLoading={isLoading}
          />

          <section className="tasks-section">
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              isLoading={isLoading}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              statistics={statistics}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Sakthiram. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;