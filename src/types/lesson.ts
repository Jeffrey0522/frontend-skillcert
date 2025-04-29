/**
 * Lesson entity interface
 */
export interface Lesson {
  id: number;
  moduleId: number;
  name: string;
  type: string;
  content: string;
  estimatedTime: string;
  position: number;
}

/**
 * Data transfer object for creating a new lesson
 */
export interface CreateLessonDto {
  moduleId: number;
  name: string;
  type: string;
  content: string;
  estimatedTime: string;
  position: number;
}

/**
 * Data transfer object for updating a lesson
 */
export interface UpdateLessonDto {
  name?: string;
  type?: string;
  content?: string;
  estimatedTime?: string;
  position?: number;
} 