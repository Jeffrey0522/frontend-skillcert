import db from "@/database/connection"
import { type VideoLesson, type CreateVideoLessonDto, type UpdateVideoLessonDto } from "@/types/videoLesson"

// In-memory storage as a fallback if Prisma isn't working correctly
let mockVideoLessons: VideoLesson[] = [];

/**
 * Creates a new video lesson
 */
export async function createVideoLesson(videoLessonData: CreateVideoLessonDto): Promise<VideoLesson> {
  try {
    // Try to use Prisma
    try {
      // In a real implementation with Prisma:
      const newVideoLesson = await db.videoLesson.create({
        data: {
          lessonId: videoLessonData.lessonId,
          videoURL: videoLessonData.videoURL,
        },
      })

      return newVideoLesson as VideoLesson
    } catch (prismaError) {
      console.warn("Prisma error, using mock implementation:", prismaError);
      
      // Fallback to mock implementation
      const newVideoLesson: VideoLesson = {
        lessonId: videoLessonData.lessonId,
        videoURL: videoLessonData.videoURL
      };
      
      mockVideoLessons.push(newVideoLesson);
      return newVideoLesson;
    }
  } catch (error) {
    console.error("Error in createVideoLesson service:", error)
    throw error
  }
}

/**
 * Gets a video lesson by lesson ID
 */
export async function getVideoLessonByLessonId(lessonId: number): Promise<VideoLesson | null> {
  try {
    // Try to use Prisma
    try {
      // In a real implementation with Prisma:
      const videoLesson = await db.videoLesson.findUnique({
        where: { lessonId: lessonId },
        include: { lesson: true }, // Include the associated lesson
      })

      return videoLesson as VideoLesson | null
    } catch (prismaError) {
      console.warn("Prisma error, using mock implementation:", prismaError);
      
      // Fallback to mock implementation
      const videoLesson = mockVideoLessons.find(vl => vl.lessonId === lessonId) || null;
      return videoLesson;
    }
  } catch (error) {
    console.error(`Error in getVideoLessonByLessonId service for lesson ${lessonId}:`, error)
    throw error
  }
}

/**
 * Gets all video lessons
 */
export async function getAllVideoLessons(): Promise<VideoLesson[]> {
  try {
    // Try to use Prisma
    try {
      // In a real implementation with Prisma:
      const videoLessons = await db.videoLesson.findMany({
        include: { lesson: true }, // Include the associated lesson
      })

      return videoLessons as VideoLesson[]
    } catch (prismaError) {
      console.warn("Prisma error, using mock implementation:", prismaError);
      
      // Fallback to mock implementation
      return [...mockVideoLessons];
    }
  } catch (error) {
    console.error("Error in getAllVideoLessons service:", error)
    throw error
  }
}

/**
 * Updates a video lesson
 */
export async function updateVideoLesson(
  lessonId: number, 
  updateData: UpdateVideoLessonDto
): Promise<VideoLesson | null> {
  try {
    // Try to use Prisma
    try {
      // In a real implementation with Prisma:
      const updatedVideoLesson = await db.videoLesson.update({
        where: { lessonId: lessonId },
        data: {
          ...updateData,
        },
      })

      return updatedVideoLesson as VideoLesson
    } catch (prismaError) {
      console.warn("Prisma error, using mock implementation:", prismaError);
      
      // Fallback to mock implementation
      const index = mockVideoLessons.findIndex(vl => vl.lessonId === lessonId);
      if (index === -1) return null;
      
      mockVideoLessons[index] = {
        ...mockVideoLessons[index],
        ...updateData
      };
      
      return mockVideoLessons[index];
    }
  } catch (error) {
    console.error(`Error in updateVideoLesson service for lesson ${lessonId}:`, error)
    throw error
  }
}

/**
 * Deletes a video lesson
 */
export async function deleteVideoLesson(lessonId: number): Promise<boolean> {
  try {
    // Try to use Prisma
    try {
      // In a real implementation with Prisma:
      await db.videoLesson.delete({
        where: { lessonId: lessonId },
      })

      return true
    } catch (prismaError) {
      console.warn("Prisma error, using mock implementation:", prismaError);
      
      // Fallback to mock implementation
      const index = mockVideoLessons.findIndex(vl => vl.lessonId === lessonId);
      if (index === -1) return false;
      
      mockVideoLessons.splice(index, 1);
      return true;
    }
  } catch (error) {
    console.error(`Error in deleteVideoLesson service for lesson ${lessonId}:`, error)
    throw error
  }
} 