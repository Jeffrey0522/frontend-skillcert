import { CreateUserDto, UpdateUserDto, User } from './user.types';
import { userRepository } from './user.repository';

/**
 * Get all users
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    return await userRepository.findAll();
  } catch (error) {
    console.error('Error in getAllUsers service:', error);
    throw error;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: number): Promise<User | null> {
  try {
    return await userRepository.findById(userId);
  } catch (error) {
    console.error(`Error in getUserById service for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await userRepository.findByEmail(email);
  } catch (error) {
    console.error(`Error in getUserByEmail service for email ${email}:`, error);
    throw error;
  }
}

/**
 * Create a new user
 */
export async function createUser(userData: CreateUserDto): Promise<User> {
  try {
    return await userRepository.create(userData);
  } catch (error) {
    console.error('Error in createUser service:', error);
    throw error;
  }
}

/**
 * Update an existing user
 */
export async function updateUser(userId: number, userData: UpdateUserDto): Promise<User | null> {
  try {
    // Check if user exists
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      return null;
    }
    
    return await userRepository.update(userId, userData);
  } catch (error) {
    console.error(`Error in updateUser service for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Delete a user
 */
export async function deleteUser(userId: number): Promise<boolean> {
  try {
    // Check if user exists
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      return false;
    }
    
    await userRepository.delete(userId);
    return true;
  } catch (error) {
    console.error(`Error in deleteUser service for user ${userId}:`, error);
    throw error;
  }
}