import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  getUserByEmail
} from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.types';
import { validateCreateUserData, validateUpdateUserData } from '@/lib/validators/userValidator';

/**
 * User Controller
 * Contains the business logic for handling HTTP requests related to users
 */
export class UserController {
  /**
   * Get all users or a specific user by query parameters
   */
  async getUsers(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
      const email = searchParams.get('email');

      if (id) {
        const userId = parseInt(id, 10);
        const user = await getUserById(userId);
        
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json(user);
      } 
      
      if (email) {
        const user = await getUserByEmail(email);
        
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        return NextResponse.json(user);
      }

      const users = await getAllUsers();
      return NextResponse.json(users);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users', message: error.message },
        { status: 500 }
      );
    }
  }

  /**
   * Get a user by ID
   */
  async getUserById(request: NextRequest, id: string): Promise<NextResponse> {
    try {
      const userId = parseInt(id, 10);
      const user = await getUserById(userId);

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user);
    } catch (error: any) {
      console.error(`Error fetching user ${id}:`, error);
      return NextResponse.json(
        { error: 'Failed to fetch user', message: error.message },
        { status: 500 }
      );
    }
  }

  /**
   * Create a new user
   */
  async createUser(request: NextRequest): Promise<NextResponse> {
    try {
      const body: CreateUserDto = await request.json();
      
      // Validate input data
      const validationResult = validateCreateUserData(body);
      if (!validationResult.success) {
        return NextResponse.json(
          { error: 'Invalid user data', details: validationResult.errors },
          { status: 400 }
        );
      }
      
      const user = await createUser(body);
      return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      // Handle duplicate email error
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to create user', message: error.message },
        { status: 500 }
      );
    }
  }

  /**
   * Update a user by ID
   */
  async updateUser(request: NextRequest, id: string): Promise<NextResponse> {
    try {
      const userId = parseInt(id, 10);
      const body: UpdateUserDto = await request.json();
      
      // Validate update data
      const validationResult = validateUpdateUserData(body);
      if (!validationResult.success) {
        return NextResponse.json(
          { error: 'Invalid user data', details: validationResult.errors },
          { status: 400 }
        );
      }

      const updatedUser = await updateUser(userId, body);

      if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(updatedUser);
    } catch (error: any) {
      console.error(`Error updating user ${id}:`, error);
      return NextResponse.json(
        { error: 'Failed to update user', message: error.message },
        { status: 500 }
      );
    }
  }

  /**
   * Delete a user by ID
   */
  async deleteUser(request: NextRequest, id: string): Promise<NextResponse> {
    try {
      const userId = parseInt(id, 10);
      
      const result = await deleteUser(userId);
      
      if (!result) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      return NextResponse.json(
        { message: 'User deleted successfully' },
        { status: 200 }
      );
    } catch (error: any) {
      console.error(`Error deleting user ${id}:`, error);
      return NextResponse.json(
        { error: 'Failed to delete user', message: error.message },
        { status: 500 }
      );
    }
  }
}

// Export a singleton instance
export const userController = new UserController();