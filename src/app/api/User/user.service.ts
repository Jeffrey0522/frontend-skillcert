import { prisma } from '../../../lib/prisma';
import { CreateUserDto, UpdateUserDto, User } from './user.types';

/**
 * Get all users
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();
    return users;
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
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
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
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
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
    const newUser = await prisma.user.create({
      data: userData,
    });
    return newUser;
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
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
    return updatedUser;
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
    await prisma.user.delete({
      where: { id: userId },
    });
    return true;
  } catch (error) {
    console.error(`Error in deleteUser service for user ${userId}:`, error);
    throw error;
  }
}