import React, { useState } from 'react';
import '../styles/TaskForm.css';

export const FilterBar = ({ onFilterChange, onSearch, currentFilter, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (status) => {
    onFilterChange(status);
  };

  return (
    <div className="filter-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchTerm}
          onChange={handleSearch}
          disabled={isLoading}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${currentFilter === null ? 'active' : ''}`}
          onClick={() => handleFilterChange(null)}
          disabled={isLoading}
        >
          All Tasks
        </button>
        <button
          className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
          onClick={() => handleFilterChange('pending')}
          disabled={isLoading}
        >
          ⏳ Pending
        </button>
        <button
          className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
          disabled={isLoading}
        >
          ✅ Completed
        </button>
      </div>
    </div>
  );
};