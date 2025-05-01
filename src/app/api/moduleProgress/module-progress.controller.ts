import { NextRequest, NextResponse } from "next/server";
import { ModuleProgressService } from "./module-progress.service";

export class ModuleProgressController {
  private service: ModuleProgressService;

  constructor() {
    this.service = new ModuleProgressService();
  }

  async create(request: NextRequest) {
    try {
      const { user_id, module_id } = await request.json();
      const progress = await this.service.createModuleProgress(BigInt(user_id), BigInt(module_id));
      return NextResponse.json(progress, { status: 201 });
    } catch (error) {
      console.error("Error creating module progress:", error);
      return NextResponse.json({ error: "Failed to create module progress" }, { status: 500 });
    }
  }

  async update(request: NextRequest) {
    try {
      const { user_id, module_id, progress } = await request.json();
      const updated = await this.service.updateModuleProgress(BigInt(user_id), BigInt(module_id), progress);
      return NextResponse.json(updated);
    } catch (error) {
      console.error("Error updating module progress:", error);
      return NextResponse.json({ error: "Failed to update module progress" }, { status: 500 });
    }
  }

  async getOne(request: NextRequest) {
    try {
      const { user_id, module_id } = await request.json();
      const progress = await this.service.getModuleProgress(BigInt(user_id), BigInt(module_id));
      
      if (!progress) {
        return NextResponse.json({ error: "Module progress not found" }, { status: 404 });
      }
      
      return NextResponse.json(progress);
    } catch (error) {
      console.error("Error fetching module progress:", error);
      return NextResponse.json({ error: "Failed to fetch module progress" }, { status: 500 });
    }
  }

  async delete(request: NextRequest) {
    try {
      const { user_id, module_id } = await request.json();
      await this.service.deleteModuleProgress(BigInt(user_id), BigInt(module_id));
      return NextResponse.json({ message: "Module progress deleted successfully" });
    } catch (error) {
      console.error("Error deleting module progress:", error);
      return NextResponse.json({ error: "Failed to delete module progress" }, { status: 500 });
    }
  }
}