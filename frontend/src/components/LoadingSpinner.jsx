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

import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading tasks...</p>
    </div>
  );
};