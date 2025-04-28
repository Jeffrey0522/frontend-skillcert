import { prisma } from '../../../lib/prisma';
import { CreateUserDto, UpdateUserDto, User } from './user.types';

/**
 * User Repository
 * Handles direct database interactions for the User entity
 */
export class UserRepository {
  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  /**
   * Find user by ID
   */
  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Create a new user
   */
  async create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Update an existing user
   */
  async update(id: number, data: UpdateUserDto): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a user
   */
  async delete(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}

// Export as a singleton
export const userRepository = new UserRepository();