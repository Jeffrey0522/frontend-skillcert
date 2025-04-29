// src/app/api/UserAnswer/route.ts
import { NextResponse } from 'next/server';
import {
  createUserAnswer,
  getAllUserAnswers,
  getUserAnswerById,
  updateUserAnswer,
  deleteUserAnswer
} from './service';
import { serializeBigInt } from '@/lib/serializeBigInt';  // Import the utility
import type { CreateUserAnswerDto, UpdateUserAnswerDto } from './types';

const handleError = (error: unknown) => {
  console.error(error);

  // Check if the error is an object and has a message property
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }

  // Handle unexpected error types
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
};


export async function POST(request: Request) {
  try {
    const data: CreateUserAnswerDto = await request.json();
    
    if (!data.userId || !data.questionId || !data.answerId) {
      return NextResponse.json(
        { error: 'Missing required fields (userId, questionId, answerId)' },
        { status: 400 }
      );
    }

    const userAnswer = await createUserAnswer({
      ...data,
      createdAt: data.createdAt || BigInt(Date.now())
    });
    
    return NextResponse.json(serializeBigInt(userAnswer), { status: 201 });  // Serialize before returning
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        return NextResponse.json(
          { error: 'ID must be a number' },
          { status: 400 }
        );
      }

      const userAnswer = await getUserAnswerById(numericId);
      if (!userAnswer) {
        return NextResponse.json(
          { error: 'User answer not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(serializeBigInt(userAnswer));  // Serialize before returning
    }

    const userAnswers = await getAllUserAnswers();
    return NextResponse.json(serializeBigInt(userAnswers));  // Serialize before returning
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data: UpdateUserAnswerDto = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID parameter' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return NextResponse.json(
        { error: 'ID must be a number' },
        { status: 400 }
      );
    }

    const updatedUserAnswer = await updateUserAnswer(numericId, data);
    return NextResponse.json(serializeBigInt(updatedUserAnswer));  // Serialize before returning
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID parameter' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return NextResponse.json(
        { error: 'ID must be a number' },
        { status: 400 }
      );
    }

    console.log('Deleting user answer with ID:', numericId); // Add this line for logging

    const deletedUserAnswer = await deleteUserAnswer(numericId);

    console.log('Deleted user answer:', deletedUserAnswer); // Add this line for logging

    return NextResponse.json(serializeBigInt(deletedUserAnswer));  // Serialize before returning
  } catch (error) {
    return handleError(error);
  }
}

