import { type Lesson } from "./lesson"

/**
 * VideoLesson entity interface
 */
export interface VideoLesson {
  lessonId: number;
  videoURL: string;
  lesson?: Lesson;
}

/**
 * Data transfer object for creating a new video lesson
 */
export interface CreateVideoLessonDto {
  lessonId: number;
  videoURL: string;
}

/**
 * Data transfer object for updating a video lesson
 */
export interface UpdateVideoLessonDto {
  videoURL?: string;
} 