import { ModuleRepository } from "./module.repository";
import type { Module, CreateModuleDto, UpdateModuleDto } from "@/types/module";

/**
 * Service for Module entity
 */
export class ModuleService {
  private repository: ModuleRepository;

  constructor() {
    this.repository = new ModuleRepository();
  }

  /**
   * Create a new module
   */
  async createModule(data: CreateModuleDto): Promise<Module> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      console.error("Error in createModule:", error);
      throw error;
    }
  }

  /**
   * Get a module by ID
   */
  async getModuleById(id: number): Promise<Module | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      console.error(`Error in getModuleById for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get all modules
   */
  async getAllModules(): Promise<Module[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error("Error in getAllModules:", error);
      throw error;
    }
  }

  /**
   * Get modules by course ID
   */
  async getModulesByCourseId(courseId: number): Promise<Module[]> {
    try {
      return await this.repository.findByCourseId(courseId);
    } catch (error) {
      console.error(`Error in getModulesByCourseId for course ID ${courseId}:`, error);
      throw error;
    }
  }

  /**
   * Update a module
   */
  async updateModule(id: number, data: UpdateModuleDto): Promise<Module> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      console.error(`Error in updateModule for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a module
   */
  async deleteModule(id: number): Promise<Module> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      console.error(`Error in deleteModule for ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Reorder modules within a course
   */
  async reorderModules(courseId: number, moduleIds: number[]): Promise<Module[]> {
    try {
      const modules = await this.repository.findByCourseId(courseId);

      // Validate that all moduleIds belong to the course
      const moduleIdSet = new Set(modules.map((module) => module.id));
      const allModulesExist = moduleIds.every((id) => moduleIdSet.has(id));

      if (!allModulesExist) {
        throw new Error("Some module IDs do not belong to the specified course");
      }

      // Update positions
      const updatedModules: Module[] = [];
      for (let i = 0; i < moduleIds.length; i++) {
        const updatedModule = await this.repository.update(moduleIds[i], { position: i + 1 });
        updatedModules.push(updatedModule);
      }

      return updatedModules;
    } catch (error) {
      console.error(`Error in reorderModules for course ID ${courseId}:`, error);
      throw error;
    }
  }
}