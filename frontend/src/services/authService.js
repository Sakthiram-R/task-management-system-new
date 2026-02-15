import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const authService = {
  // Register new user
  register: (username, email, first_name, last_name, password, password2) => {
    return axios.post(`${API_BASE_URL}/auth/register/`, {
      username,
      email,
      first_name,
      last_name,
      password,
      password2,
    });
  },

  // Login user
  login: (username, password) => {
    return axios.post(`${API_BASE_URL}/auth/login/`, {
      username,
      password,
    });
  },

  // Get current user
  getCurrentUser: () => {
    const token = localStorage.getItem('access');
    if (!token) return null;

    return axios.get(`${API_BASE_URL}/auth/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Update profile
  updateProfile: (userData) => {
    const token = localStorage.getItem('access');
    return axios.put(`${API_BASE_URL}/auth/profile/update/`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Change password
  changePassword: (oldPassword, newPassword, newPassword2) => {
    const token = localStorage.getItem('access');
    return axios.post(
      `${API_BASE_URL}/auth/change-password/`,
      {
        old_password: oldPassword,
        new_password: newPassword,
        new_password2: newPassword2,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  // Refresh token
  refreshToken: () => {
    const refresh = localStorage.getItem('refresh');
    return axios.post(`${API_BASE_URL}/auth/refresh/`, {
      refresh,
    });
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  },

  // Store tokens
  saveTokens: (access, refresh) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('access');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('access');
  },
};

export default authService;