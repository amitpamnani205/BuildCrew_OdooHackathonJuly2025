import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        btn 
        btn-${variant} 
        btn-${size}
        ${isLoading ? 'btn-loading' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <div className="btn-loader">
          <div className="loader"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button; 