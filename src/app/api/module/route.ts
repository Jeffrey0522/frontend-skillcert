import { NextResponse } from "next/server";
import { ModuleService } from "./module.service";
import type { CreateModuleDto } from "@/types/module";

const moduleService = new ModuleService();

/**
 * GET /api/module
 * Get all modules or modules by course ID
 */
export async function GET(request: Request) {
  try {
    // Safe way to access search params
    let courseId = null;
    try {
      const url = new URL(request.url);
      courseId = url.searchParams.get("courseId");
    } catch (e) {
      // Handle URL parsing error
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Check if we have a courseId parameter
    if (courseId) {
      try {
        const modules = await moduleService.getModulesByCourseId(Number(courseId));
        return NextResponse.json(modules || []);
      } catch (err) {
        return NextResponse.json(
          { error: "Failed to fetch modules by course ID", message: err instanceof Error ? err.message : "Unknown error" },
          { status: 500 }
        );
      }
    } else {
      try {
        const modules = await moduleService.getAllModules();
        return NextResponse.json(modules || []);
      } catch (err) {
        return NextResponse.json(
          { error: "Failed to fetch all modules", message: err instanceof Error ? err.message : "Unknown error" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    // Safe error handling that won't cause console.error issues
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    return NextResponse.json(
      { error: "Failed to process request", message: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * POST /api/module
 * Create a new module
 */
export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.courseId || !body.name || body.position === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: courseId, name, and position are required" },
        { status: 400 }
      );
    }

    try {
      const module = await moduleService.createModule(body);
      return NextResponse.json(module, { status: 201 });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to create module", message: err instanceof Error ? err.message : "Unknown error" },
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