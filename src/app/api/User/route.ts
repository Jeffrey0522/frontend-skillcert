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

/**
 * GET /api/User
 * Get all users or a specific user by query parameters
 */
export async function GET(request: NextRequest) {
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

import { validateCreateUserData, validateUpdateUserData } from '@/lib/validators/userValidator';

/**
 * POST /api/User
 * Create a new user
 */
export async function POST(request: NextRequest) {
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
    if (error.code === 'P2002' && error.meta?.target?.includes('Email')) {
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
 * PUT /api/User
 * Update an existing user
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const userId = parseInt(id, 10);
    const body: UpdateUserDto = await request.json();
    
    // Validate input data
    const validationResult = validateUpdateUserData(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid user data', details: validationResult.errors },
        { status: 400 }
      );
    }
    
    const updatedUser = await updateUser(userId, body);
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/User
 * Delete a user
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const userId = parseInt(id, 10);
    
    await deleteUser(userId);
    
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user', message: error.message },
      { status: 500 }
    );
  }
}