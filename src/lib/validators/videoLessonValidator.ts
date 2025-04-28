/**
 * Validates video lesson data
 */
export function validateVideoLessonData(data: any) {
  const errors = []

  // Validate lessonId (required, must be a number)
  if (!data.lessonId) {
    errors.push("lessonId is required")
  } else if (typeof data.lessonId !== "number" && isNaN(Number(data.lessonId))) {
    errors.push("lessonId must be a number")
  }

  // Validate videoURL (required, must be a string, must be a valid URL)
  if (!data.videoURL) {
    errors.push("videoURL is required")
  } else if (typeof data.videoURL !== "string") {
    errors.push("videoURL must be a string")
  } else {
    try {
      // Check if it's a valid URL format
      new URL(data.videoURL)
    } catch (error) {
      errors.push("videoURL must be a valid URL")
    }
  }

  return {
    success: errors.length === 0,
    errors,
  }
}

/**
 * Validates video lesson update data
 */
export function validateVideoLessonUpdateData(data: any) {
  const errors = []

  // Validate videoURL (optional, but if provided must be a string and a valid URL)
  if (data.videoURL !== undefined) {
    if (typeof data.videoURL !== "string") {
      errors.push("videoURL must be a string")
    } else {
      try {
        // Check if it's a valid URL format
        new URL(data.videoURL)
      } catch (error) {
        errors.push("videoURL must be a valid URL")
      }
    }
  }

  return {
    success: errors.length === 0,
    errors,
  }
} 