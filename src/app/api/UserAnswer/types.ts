// src/api/UserAnswer/types.ts
export type UserAnswerResponse = {
    id: number;
    userId: number;
    questionId: number;
    answerId: number;
    createdAt: bigint;
  };
  
  export type CreateUserAnswerDto = {
    userId: number;
    questionId: number;
    answerId: number;
    createdAt?: bigint;
  };
  
  export type UpdateUserAnswerDto = Partial<CreateUserAnswerDto>;