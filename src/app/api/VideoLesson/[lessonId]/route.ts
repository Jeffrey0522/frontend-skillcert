import { type NextRequest, NextResponse } from "next/server"
import { 
  getVideoLessonByLessonId,
  updateVideoLesson,
  deleteVideoLesson
} from "../videoLesson.service"
import { validateVideoLessonUpdateData } from "@/lib/validators/videoLessonValidator"

/**
 * GET /api/VideoLesson/[lessonId]
 * Gets a specific video lesson by lesson ID
 */
export async function GET(
  request: NextRequest, 
  { params }: { params: { lessonId: string } }
) {
  try {
    const lessonId = Number.parseInt(params.lessonId, 10)
    
    const videoLesson = await getVideoLessonByLessonId(lessonId)
    
    if (!videoLesson) {
      return NextResponse.json({ error: "Video lesson not found" }, { status: 404 })
    }
    
    return NextResponse.json(videoLesson)
  } catch (error: any) {
    console.error(`Error fetching video lesson for lesson ${params.lessonId}:`, error)
    return NextResponse.json({ 
      error: "Failed to fetch video lesson", 
      message: error.message 
    }, { status: 500 })
  }
}

/**
 * PUT /api/VideoLesson/[lessonId]
 * Updates a specific video lesson
 */
export async function PUT(
  request: NextRequest, 
  { params }: { params: { lessonId: string } }
) {
  try {
    const body = await request.json()
    const lessonId = Number.parseInt(params.lessonId, 10)
    
    // Validate the update data
    const validationResult = validateVideoLessonUpdateData(body)
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: "Invalid video lesson update data", 
        details: validationResult.errors 
      }, { status: 400 })
    }
    
    // Check if video lesson exists
    const existingVideoLesson = await getVideoLessonByLessonId(lessonId)
    if (!existingVideoLesson) {
      return NextResponse.json({ error: "Video lesson not found" }, { status: 404 })
    }
    
    // Update video lesson
    const updatedVideoLesson = await updateVideoLesson(lessonId, body)
    return NextResponse.json(updatedVideoLesson)
  } catch (error: any) {
    console.error(`Error updating video lesson for lesson ${params.lessonId}:`, error)
    return NextResponse.json({ 
      error: "Failed to update video lesson", 
      message: error.message 
    }, { status: 500 })
  }
}

/**
 * DELETE /api/VideoLesson/[lessonId]
 * Deletes a specific video lesson
 */
export async function DELETE(
  request: NextRequest, 
  { params }: { params: { lessonId: string } }
) {
  try {
    const lessonId = Number.parseInt(params.lessonId, 10)
    
    // Check if video lesson exists
    const existingVideoLesson = await getVideoLessonByLessonId(lessonId)
    if (!existingVideoLesson) {
      return NextResponse.json({ error: "Video lesson not found" }, { status: 404 })
    }
    
    // Delete video lesson
    await deleteVideoLesson(lessonId)
    return NextResponse.json({ message: "Video lesson deleted successfully" })
  } catch (error: any) {
    console.error(`Error deleting video lesson for lesson ${params.lessonId}:`, error)
    return NextResponse.json({ 
      error: "Failed to delete video lesson", 
      message: error.message 
    }, { status: 500 })
  }
} 