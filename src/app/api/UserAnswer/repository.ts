// src/api/UserAnswer/repository.ts
import type { CreateUserAnswerDto, UpdateUserAnswerDto } from './types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserAnswer = async (data: CreateUserAnswerDto) => {
  const validData = {
    ...data,
    createdAt: data.createdAt ?? Date.now(), 
  };

  try {
    return await prisma.userAnswer.create({ data: validData });
  } catch (error) {
    console.error('🔥 Prisma create error:', error);
    throw error;
  }
};

export const getUserAnswers = async () => {
  return await prisma.userAnswer.findMany();
};

export const getUserAnswerById = async (id: number) => {
  return await prisma.userAnswer.findUnique({ where: { id } });
};

export const updateUserAnswer = async (id: number, data: UpdateUserAnswerDto) => {
  return await prisma.userAnswer.update({ where: { id }, data });
};

export const deleteUserAnswer = async (id: number) => {
  return await prisma.userAnswer.delete({ where: { id } });
};
