import db from "@/database/connection";

export class QuestionRepository {
  static async createQuestion(data: { lessonId: number; text: string; type: string; position: number }) {
    return await db.question.create({
      data: {
        lesson_id: data.lessonId,
        text: data.text,
        type: data.type,
        position: data.position,
      },
    });
  }

  static async getQuestionById(id: number) {
    return await db.question.findUnique({
      where: { id },
    });
  }

  static async getQuestionsByLesson(lessonId: number) {
    return await db.question.findMany({
      where: { lesson_id: lessonId },
      orderBy: { position: "asc" },
    });
  }

  static async updateQuestion(id: number, data: Partial<{ text: string; type: string; position: number }>) {
    return await db.question.update({
      where: { id },
      data,
    });
  }

  static async deleteQuestion(id: number) {
    return await db.question.delete({
      where: { id },
    });
  }
}