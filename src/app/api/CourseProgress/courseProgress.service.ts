import { courseProgressRepository } from './courseProgress.repository';

export async function createProgress(userId: number, courseId: number) {
  return courseProgressRepository.create(userId, courseId);
}

export async function updateProgress(userId: number, courseId: number, progress: number) {
  return courseProgressRepository.updateProgress(userId, courseId, progress);
}

export async function getProgress(userId: number, courseId: number) {
  return courseProgressRepository.findProgress(userId, courseId);
}

export async function getUserCourses(userId: number) {
  return courseProgressRepository.findUserCourses(userId);
}

export async function deleteProgress(userId: number, courseId: number) {
  return courseProgressRepository.deleteProgress(userId, courseId);
}
