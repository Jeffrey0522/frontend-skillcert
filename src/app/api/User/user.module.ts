/**
 * User Module
 * 
 * This file acts as a central export point for all User-related functionality,
 * making it easier to import and use the User module in other parts of the application.
 */

// Export types
export * from './user.types';

// Export repository
export { userRepository } from './user.repository';

// Export service functions
export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from './user.service';

// Export controller
export { userController } from './user.controller';

// Export a function to initialize the module if needed
export function initUserModule() {
  console.log('User module initialized');
  // Add any initialization logic here
}