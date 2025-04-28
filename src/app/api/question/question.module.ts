import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";

export const QuestionModule = {
  repository: QuestionRepository,
  service: QuestionService,
};