import { NextResponse } from "next/server";
import { ModuleService } from "../module.service";
import type { UpdateModuleDto } from "@/types/module";

const moduleService = new ModuleService();

/**
 * GET /api/module/:id
 * Get a module by ID
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const moduleId = Number(params.id);
    
    if (isNaN(moduleId)) {
      return NextResponse.json({ error: "Invalid module ID" }, { status: 400 });
    }
    
    try {
      const module = await moduleService.getModuleById(moduleId);

      if (!module) {
        return NextResponse.json({ error: "Module not found" }, { status: 404 });
      }

      return NextResponse.json(module);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to fetch module", message: err instanceof Error ? err.message : "Unknown error" },
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

/**
 * PUT /api/module/:id
 * Update a module
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const moduleId = Number(params.id);
    
    if (isNaN(moduleId)) {
      return NextResponse.json({ error: "Invalid module ID" }, { status: 400 });
    }
    
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    try {
      // Check if module exists
      const existingModule = await moduleService.getModuleById(moduleId);
      if (!existingModule) {
        return NextResponse.json({ error: "Module not found" }, { status: 404 });
      }

      const updatedModule = await moduleService.updateModule(moduleId, body);
      return NextResponse.json(updatedModule);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to update module", message: err instanceof Error ? err.message : "Unknown error" },
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

/**
 * DELETE /api/module/:id
 * Delete a module
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const moduleId = Number(params.id);
    
    if (isNaN(moduleId)) {
      return NextResponse.json({ error: "Invalid module ID" }, { status: 400 });
    }
    
    try {
      // Check if module exists
      const existingModule = await moduleService.getModuleById(moduleId);
      if (!existingModule) {
        return NextResponse.json({ error: "Module not found" }, { status: 404 });
      }

      await moduleService.deleteModule(moduleId);
      return NextResponse.json({ message: "Module deleted successfully" });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to delete module", message: err instanceof Error ? err.message : "Unknown error" },
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