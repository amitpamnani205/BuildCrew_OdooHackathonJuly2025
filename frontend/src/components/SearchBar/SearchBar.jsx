import React, { useState, useCallback } from 'react';
import './SearchBar.css';

// Custom debounce function
const useDebounce = (callback, delay) => {
  const timeoutRef = React.useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

const SearchBar = ({ onSearch, availabilityOptions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('all');
  const [error, setError] = useState('');

  const debouncedSearch = useDebounce((term, avail) => {
    if (term.length > 0 && term.length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }
    setError('');
    onSearch({ term, availability: avail });
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Validate input
    if (value.length > 50) {
      setError('Search term too long (max 50 characters)');
      return;
    }
    
    // Remove special characters
    const sanitizedValue = value.replace(/[^\w\s]/gi, '');
    if (value !== sanitizedValue) {
      setError('Special characters are not allowed');
      return;
    }
    
    debouncedSearch(value, availability);
  };

  const handleAvailabilityChange = (e) => {
    const value = e.target.value;
    setAvailability(value);
    debouncedSearch(searchTerm, value);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by skills or name..."
          className={error ? 'error' : ''}
          aria-label="Search"
        />
        
        <select
          value={availability}
          onChange={handleAvailabilityChange}
          aria-label="Filter by availability"
        >
          <option value="all">All Availability</option>
          {availabilityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 