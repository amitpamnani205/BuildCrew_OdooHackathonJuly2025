// Regular expressions for validation
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  // At least 6 characters
  PASSWORD: /^.{6,}$/
};

// Validation error messages
export const ERROR_MESSAGES = {
  REQUIRED: (field) => `${field} is required`,
  MIN_LENGTH: (field, length) => `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field, length) => `${field} cannot exceed ${length} characters`,
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_STRENGTH: 'Password must be at least 6 characters long',
  PASSWORD_MATCH: 'Passwords do not match',
  INVALID_USERNAME: 'Username can only contain letters, numbers and underscores',
  FILE_SIZE: 'File size should not exceed 5MB',
  FILE_TYPE: 'Only image files are allowed'
};

// File validation
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif']
};

export const validateField = (name, value, options = {}) => {
  const errors = [];

  if (!value && options.required) {
    errors.push(ERROR_MESSAGES.REQUIRED(name));
    return errors;
  }

  if (!value) return errors;

  switch (name.toLowerCase()) {
    case 'email':
      if (!REGEX.EMAIL.test(value)) {
        errors.push(ERROR_MESSAGES.INVALID_EMAIL);
      }
      break;

    case 'username':
      if (!REGEX.USERNAME.test(value)) {
        errors.push(ERROR_MESSAGES.INVALID_USERNAME);
      }
      break;

    case 'password':
      if (!REGEX.PASSWORD.test(value)) {
        errors.push(ERROR_MESSAGES.PASSWORD_STRENGTH);
      }
      break;

    case 'confirmpassword':
      if (value !== options.passwordValue) {
        errors.push(ERROR_MESSAGES.PASSWORD_MATCH);
      }
      break;
  }

  return errors;
};

export const validateFile = (file) => {
  const errors = [];

  if (!file) {
    errors.push(ERROR_MESSAGES.REQUIRED('Profile photo'));
    return errors;
  }

  if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
    errors.push(ERROR_MESSAGES.FILE_TYPE);
  }

  if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
    errors.push(ERROR_MESSAGES.FILE_SIZE);
  }

  return errors;
}; 