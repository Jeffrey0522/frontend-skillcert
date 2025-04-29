import { AnswerOptionRepository } from "./answerOption.repository";

export class AnswerOptionService {
  static async createAnswerOption(data: {
    questionId: number;
    text: string;
    correct: boolean;
  }) {
    return await AnswerOptionRepository.createAnswerOption(data);
  }

  static async getAnswerOptionById(id: number) {
    const answerOption = await AnswerOptionRepository.getAnswerOptionById(id);
    if (!answerOption) {
      throw new Error("Answer option not found");
    }
    return answerOption;
  }

  static async getAnswerOptionsByQuestion(questionId: number) {
    return await AnswerOptionRepository.getAnswerOptionsByQuestion(questionId);
  }

  static async updateAnswerOption(
    id: number,
    data: Partial<{ text: string; correct: boolean }>
  ) {
    return await AnswerOptionRepository.updateAnswerOption(id, data);
  }

  static async deleteAnswerOption(id: number) {
    return await AnswerOptionRepository.deleteAnswerOption(id);
  }
}