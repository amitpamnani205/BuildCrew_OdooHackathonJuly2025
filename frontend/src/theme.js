/**
 * Theme Configuration for BuildCrew Odoo Hackathon
 * 
 * This file contains all the theme colors and utilities for the Skill Swap Platform.
 * All colors are also available as CSS custom properties in index.css
 */

export const theme = {
  colors: {
    // Primary Colors
    primary: '#875A7B',         // Indigo/Purple - Odoo brand color
    secondary: '#A89BB9',       // Light Purple
    
    // Background Colors
    bgLight: '#FFFFFF',         // White - General content background
    bgDark: '#F5F5F5',          // Light Gray - Sections, footers, cards
    
    // Text Colors
    textPrimary: '#212529',     // Dark Gray/Black - Main text
    textSecondary: '#6C757D',   // Medium Gray - Secondary content
    
    // Status Colors
    success: '#28A745',         // Green - Notifications, confirmation
    warning: '#FFC107',         // Orange/Yellow - Alerts, warnings
    danger: '#DC3545',          // Red - Error messages
    info: '#007BFF',            // Blue - Hyperlinks, tooltips
    
    // Utility Colors
    border: '#DEE2E6',          // Light border color
    shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
    
    // Hover States
    primaryHover: '#6d4a64',    // Darker primary for hover
    secondaryHover: '#9a8bb0',  // Darker secondary for hover
    successHover: '#218838',    // Darker success for hover
    warningHover: '#e0a800',    // Darker warning for hover
    dangerHover: '#c82333',     // Darker danger for hover
    infoHover: '#0056b3',       // Darker info for hover
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
    xxxl: '2rem',     // 32px
  },
  
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
  }
}

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

export default theme 