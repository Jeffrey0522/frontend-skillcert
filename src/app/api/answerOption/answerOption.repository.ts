import db from "@/database/connection";

export class AnswerOptionRepository {
  static async createAnswerOption(data: {
    questionId: number;
    text: string;
    correct: boolean;
  }) {
    return await db.answerOption.create({
      data: {
        question_id: data.questionId,
        text: data.text,
        correct: data.correct,
      },
    });
  }

  static async getAnswerOptionById(id: number) {
    return await db.answerOption.findUnique({
      where: { id },
    });
  }

  static async getAnswerOptionsByQuestion(questionId: number) {
    return await db.answerOption.findMany({
      where: { question_id: questionId },
    });
  }

  static async updateAnswerOption(
    id: number,
    data: Partial<{ text: string; correct: boolean }>
  ) {
    return await db.answerOption.update({
      where: { id },
      data,
    });
  }

  static async deleteAnswerOption(id: number) {
    return await db.answerOption.delete({
      where: { id },
    });
  }
}