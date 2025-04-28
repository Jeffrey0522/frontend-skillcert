import { NextResponse } from "next/server";
import { ModuleService } from "../module.service";

const moduleService = new ModuleService();

/**
 * POST /api/module/reorder
 * Reorder modules within a course
 */
export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    
    const { courseId, moduleIds } = body;

    if (!courseId || !moduleIds || !Array.isArray(moduleIds)) {
      return NextResponse.json(
        { error: "Invalid request. courseId and moduleIds array are required" },
        { status: 400 }
      );
    }

    try {
      const reorderedModules = await moduleService.reorderModules(Number(courseId), moduleIds);
      return NextResponse.json(reorderedModules);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to reorder modules", message: err instanceof Error ? err.message : "Unknown error" },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { error: "Failed to process request", message: errorMessage },
      { status: 500 }
    );
  }
}