import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '../user.service';
import { UpdateUserDto } from '../user.types';

/**
 * GET /api/User/:id
 * Get a specific user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error(`Error fetching user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch user', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/User/:id
 * Update a specific user by ID
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    const body: UpdateUserDto = await request.json();

    const updatedUser = await updateUser(userId, body);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error(`Error updating user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update user', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/User/:id
 * Delete a specific user by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);
    
    await deleteUser(userId);
    
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error deleting user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete user', message: error.message },
      { status: 500 }
    );
  }
}