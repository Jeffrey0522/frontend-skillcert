import { db } from "./connection";

export const createProgress = async (userId: number, courseId: number) => {
  return await db.courseProgress.create({
    data: {
      user_id: userId,
      course_id: courseId,
      last_accessed_at: Date.now(),
    },
  });
};

export const updateProgress = async (userId: number, courseId: number, progress: number) => {
  return await db.courseProgress.update({
    where: { user_id_course_id: { user_id: userId, course_id: courseId } },
    data: {
      progress,
      completed: progress === 100 ? true : undefined,
      last_accessed_at: Date.now(),
    },
  });
};

export const getProgress = async (userId: number, courseId: number) => {
  return await db.courseProgress.findUnique({
    where: { user_id_course_id: { user_id: userId, course_id: courseId } },
  });
};

export const getUserCourses = async (userId: number) => {
  return await db.courseProgress.findMany({
    where: { user_id: userId },
    include: { course: true },
  });
};

export const deleteProgress = async (userId: number, courseId: number) => {
  return await db.courseProgress.delete({
    where: { user_id_course_id: { user_id: userId, course_id: courseId } },
  });
};
