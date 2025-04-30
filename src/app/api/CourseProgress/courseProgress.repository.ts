import { prisma } from '../../../lib/prisma';
import { CourseProgress } from '@prisma/client';

export class CourseProgressRepository {
  async create(userId: number, courseId: number): Promise<CourseProgress> {
    return prisma.courseProgress.create({
      data: {
        user_id: userId,
        course_id: courseId,
        last_accessed_at: new Date(),
      },
    });
  }

  async updateProgress(userId: number, courseId: number, progress: number): Promise<CourseProgress> {
    return prisma.courseProgress.update({
      where: { user_id_course_id: { user_id: userId, course_id: courseId } },
      data: {
        progress,
        completed: progress === 100,
        last_accessed_at: new Date(),
      },
    });
  }

  async findProgress(userId: number, courseId: number): Promise<CourseProgress | null> {
    return prisma.courseProgress.findUnique({
      where: { user_id_course_id: { user_id: userId, course_id: courseId } },
    });
  }

  async findUserCourses(userId: number): Promise<CourseProgress[]> {
    return prisma.courseProgress.findMany({
      where: { user_id: userId },
      include: { course: true },
    });
  }

  async deleteProgress(userId: number, courseId: number): Promise<CourseProgress> {
    return prisma.courseProgress.delete({
      where: { user_id_course_id: { user_id: userId, course_id: courseId } },
    });
  }
}

export const courseProgressRepository = new CourseProgressRepository();
