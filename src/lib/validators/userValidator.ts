import { CreateUserDto, UpdateUserDto } from '@/app/api/User/user.types';

interface ValidationResult {
  success: boolean;
  errors?: string[];
}

/**
 * Validates user creation data
 */
export function validateCreateUserData(data: any): ValidationResult {
  const errors: string[] = [];

  // Check required fields
  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (!data.name) {
    errors.push('Name is required');
  } else if (typeof data.name !== 'string') {
    errors.push('Name must be a string');
  } else if (data.name.length < 2 || data.name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }

  // Check optional fields
  if (data.wallet !== undefined && typeof data.wallet !== 'string') {
    errors.push('Wallet must be a string if provided');
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validates user update data
 */
export function validateUpdateUserData(data: any): ValidationResult {
  const errors: string[] = [];

  // Check if at least one field is provided
  if (Object.keys(data).length === 0) {
    errors.push('At least one field must be provided for update');
  }

  // Check optional fields
  if (data.email !== undefined) {
    if (!isValidEmail(data.email)) {
      errors.push('Invalid email format');
    }
  }

  if (data.name !== undefined) {
    if (typeof data.name !== 'string') {
      errors.push('Name must be a string');
    } else if (data.name.length < 2 || data.name.length > 100) {
      errors.push('Name must be between 2 and 100 characters');
    }
  }

  if (data.wallet !== undefined && typeof data.wallet !== 'string') {
    errors.push('Wallet must be a string if provided');
  }

  return {
    success: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Helper function to validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}