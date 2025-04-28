import { QuestionRepository } from "./question.repository";

export class QuestionService {
  static async createQuestion(data: { lessonId: number; text: string; type: string; position: number }) {
    return await QuestionRepository.createQuestion(data);
  }

  static async getQuestionById(id: number) {
    const question = await QuestionRepository.getQuestionById(id);
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  }

  static async getQuestionsByLesson(lessonId: number) {
    return await QuestionRepository.getQuestionsByLesson(lessonId);
  }

  static async updateQuestion(id: number, data: Partial<{ text: string; type: string; position: number }>) {
    return await QuestionRepository.updateQuestion(id, data);
  }

  static async deleteQuestion(id: number) {
    return await QuestionRepository.deleteQuestion(id);
  }
}