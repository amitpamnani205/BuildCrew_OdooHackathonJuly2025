import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="input-field"
          placeholder={placeholder}
          required={required}
          {...props}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default Input; 