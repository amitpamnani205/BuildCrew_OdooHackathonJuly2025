/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} func The function to debounce
 * @param {number} wait The number of milliseconds to delay
 * @returns {Function} Returns the new debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Formats a date string to a more readable format
 * @param {string} dateString The date string to format
 * @returns {string} The formatted date string
 */
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Truncates a string if it exceeds the maximum length
 * @param {string} str The string to truncate
 * @param {number} maxLength The maximum length before truncating
 * @returns {string} The truncated string
 */
export const truncateString = (str, maxLength = 100) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
};

/**
 * Creates a unique ID for temporary use (not for permanent storage)
 * @returns {string} A unique string ID
 */
export const createTempId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param {*} value The value to check
 * @returns {boolean} True if the value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Deep clones an object or array
 * @param {*} obj The object to clone
 * @returns {*} A deep clone of the object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
  );
}; 