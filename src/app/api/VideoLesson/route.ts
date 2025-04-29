import { type NextRequest, NextResponse } from "next/server"
import { 
  createVideoLesson, 
  getVideoLessonByLessonId, 
  getAllVideoLessons 
} from "./videoLesson.service"
import { validateVideoLessonData } from "@/lib/validators/videoLessonValidator"

/**
 * POST /api/VideoLesson
 * Creates a new video lesson
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request data
    const validationResult = validateVideoLessonData(body)
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: "Invalid video lesson data", 
        details: validationResult.errors 
      }, { status: 400 })
    }

    const videoLesson = await createVideoLesson(body)
    return NextResponse.json(videoLesson, { status: 201 })
  } catch (error: any) {
    console.error("Error creating video lesson:", error)
    return NextResponse.json({ 
      error: "Failed to create video lesson", 
      message: error.message 
    }, { status: 500 })
  }
}

/**
 * GET /api/VideoLesson
 * Gets video lessons based on query parameters
 * - lessonId: Get a specific video lesson
 * - no params: Get all video lessons
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lessonId = searchParams.get("lessonId")

    if (lessonId) {
      // Get a specific video lesson
      const videoLesson = await getVideoLessonByLessonId(Number.parseInt(lessonId, 10))
      
      if (!videoLesson) {
        return NextResponse.json({ 
          error: "Video lesson not found" 
        }, { status: 404 })
      }
      
      return NextResponse.json(videoLesson)
    } else {
      // Get all video lessons
      const videoLessons = await getAllVideoLessons()
      return NextResponse.json(videoLessons)
    }
  } catch (error: any) {
    console.error("Error fetching video lessons:", error)
    return NextResponse.json({ 
      error: "Failed to fetch video lessons", 
      message: error.message 
    }, { status: 500 })
  }
} 