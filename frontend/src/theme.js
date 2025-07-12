/**
 * Theme Configuration for BuildCrew Odoo Hackathon
 * 
 * This file contains all the theme colors and utilities for the Skill Swap Platform.
 * All colors are also available as CSS custom properties in index.css
 */

// Theme configuration
const theme = {
  colors: {
    primary: '#875A7B',
    secondary: '#A89BB9',
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
    info: '#007BFF',
    
    // Text colors
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    
    // Background colors
    bgLight: '#F8F9FA',
    bgDark: '#343A40',
    
    // Border colors
    border: '#E2E8F0',
    
    // Status colors
    pending: '#FFC107',
    accepted: '#28A745',
    rejected: '#DC3545'
  }
};

// Convert theme to CSS variables
const createCssVariables = () => {
  const root = document.documentElement;
  
  // Set color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
};

// Initialize theme
export const initializeTheme = () => {
  createCssVariables();
};

export default theme;

/**
 * Usage Examples:
 * 
 * 1. In CSS:
 *    color: var(--color-primary);
 *    background-color: var(--color-bg-light);
 *    padding: var(--spacing-md);
 * 
 * 2. In JSX (inline styles):
 *    <div style={{ color: theme.colors.primary }}>
 *      Primary colored text
 *    </div>
 * 
 * 3. Utility Classes:
 *    <p className="text-primary">Primary text</p>
 *    <button className="btn btn-primary">Primary button</button>
 *    <div className="bg-light">Light background</div>
 * 
 * 4. Available Button Classes:
 *    .btn-primary, .btn-secondary, .btn-success, 
 *    .btn-warning, .btn-danger, .btn-info
 * 
 * 5. Available Text Classes:
 *    .text-primary, .text-secondary, .text-success,
 *    .text-warning, .text-danger, .text-info, .text-muted
 * 
 * 6. Available Background Classes:
 *    .bg-primary, .bg-secondary, .bg-light, .bg-dark,
 *    .bg-success, .bg-warning, .bg-danger, .bg-info
 */ 