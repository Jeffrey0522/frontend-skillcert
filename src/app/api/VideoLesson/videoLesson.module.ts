/**
 * VideoLesson module
 * 
 * This module serves as a central point of organization for all components related
 * to the VideoLesson functionality.
 * 
 * Exports:
 * - service functions for CRUD operations on VideoLessons
 * - validator functions for request data validation
 */

import * as videoLessonService from './videoLesson.service'
import * as videoLessonValidator from '@/lib/validators/videoLessonValidator'

export {
  videoLessonService,
  videoLessonValidator
}

// For simpler imports in route handlers
export const {
  createVideoLesson,
  getVideoLessonByLessonId,
  getAllVideoLessons,
  updateVideoLesson,
  deleteVideoLesson
} = videoLessonService

export const {
  validateVideoLessonData,
  validateVideoLessonUpdateData
} = videoLessonValidator 