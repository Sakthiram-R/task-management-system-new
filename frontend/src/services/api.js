import axios from 'axios';
import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await authService.refreshToken();
        const { access } = response.data;
        localStorage.setItem('access', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Task API endpoints
export const taskAPI = {
  getAllTasks: (page = 1, status = null, search = null, ordering = '-created_at') => {
    let url = `/tasks/?page=${page}&ordering=${ordering}`;
    if (status) url += `&status=${status}`;
    if (search) url += `&search=${search}`;
    return api.get(url);
  },

  getTask: (id) => api.get(`/tasks/${id}/`),
  createTask: (taskData) => api.post('/tasks/', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}/`, taskData),
  patchTask: (id, taskData) => api.patch(`/tasks/${id}/`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}/`),
  markComplete: (id) => api.post(`/tasks/${id}/mark_complete/`),
  markIncomplete: (id) => api.post(`/tasks/${id}/mark_incomplete/`),
  getStatistics: () => api.get('/tasks/statistics/'),
};

export default api;