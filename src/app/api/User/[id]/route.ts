import { NextRequest } from 'next/server';
import { userController } from '../user.controller';

/**
 * GET /api/User/:id
 * Get a specific user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.getUserById(request, params.id);
}

/**
 * PATCH /api/User/:id
 * Update a specific user by ID
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.updateUser(request, params.id);
}

/**
 * DELETE /api/User/:id
 * Delete a specific user by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return userController.deleteUser(request, params.id);
}