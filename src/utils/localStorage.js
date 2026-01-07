/**
 * Safe localStorage wrapper with error handling
 */
const localStorageUtil = {
  /**
   * Safely get and parse JSON from localStorage
   * @param {string} key 
   * @param {*} defaultValue 
   */
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Safely stringify and store in localStorage
   * @param {string} key 
   * @param {*} value 
   */
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key 
   */
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },

  /**
   * Check if key exists
   * @param {string} key 
   */
  has: (key) => {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      return false;
    }
  }
};

export default localStorageUtil;
