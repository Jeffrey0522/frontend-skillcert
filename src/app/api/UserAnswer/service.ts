// src/api/UserAnswer/service.ts
import * as repository from './repository';
import { serializeBigInt } from '@/lib/serializeBigInt';  // Import the utility
import type { CreateUserAnswerDto, UpdateUserAnswerDto, UserAnswerResponse } from './types';

export const createUserAnswer = async (data: CreateUserAnswerDto): Promise<UserAnswerResponse> => {
  const userAnswer = await repository.createUserAnswer(data);
  return serializeBigInt(userAnswer);  // Serialize the response
};

export const getAllUserAnswers = async (): Promise<UserAnswerResponse[]> => {
  const userAnswers = await repository.getUserAnswers();
  return serializeBigInt(userAnswers);  // Serialize all answers
};

export const getUserAnswerById = async (id: number): Promise<UserAnswerResponse | null> => {
  const userAnswer = await repository.getUserAnswerById(id);
  return userAnswer ? serializeBigInt(userAnswer) : null;  // Handle case for null
};

export const updateUserAnswer = async (id: number, data: UpdateUserAnswerDto): Promise<UserAnswerResponse> => {
  const updatedUserAnswer = await repository.updateUserAnswer(id, data);
  return serializeBigInt(updatedUserAnswer);  // Serialize after update
};

export const deleteUserAnswer = async (id: number): Promise<UserAnswerResponse> => {
  const deletedUserAnswer = await repository.deleteUserAnswer(id);
  return serializeBigInt(deletedUserAnswer);  // Serialize after delete
};
